import React, { useEffect, useMemo } from "react";
import {
  Box,
  Button,
  CardContent,
  Card,
  debounce,
  Stack,
  TextField,
  CardHeader,
  CardActions,
} from "@mui/material";
import * as yup from "yup";
import { doc } from "firebase/firestore";
import { getDoc } from "firebase/firestore";
import { db } from "../../lib/firebase/firebase";
import { UserContext } from "../../lib/firebase/context";
import { writeBatch } from "firebase/firestore";
import { useFormik } from "formik";
import UserAvatar from "../../components/UserAvatar";

const UsernameForm: React.FC = () => {
  const { user } = React.useContext(UserContext);

  const validationSchema = yup.object({
    username: yup
      .string()
      .trim()
      .min(3, "Precisa ter no minimo 3 characters")
      .required("Username é necessário")
      .test("regex_username", "Username inválido", async (username) => {
        if (!username) return false;
        const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;
        const val = username.toLowerCase();
        return re.test(val);
      })
      .test("unique_username", "Username já utilizado", async (username) => {
        if (!username) return false;
        const ref = doc(db, "usernames", username);
        const docSnap = await getDoc(ref);
        const exists = docSnap.exists();
        return !exists;
      }),
  });

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validateOnMount: true,
    validateOnChange: false,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const userDoc = doc(db, "users", user!.uid);
      const usernameDoc = doc(db, "usernames", values.username);

      // Commit both docs together as a batch write.
      const batch = writeBatch(db);
      batch.set(userDoc, {
        username: values.username,
        photoURL: user!.photoURL,
        displayName: user!.displayName,
        characters: []
      });
      batch.set(usernameDoc, { uid: user!.uid });

      await batch.commit();
    },
  });

  const debouncedValidate = useMemo(
    () => debounce(formik.validateForm, 500),
    [formik.validateForm]
  );

  useEffect(() => {
    debouncedValidate(formik.values);
  }, [formik.values, debouncedValidate]);

  return (
    <Card sx={{ maxWidth: 400 }}>
      <form noValidate autoComplete="off" onSubmit={formik.handleSubmit}>
        <CardHeader
          title="Escolha um nome de usuário"
          avatar={<UserAvatar />}
        />
        <CardContent>
          <TextField
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={formik.values.username}
            onChange={(e) => {
              formik.handleChange(e);
              formik.setTouched(
                {
                  username: true,
                },
                false
              );
            }}
            error={formik.touched.username && Boolean(formik.errors.username)}
            helperText={
              formik.touched.username && formik.errors.username
                ? formik.errors.username
                : undefined
            }
          />
        </CardContent>
        <CardActions>
          <Button
            variant="contained"
            type="submit"
            disabled={!formik.isValid || formik.isSubmitting}
            sx={{ ml: "auto" }}
          >
            Escolher
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

export default UsernameForm;

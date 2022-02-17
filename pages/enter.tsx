import React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import { auth, googleAuthProvider, db } from "../lib/firebase";
import { UserContext } from "../lib/context";
import { doc, getDoc, writeBatch } from "firebase/firestore";
import { Button, debounce } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google"
import { signInWithPopup, signOut } from "firebase/auth"

const EnterPage: NextPage = () => {
  const { user, username } = React.useContext(UserContext)


  return (
    <Container component="main" maxWidth="lg" sx={{ my: 2 }}>
      {
        user ?
          !username ? <UsernameForm /> : <SignOutButton /> : <SignInButton />
      }
    </Container>
  )
}

// Sign in with Google button
const SignInButton: React.FC = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <Button variant="outlined" onClick={signInWithGoogle} startIcon={<GoogleIcon />}>
      Sign in with Google
    </Button>
  );
}

// Sign out button
const SignOutButton: React.FC = () => {
  return <button onClick={() => signOut(auth)}>Sign Out</button>;
}

const UsernameForm: React.FC = () => {
  const [formValue, setFormValue] = React.useState('');
  const [isValid, setIsValid] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const { user, username } = React.useContext(UserContext);

  const onSubmit = async (e: any) => {
    e.preventDefault();

    // Create refs for both documents
    const userDoc = doc(db, 'users', user!.uid);
    const usernameDoc = doc(db, 'usernames', formValue);

    // Commit both docs together as a batch write.
    const batch = writeBatch(db);
    batch.set(userDoc, { username: formValue, photoURL: user!.photoURL, displayName: user!.displayName });
    batch.set(usernameDoc, { uid: user!.uid });

    await batch.commit();
  };

  const onChange = (e: any) => {
    // Force form value typed in form to match correct format
    const val = e.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  //

  React.useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = React.useCallback(
    debounce(async (username: string) => {
      if (username.length >= 3) {
        const ref = doc(db, 'usernames', username);
        const docSnap = await getDoc(ref)
        const exists = docSnap.exists()
        console.log('Firestore read executed!');
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  return !username ? (
    <section>
      <h3>Choose Username</h3>
      <form onSubmit={onSubmit}>
        <input name="username" placeholder="myname" value={formValue} onChange={onChange} />
        <UsernameMessage username={formValue} isValid={isValid} loading={loading} />
        <button type="submit" className="btn-green" disabled={!isValid}>
          Choose
        </button>

        <h3>Debug State</h3>
        <div>
          Username: {formValue}
          <br />
          Loading: {loading.toString()}
          <br />
          Username Valid: {isValid.toString()}
        </div>
      </form>
    </section>
  ) : null
}

const UsernameMessage: React.FC<{ username?: string, isValid: boolean, loading: boolean }> = ({ username, isValid, loading }) => {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return <p></p>;
  }
}

export default EnterPage;
import { Button, Container } from "@mui/material";
import React from "react";
import { UserContext } from "../../lib/firebase/context";
import GoogleIcon from "@mui/icons-material/Google";
import Box from "@mui/material/Box";
import { signInWithPopup, signOut } from "firebase/auth";
import { auth, googleAuthProvider } from "../../lib/firebase/firebase";
import { Navigate } from "react-router-dom";
import UsernameForm from "./UsernameForm";
import SelectCharacterForm from "./SelectCharacterForm";

const LoginPage: React.FC = () => {
  const { user, username, character } = React.useContext(UserContext);

  if (user && username && character) {
    return <Navigate to="/" replace />;
  }

  return (
    <Container
      component="main"
      maxWidth="lg"
      sx={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {!user && <SignInButton />}
        {user && !username && <UsernameForm />}
        {user && username && !character && <SelectCharacterForm />}
      </Box>
    </Container>
  );
};

const SignOutButton: React.FC = () => {
  return <button onClick={() => signOut(auth)}>Sign Out</button>;
};

const SignInButton: React.FC = () => {
  const signInWithGoogle = async () => {
    await signInWithPopup(auth, googleAuthProvider);
  };

  return (
    <Button
      variant="outlined"
      onClick={signInWithGoogle}
      startIcon={<GoogleIcon />}
    >
      Sign in with Google
    </Button>
  );
};

export default LoginPage;

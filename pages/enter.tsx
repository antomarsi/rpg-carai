import React from "react";
import type { NextPage } from "next";
import Container from "@mui/material/Container";
import { auth, signInWithPopup, signOut, googleAuthProvider } from "../lib/firebase";
import { UserContext } from "../lib/context";

const EnterPage: NextPage = () => {
  const { user, username } = React.useContext(UserContext)


  return (
    <Container component="main">
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
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google.png'} /> Sign in with Google
    </button>
  );
}

// Sign out button
const SignOutButton: React.FC = () => {
  return <button onClick={() => signOut(auth)}>Sign Out</button>;
}

function UsernameForm() {
  return null;
}

export default EnterPage;
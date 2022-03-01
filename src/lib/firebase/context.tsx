import React from "react";
import { User } from "firebase/auth";
import { doc, onSnapshot } from "firebase/firestore";
import { createContext, useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Character from "../../models/Character";
import { auth, db } from "./firebase";

export const UserContext = createContext<{
  user?: User | null;
  username?: string | null;
  character?: Character;
  characters?: Character[];
}>({ user: null, username: null });

export const UserProvider: React.FC<React.PropsWithChildren<unknown>> = ({
  children,
}) => {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  const [characters, setCharacters] = useState<Character[]>();
  const [character, setCharacter] = useState<Character>();

  useEffect(() => {
    let unsubscribe;

    if (user) {
      const docRef = doc(db, "users", user.uid);

      unsubscribe = onSnapshot(docRef, (doc) => {
        setUsername(doc.data()?.username);
        setCharacters(doc.data()?.characters);
      });
    } else {
      setUsername(null);
      setCharacters(undefined);
    }

    return unsubscribe;
  }, [user]);

  return (
    <UserContext.Provider value={{ user, username, character, characters }}>
      {children}
    </UserContext.Provider>
  );
};

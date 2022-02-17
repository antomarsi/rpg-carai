import { User } from "firebase/auth";
import { createContext } from "react";


export const UserContext = createContext<{ user?: User | null, username?: string | null }>({ user: null, username: null })
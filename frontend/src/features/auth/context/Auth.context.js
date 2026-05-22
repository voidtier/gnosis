import { useContext, createContext } from "react";

export const Auth_context = createContext(null);

export function useAuth_context() {
  return useContext(Auth_context);
}

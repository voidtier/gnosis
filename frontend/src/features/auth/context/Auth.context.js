import { createContext, useContext, useState } from "react";

const context = createContext();

export function Auth_provider({ children }) {
  const [user, set_user] = useState(null);
  const [loading, set_loading] = useState(false);

  return (
    <context.Provider value={{ user, set_user, loading, set_loading }}>
      {children}
    </context.Provider>
  );
}

export function useAuth_context() {
  return useContext(context);
}

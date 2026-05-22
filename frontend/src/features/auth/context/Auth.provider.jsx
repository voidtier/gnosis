import { useState, useEffect } from "react";

import { Auth_context } from "./Auth.context";
import { Admin_user_data_controller } from "../controller/auth_get_admin_data.controller";

export function Auth_provider({ children }) {
  const [user, set_user] = useState(null);
  const [loading, set_loading] = useState(true);

  useEffect(() => {
    async function handle_admin_state() {
      try {
        const data = await Admin_user_data_controller();
        if (data.success) {
          set_user(data.user);
        }
      } catch (error) {
        console.error(error);
        set_user(null);
      } finally {
        set_loading(false);
      }
    }
    handle_admin_state();
  }, []);

  return (
    <Auth_context.Provider value={{ user, set_user, loading, set_loading }}>
      {children}
    </Auth_context.Provider>
  );
}

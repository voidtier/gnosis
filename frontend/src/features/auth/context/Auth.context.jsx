import { useContext, useState } from "react";
import { Admin_user_data_controller } from "../controller/auth_get_admin_data.controller";

const useAuth_context = useContext();

const [user, set_user] = useState(null);
const [loading, set_loading] = useState(false);
async function Auth_provider({ children }) {
  set_loading(true);
  const data = await Admin_user_data_controller();
  set_user(data.user);
  set_loading(false);
}

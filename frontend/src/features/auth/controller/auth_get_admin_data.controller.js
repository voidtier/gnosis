import { Admin_user_data_fetch } from "../service/admin_user_data.service.js";
export async function Admin_user_data_controller() {
  try {
    const data = await Admin_user_data_fetch();

    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error, success: false };
  }
}

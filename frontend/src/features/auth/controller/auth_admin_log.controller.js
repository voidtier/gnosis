import { Admin_log_fetch } from "../service/admin_log.service";
export async function Admin_log_controller(form_data) {
  try {
    const data = await Admin_log_fetch(form_data);
    // if (!data) {
    //   return { message: data, success: false };
    // }
    // if (data) {
    //   return { message: data, success: true };
    // }

    return data;
  } catch (error) {
    console.log(`error  : ${error}`);
    return { message: error, success: false };
  }
}

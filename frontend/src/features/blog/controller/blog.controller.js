import { create_blog, delete_blog, get_blog } from "../service/blog.service";

export async function get_blogs_controller() {
  try {
    const data = await get_blog();
    if (!data.success) {
      throw new Error({ message: "couldn't get blogs", success: false });
    }
    return data;
  } catch (error) {
    console.error(error);
    return { message: error, success: false };
  }
}

export async function create_blog_controller(form_data) {
  try {
    const data = await create_blog(form_data);
    if (!data.success) {
      throw new Error({ message: "couldn't post blogs", success: false });
    }
    return data;
  } catch (error) {
    // console.error(error);
    return { message: error, success: false };
  }
}

export async function delete_blog_controller(blog_id) {
  try {
    const data = await delete_blog(blog_id);
    if (!data.success) {
      throw new Error({ message: "couldn't delete blogs", success: false });
    }
    return data;
  } catch (error) {
    console.error(error);
    return { message: error, success: false };
  }
}

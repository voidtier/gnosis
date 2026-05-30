import {
  get_guides_fetch,
  get_guide_by_id_fetch,
  create_guide_fetch,
  update_guide_fetch,
  delete_guide_fetch,
} from "../service/guide.service.js";

export async function get_guides_controller() {
  try {
    return await get_guides_fetch();
  } catch (error) {
    return { data: [], message: error.message, success: false };
  }
}

export async function get_guide_by_id_controller(id) {
  try {
    return await get_guide_by_id_fetch(id);
  } catch (error) {
    return { data: null, message: error.message, success: false };
  }
}

export async function create_guide_controller(body) {
  try {
    return await create_guide_fetch(body);
  } catch (error) {
    return { message: error.message, success: false };
  }
}

export async function update_guide_controller(id, body) {
  try {
    return await update_guide_fetch(id, body);
  } catch (error) {
    return { message: error.message, success: false };
  }
}

export async function delete_guide_controller(id) {
  try {
    return await delete_guide_fetch(id);
  } catch (error) {
    return { message: error.message, success: false };
  }
}

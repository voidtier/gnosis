import blog_model from "./blog.model.js";

export async function get_blog_controller(req, res) {
  try {
    const existing_blog = await blog_model.find();

    const blog_array = [...existing_blog];

    return res.status(200).json({
      data: blog_array,
      message: "blog is fetched",
      success: true,
    });
  } catch (error) {
    return res.status(500).send("couldn't get blog" + error.message);
  }
}
export async function create_blog_controller(req, res) {
  try {
    const { title, description, tag, status } = req.body;
    const { user } = req;

    if (!title) {
      throw new Error({ message: "title isn't filled", success: false });
    }
    if (!description) {
      throw new Error({ message: "description isn't filled", success: false });
    }
    if (!status) {
      throw new Error({ message: "status isn't filled", success: false });
    }

    const new_blog = new blog_model({
      owner_id: user._id,
      title,
      description,
      tag,
      status,
    });

    await new_blog.save();

    return res.status(200).json({
      message: "blog is created",
      success: true,
    });
  } catch (error) {
    return res.status(500).send("couldn't create blog" + error.message);
  }
}
export async function update_blog_controller(req, res) {
  try {
    const { user } = req;
    const blog_id = req.params.id;

    const updated_blog = await blog_model.findByIdAndUpdate(
      blog_id,
      { $set: req.body },
      { returnDocument: "after" },
    );

    return res.status(200).json({
      data: updated_blog,
      message: "blog is updated",
      success: true,
    });
  } catch (error) {
    return res.status(500).send("couldn't update blog" + error.message);
  }
}
export async function delete_blog_controller(req, res) {
  try {
    const { user } = req;
    const blog_id = req.params.id;

    await blog_model.findByIdAndDelete(blog_id);

    return res.status(200).json({
      message: "blog is deleted",
      success: true,
    });
  } catch (error) {
    return res.status(500).send("couldn't delete blog" + error.message);
  }
}

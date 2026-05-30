import guide_model from "./guide.model.js";

// GET /api/guide  — public, returns all published guides
export async function get_guides_controller(req, res) {
  try {
    const guides = await guide_model
      .find({ status: "published" })
      .select("-steps"); // steps are heavy, skip on list view
    return res
      .status(200)
      .json({ data: guides, message: "Guides fetched", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Couldn't get guides: " + error.message,
        success: false,
      });
  }
}

// GET /api/guide/:id  — public, returns one guide with all steps
export async function get_guide_by_id_controller(req, res) {
  try {
    const guide = await guide_model.findById(req.params.id);
    if (!guide) {
      return res
        .status(404)
        .json({ message: "Guide not found", success: false });
    }
    return res
      .status(200)
      .json({ data: guide, message: "Guide fetched", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Couldn't get guide: " + error.message,
        success: false,
      });
  }
}

// POST /api/guide  — admin only
export async function create_guide_controller(req, res) {
  try {
    const { title, description, difficulty, tag, status, steps } = req.body;
    const { user } = req;

    if (!title)
      return res
        .status(400)
        .json({ message: "Title is required", success: false });
    if (!description)
      return res
        .status(400)
        .json({ message: "Description is required", success: false });
    if (!status)
      return res
        .status(400)
        .json({ message: "Status is required", success: false });

    const new_guide = new guide_model({
      owner_id: user.id,
      title,
      description,
      difficulty: difficulty || "Beginner",
      tag: tag || null,
      status,
      steps: steps || [],
    });

    await new_guide.save();
    return res.status(201).json({ message: "Guide created", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Couldn't create guide: " + error.message,
        success: false,
      });
  }
}

// PATCH /api/guide/:id  — admin only
export async function update_guide_controller(req, res) {
  try {
    const updated = await guide_model.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true },
    );
    if (!updated)
      return res
        .status(404)
        .json({ message: "Guide not found", success: false });
    return res
      .status(200)
      .json({ data: updated, message: "Guide updated", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Couldn't update guide: " + error.message,
        success: false,
      });
  }
}

// DELETE /api/guide/:id  — admin only
export async function delete_guide_controller(req, res) {
  try {
    await guide_model.findByIdAndDelete(req.params.id);
    return res.status(200).json({ message: "Guide deleted", success: true });
  } catch (error) {
    return res
      .status(500)
      .json({
        message: "Couldn't delete guide: " + error.message,
        success: false,
      });
  }
}

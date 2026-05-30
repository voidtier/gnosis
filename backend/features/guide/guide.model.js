import mongoose from "mongoose";

const step_schema = new mongoose.Schema({
  guide_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "guide_model",
  },
  num: { type: String, required: true },
  title: { type: String, required: true },
  content: { type: String, required: true },
  code: { type: String, default: null },
  // image: { type: String, default: null },
});

const guide_schema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_model",
      required: true,
    },
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
      type: String,
      required: true,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    tag: { type: String, default: null },
    status: {
      type: String,
      required: true,
      enum: ["published", "draft"],
    },
    steps: { type: [step_schema], default: [] },
  },
  { timestamps: true },
);

const guide_model = mongoose.model("guide_model", guide_schema);
export default guide_model;

import mongoose from "mongoose";

const blog_schema = new mongoose.Schema(
  {
    owner_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user_model",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    tag: [
      {
        type: String,
        default: null,
      },
    ],
    status: {
      type: String,
      required: true,
      enum: ["published", "draft"],
    },
  },
  { timestamps: true },
);

const blog_model = mongoose.model("blog_model", blog_schema);

export default blog_model;

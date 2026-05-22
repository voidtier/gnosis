import mongoose from "mongoose";

const blog_schema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const blog_model = mongoose.model("blog_model", blog_schema);

export default blog_model;

import mongoose from "mongoose";

const guide_schema = new mongoose.Schema(
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

const guide_model = mongoose.model("guide_model", guide_schema);

export default guide_model;

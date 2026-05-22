import mongoose from "mongoose";

const documentation_schema = new mongoose.Schema(
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

const documentation_model = mongoose.model(
  "documentation_model",
  documentation_schema,
);

export default documentation_model;

import mongoose from "mongoose";

async function connect_to_db() {
  if (!process.env.mongo_db_uri) {
    throw new Error("could get uri from environment variable");
  }
  await mongoose.connect(process.env.mongo_db_uri);
  console.log("DB is Connected");
}

export default connect_to_db;

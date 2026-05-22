import app from "./app.js";
import connect_to_db from "./config/database.js";
import dotenv from "dotenv";
dotenv.config();
const activePort = process.env.PORT || "3000";
async function start_server() {
  try {
    await connect_to_db();
    app.listen(activePort, () => {
      console.log(`server is running at port : ${activePort}`);
    });
  } catch (error) {
    console.log(`error while connecting to db : ${error}`);
  }
}

start_server();

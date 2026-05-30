import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import auth_router from "./features/auth/auth.route.js";
import blog_router from "./features/blog/blog.route.js";
import guide_router from "./features/guide/guide.route.js"; // ← NEW

const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/auth", auth_router);
app.use("/api/blog", blog_router);
app.use("/api/guide", guide_router); // ← NEW

export default app;

import express from "express";
const router = express.Router();
import { login_admin_controller, get_user_data } from "./auth.controller.js";
import authentify_admin from "../admin/authentify_admin.middleware.js";

router.post("/admin/login", login_admin_controller);
router.get("/admin/user_data", authentify_admin, get_user_data);

export default router;

import express from "express";
const router = express.Router();
import {
  create_blog_controller,
  get_blog_controller,
  update_blog_controller,
  delete_blog_controller,
} from "./blog.controller.js";
import authentify_admin from "../admin/authentify_admin.middleware.js";

router.get("/", authentify_admin, get_blog_controller);
router.post("/", authentify_admin, create_blog_controller);
router.patch("/:id", authentify_admin, update_blog_controller);
router.delete("/:id", authentify_admin, delete_blog_controller);

export default router;

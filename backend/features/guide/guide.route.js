import express from "express";
const router = express.Router();
import {
  get_guides_controller,
  get_guide_by_id_controller,
  create_guide_controller,
  update_guide_controller,
  delete_guide_controller,
} from "./guide.controller.js";
import authentify_admin from "../admin/authentify_admin.middleware.js";

router.get("/", get_guides_controller); // public — list all published
router.get("/:id", get_guide_by_id_controller); // public — single guide with steps
router.post("/", authentify_admin, create_guide_controller); // admin only
router.patch("/:id", authentify_admin, update_guide_controller); // admin only
router.delete("/:id", authentify_admin, delete_guide_controller); // admin only

export default router;

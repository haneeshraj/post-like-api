import express from "express";
import {
  addPost,
  deletePost,
  getAllPosts,
  getPost,
  likePost,
} from "../controllers/postControllers.js";

const router = express.Router();

router.route("/").get(getAllPosts).post(addPost);
router.route("/:id").get(getPost).delete(deletePost);
router.route("/like/:id").post(likePost);
export default router;

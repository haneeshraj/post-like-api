import express from "express";
import {
  addUser,
  deleteUser,
  getAllUsers,
  getUser,
} from "../controllers/userControllers.js";

const router = express.Router();

router.route("/").get(getAllUsers).post(addUser);
router.route("/:id").get(getUser).delete(deleteUser);

export default router;

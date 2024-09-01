import {
  createUser,
  updateUser,
  getUsers,
  getUser,
  deleteUser,
} from "controllers/user.controller.js";
import { Router } from "express";

export const router = Router();

router.route("/register").post(createUser);
router.route("/update/:id").put(updateUser);
router.route("/get").get(getUsers);
router.route("/get/:id").get(getUser);
router.route("/delete/:id").delete(deleteUser);

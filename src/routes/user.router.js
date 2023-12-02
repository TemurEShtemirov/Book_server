import { Router } from "express";
import {
  getAllUsers,
  getByIdUser,
  registerUser,
  loginUser,
  updateUser,
  deleteAllUsers,
  deleteByIdUser,
} from "../controller/user.controller.js";
import upload from "../helper/multer.helper.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getByIdUser);
userRouter.post("/sing_up", upload.single("avatar"), registerUser);
userRouter.post("/sing_in", loginUser);
userRouter.put("/:id", upload.single("avatar"), updateUser);
userRouter.delete("/", deleteAllUsers);
userRouter.delete("/:id", deleteByIdUser);

export default userRouter;

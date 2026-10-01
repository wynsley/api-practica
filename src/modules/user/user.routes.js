import Router from "express"
import { userController } from "./user.controller.js";

const userRoutes = Router();

userRoutes.post(
  "/",
  userController.createUser
)
userRoutes.get(
  "/", 
  userController.getUsers
);
userRoutes.get(
  "/:id", 
  userController.getUserById
);

export {userRoutes}
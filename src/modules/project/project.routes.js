import { Router } from "express";
import { projectController } from "./project.controller.js";

const projectRoutes = Router();

projectRoutes.get(
  "/", 
  projectController.getProjects
);
projectRoutes.post(
  "/", 
  projectController.createProject
);
projectRoutes.post(
  "/:id/users", 
  projectController.addUserToProject
);

export {projectRoutes};
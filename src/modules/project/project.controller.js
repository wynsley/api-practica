import { projectService } from "./project.service.js";
import { projectFields } from "./projects.fields.js";

export const projectController = {

  createProject: async (req, res, next) => {
    try {
      const { name, category, startDate, endDate, state, idLeader } = req.body;

      if (!name || !category || !startDate || !state || !idLeader) {
        return res
          .status(400)
          .json({ success: false, message: "Faltan campos obligatorios" });
      }

      const project = await projectService.create({
        name,
        category,
        startDate: new Date(startDate),
        endDate: endDate ? new Date(endDate) : null,
        state,
        idLeader,
      });

      return res.status(201).json({
        success: true,
        message: "Proyecto creado",
        project,
      });
    } catch (error) {
      next(error);
    }
  },

  getProjects: async (req, res, next) => {
    try {
      const { state, category, search, sortBy, order } = req.query;
      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

      const result = await projectService.get(page, limit, {
        state,
        category,
        search,
        sortBy,
        order,
      });

      return res.status(200).json({
        success: true,
        message: "Proyectos obtenidos",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  },

  addUserToProject: async (req, res, next) => {
  try {
    const idProject = req.params.id;
    const { idUser } = req.body;

    if (!idProject || !idUser) {
      return res
        .status(400)
        .json({ success: false, message: "Faltan datos obligatorios" });
    }

    const project = await projectService.addUser(idProject, { idUser });

    return res.status(201).json({
      success: true,
      message: "Trabajador agregado al proyecto",
      project,
    });
  } catch (error) {
    next(error);
  }
},
};
import { authUtils } from "#src/utils/auth.utils.js";
import { userService } from "./user.service.js";

export const userController = {
  createUser: async (req, res, next) => {
    try {
      const {fullname, email, phone, nickname, password } = req.body;

      const passwordHash = await authUtils.generatePasswordHash({ password });

      const user = await userService.create({
        fullname,
        email,
        phone,
        nickname,
        passwordHash,
      });

      return res.status(201).json({
        success: true,
        message: "Usuario creado",
        user,
      });
    } catch (error) {
      next(error);
    }
  },

  getUsers: async (req, res, next) => {
    try {
      const { nickname, search, sortBy, order } = req.query;

      const page = Math.max(Number(req.query.page) || 1, 1);
      const limit = Math.min(Math.max(Number(req.query.limit) || 10, 1), 100);

      const result = await userService.get(page, limit, {
        nickname,
        search,
        sortBy,
        order,
      });

      return res.status(200).json({
        success: true,
        message: "Usuarios obtenidos",
        ...result,
      });
    } catch (error) {
      next(error);
    }
  },

  getUserById: async (req, res, next) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ success: false, message: "Id inválido" });
    }

    const user = await userService.getById(id);
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "Usuario no encontrado" });
    }

    return res.status(200).json({ success: true, user });
  } catch (error) {
    next(error);
  }
},
};
import { prisma } from "../../config/prisma.js";
import { projectFields } from "./projects.fields.js";

export const projectService = {
  create: async ({ 
    name, 
    category, 
    startDate,
    endDate = null, 
    state, 
    idLeader 
  }) => {
    return prisma.project.create({
      data: {
        name,
        category,
        startDate,
        endDate,
        state,
        users: { create: { idUser: idLeader, role: "LEADER" } },
      },
      select: projectFields.select,
    });
  },

  get: async (page, limit, filters = {}) => {
    const skip = (page - 1) * limit;
    const { state, category, search, sortBy, order } = filters;

    const where = {};
    if (state) where.state = state;
    if (category) where.category = category;
    if (search) {
      where.OR = projectFields.search.map((field) => ({
        [field]: { contains: search, mode: "insensitive" },
      }));
    }

    const sortField = projectFields.sort.includes(sortBy) ? sortBy : "createdAt";
    const sortOrder = order === "asc" ? "asc" : "desc";

    const [projects, total] = await prisma.$transaction([
      prisma.project.findMany({
        where,
        select: projectFields.select,
        skip,
        take: limit,
        orderBy: [{ [sortField]: sortOrder }, { idProject: "asc" }],
      }),
      prisma.project.count({ where }),
    ]);

    return {
      projects,
      pagination: {
        total,
        limit,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  addUser: async (idProject, { idUser }) => {
    return prisma.project.update({
    where: { idProject },
    data: { users: { create: { idUser, role: "WORKER" } } },
    select: projectFields.select,
  });
},
};
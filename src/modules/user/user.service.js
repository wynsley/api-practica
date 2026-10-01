import { prisma } from "../../config/prisma.js";
import { userFields } from "./user.fields.js";

export const userService = {
  create: async ({ 
    fullname, 
    email, 
    phone,
    nickname, 
    passwordHash 
  }) => {
    return prisma.user.create({
      data: { fullname, email, phone, nickname, passwordHash },
      select: userFields.select,
    });
  },

  get: async (page, limit, filters = {}) => {
    const skip = (page - 1) * limit;
    const { nickname, search, sortBy, order } = filters;

    const where = {};
    if (nickname) where.nickname = nickname;
    if (search) {
      where.OR = userFields.search.map((field) => ({
        [field]: { contains: search, mode: "insensitive" },
      }));
    }

    const sortField = userFields.sort.includes(sortBy) ? sortBy : "fullname";
    const sortOrder = order === "desc" ? "desc" : "asc";

    const [users, total] = await prisma.$transaction([
      prisma.user.findMany({
        where,
        select: userFields.select,
        skip,
        take: limit,
        orderBy: [{ [sortField]: sortOrder }, { idUser: "asc" }],
      }),
      prisma.user.count({ where }),
    ]);

    return {
      users,
      pagination: {
        total,
        limit,
        page,
        totalPages: Math.ceil(total / limit),
      },
    };
  },

  getById: async (idUser) => {
    return prisma.user.findUnique({
      where: { idUser },
      select: {
        ...userFields.select,
        projects: {
          select: {
            role: true,
            assignedAt: true,
            project: {
              select: {
                idProject: true,
                name: true,
                category: true,
                startDate: true,
                endDate: true,
                state: true,
              },
            },
          },
        },
      },
    });
  },
};
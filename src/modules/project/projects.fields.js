const projectFields = {
  sort: [
    "name", 
    "category", 
    "startDate", 
    "endDate", 
    "state", 
    "createdAt"
  ],

  roles: ["LEADER", "WORKER"],

  select: {
    idProject: true,
    name: true,
    category: true,
    startDate: true,
    endDate: true,
    state: true,
    createdAt: true,
    updatedAt: true,
    users: {
      select: {
        role: true,
        assignedAt: true,
        user: {
          select: {
            idUser: true,
            fullname: true,
            email: true,
            nickname: true,
          },
        },
      },
    },
  },

  search: ["name", "category"],
};

export { projectFields };
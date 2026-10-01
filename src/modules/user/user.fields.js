const userFields = {

  sort: [
    "fullname",  
    "email", 
    "phone", 
    "nickname", 
    "createdAt", 
    "updatedAt"
  ],

  select: {
    idUser: true,
    fullname: true,
    email: true,
    phone: true,
    nickname: true,
    createdAt: true,
    updatedAt: true,
  },

  search: ["fullname", "nicknme", "phone"],
};

export { userFields };
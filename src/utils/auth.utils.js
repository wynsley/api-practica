import bcrypt from "bcrypt"

export const  authUtils = {
  generatePasswordHash: async ({password}) => {
    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS) || 10;
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
    return passwordHash
  }
} 
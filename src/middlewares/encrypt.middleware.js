import bcrypt from "bcrypt";

export const encrypt = async (str) => {
  try {
    const SALT = parseInt(process.env.SALT_ROUNDS);
    const hashedString = await bcrypt.hash(str, SALT);
    return hashedString;
  } catch (error) {
    throw error;
  }
};

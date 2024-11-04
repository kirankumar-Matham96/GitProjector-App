import bcrypt from "bcrypt";

/**
 * Asynchronously encrypts a given string using bcrypt.
 *
 * This function generates a hash for the provided string using a salt defined
 * by the SALT_ROUNDS environment variable. It returns the hashed string.
 *
 * @param {string} str - The string to be encrypted.
 * @returns {Promise<string>} - A promise that resolves to the hashed string.
 * @throws {Error} - Throws an error if hashing fails.
 */
export const encrypt = async (str) => {
  try {
    // Parse the number of salt rounds from the environment variable
    const SALT = parseInt(process.env.SALT_ROUNDS);
    
    // Generate a hashed string using bcrypt
    const hashedString = await bcrypt.hash(str, SALT);
    
    // Return the hashed string
    return hashedString;
  } catch (error) {
    // Throw the error to be handled by the calling function
    throw error;
  }
};

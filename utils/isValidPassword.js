import bcrypt from "bcrypt";

const isValidPassword = (plainPassword, hashedPassword) => {
  return bcrypt.compare(plainPassword, hashedPassword);
};

export default isValidPassword;

import bcrypt from "bcrypt";

const createHashPasswrod = (password) => {
  return bcrypt.hash(password, parseInt(process.env.SECRET_SALT_ROUND));
};

export default createHashPasswrod;

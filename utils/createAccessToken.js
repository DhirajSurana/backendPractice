import jwt from "jsonwebtoken";

const createAccessToken = (user) => {
  const { username, email, role, password } = user;

  const token = jwt.sign({ username, email, role }, process.env.JWT_SECRET, {
    expiresIn: "15m",
  });

  return token;
};

export { createAccessToken };

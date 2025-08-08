import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDatabase from "./database/connectToDatabase.js";
import router from "./router.js";

const app = express();
const PORT = process.env.DEV_PORT || 3000;

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to the Store App API");
});
app.use("/api/v1", router);

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to the database:", error);
    process.exit(1); // Exit the process with failure
  });

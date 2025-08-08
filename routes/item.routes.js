import Router from "express";
import itemController from "../controllers/item.controller.js";

export default Router()
  .get("/", itemController.getAllItems)
  .get("/:id", itemController.getItem)
  .post("/", itemController.createItem)
  .put("/:id", itemController.updateItem)
  .delete("/:id", itemController.deleteItem);

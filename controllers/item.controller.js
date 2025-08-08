import { Item } from "../models/item.model.js";
import ApiRespnose from "../utils/apiRespnose.js";

class itemController {
  async createItem(req, res) {
    try {
      const newItem = await Item.create(req.body);
      if (await Item.findById(newItem._id)) {
        return ApiRespnose.success(
          res,
          newItem,
          "Item created successfully",
          201
        );
      } else {
        return ApiRespnose.error(res, "Failed to create item", null, 400);
      }
    } catch (error) {
      return ApiRespnose.error(res, "Error creating item", error, 500);
    }
  }

  async getAllItems(req, res) {
    try {
      const items = await Item.find();
      return ApiRespnose.success(res, items, "Items fetched successfully");
    } catch (error) {
      return ApiRespnose.error(res, "Error fetching items", error);
    }
  }
  async getItem(req, res) {
    try {
      const { id } = req.params;
      const item = await Item.findById(id);

      if (!item) {
        return ApiRespnose.error(res, "Item not found", null, 404);
      }
      return ApiRespnose.success(res, item, "Item fetched successfully");
    } catch (error) {
      return ApiRespnose.error(res, "Item not found", error, 404);
    }
  }

  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const updatedItem = await Item.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedItem) {
        return ApiRespnose.error(res, "Item not found", null, 404);
      }
      return ApiRespnose.success(res, updatedItem, "Item updated successfully");
    } catch (error) {
      return ApiRespnose.error(res, "Error updating item", error);
    }
  }

  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const deletedItem = await Item.findByIdAndDelete(id);
      if (!deletedItem) {
        return ApiRespnose.error(res, "Item not found", null, 404);
      }
      return ApiRespnose.success(res, deletedItem, "Item deleted successfully");
    } catch (error) {
      return ApiRespnose.error(res, "Error deleting item", error);
    }
  }
}

export default new itemController();

import { ItemModel } from "../models/item.model.js";

class itemController {
  async createItem(req, res) {
    try {
      const newItem = ItemModel.create(req.body);
      if (ItemModel.findById(newItem._id)) {
        res
          .status(201)
          .json({ message: "Item created successfully", data: newItem });
      } else {
        res.status(400).json({ message: "Failed to create item" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error creating item", error });
    }
  }

  async getAllItems(req, res) {
    try {
      const items = await ItemModel.find();
      res
        .status(200)
        .json({ message: "item fetched successfully", data: items });
    } catch (error) {
      res.status(500).json({ message: "Error fetching items", error });
    }
  }
  async getItem(req, res) {
    try {
      const { id } = req.params;
      const item = await ItemModel.findById(id);
      if (!item) {
        return res.status(404).json({ message: "Item not found" });
      }
      res
        .status(200)
        .json({ message: "item fetched successfully", data: item });
    } catch (error) {
      res.status(500).json({ message: "Error fetching items", error });
    }
  }

  async updateItem(req, res) {
    try {
      const { id } = req.params;
      const updatedItem = await ItemModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res
        .status(200)
        .json({ message: "item updated successfully", data: updatedItem });
    } catch (error) {
      res.status(500).json({ message: "Error updating item", error });
    }
  }

  async deleteItem(req, res) {
    try {
      const { id } = req.params;
      const deletedItem = await ItemModel.findByIdAndDelete(id);
      if (!deletedItem) {
        return res.status(404).json({ message: "Item not found" });
      }
      res.status(200).json({ message: "Item deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Error deleting item", error });
    }
  }
}

export default new itemController();

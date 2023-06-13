import dotenv from "dotenv";
import joi from "joi";
import Category from "../models/category";

dotenv.config();
const categorySchema = joi.object({
  name: joi.string().required(),
});
export const getAll = async (req, res) => {
  try {
    const categories = await Category.find({});
    if (!categories) {
      return res.json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    return res.json({
      message: "Lấy sản phẩm thành công",
      categories,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const get = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate(
      "products"
    );
    if (!category) {
      return res.json({
        message: "Không tìm thấy danh mục",
      });
    }
    return res.json(category);
  } catch (error) {
    return res.status(400).json({
      message: error.message,
    });
  }
};
export const create = async (req, res) => {
  try {
    const { error } = categorySchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const category = await Category.create(req.body);
    if (!category) {
      return res.json({
        message: "Thêm danh mục không thành công",
      });
    }
    return res.json({
      message: "Thêm danh mục thành công",
      category,
    });
  } catch (error) {
    return res.status(400).json({
      message: error,
    });
  }
};
export const remove = async (req, res) => {
  try {
    const id = req.params.id;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({
        message: "Không tìm thấy sản phẩm",
      });
    }
    if (!category.isDeleteable) {
      return res.status(400).send({ message: "Không thể xóa danh mục này" });
    }
    return res.status(200).json({
      message: "Xóa danh mục thành công",
      category,
    });
  } catch (error) {
    res.status(400).json({
      message: "Xóa sản phẩm thất bại",
      error: error.message,
    });
  }
};

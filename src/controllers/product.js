import dotenv from "dotenv";
import Product from "../models/product";
import {productSchema} from "../schemas/product";
import Category from "../models/category";
import {paginate} from "mongoose-paginate-v2";
dotenv.config();

export const getAll = async (req, res) => {
    const {_litmit = 10, _sort = "createAt", _order = "asc"} = req.query;
    const options = {
        customLabel:{
            docs: "data",
            litmit: _litmit,
            _sort:{
                [_sort]: _order === "desc" ? -1 : 1,
            },
        },
    };
    try {
        const products = await Product.paginate({},options);
        if (products.length === 0) {
            return res.status(404).json({
                message: "Không có sản phẩm nào",
            });
        }
        return res.json({
            message: "Lấy danh sách sản phẩm thành công",
            products,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};

export const get = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("categoryId");

        if (!product) {
            return res.json({
                message: "Không tìm thấy sản phẩm",
            });
        }
        return res.json({
            message: "Lấy sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message
        });
    }
};
export const create = async (req, res) => {
    try {
        // validate
        const { error } = productSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                message: error.details[0].message,
            });
        }
        const product = await Product.create(req.body);
        await Category.findByIdAndUpdate(product.categoryId, {
            $addToSet: { products: product._id },
        });
        if (!product) {
            return res.json({
                message: "Thêm sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Thêm sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const update = async (req, res) => {
    try {
        const product = await Product.findOneAndUpdate({ _id: req.params.id }, req.body, {
            new: true,
        });
        if (!product) {
            return res.json({
                message: "Cập nhật sản phẩm không thành công",
            });
        }
        return res.json({
            message: "Cập nhật sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
export const remove = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        return res.json({
            message: "Xóa sản phẩm thành công",
            product,
        });
    } catch (error) {
        return res.status(400).json({
            message: error.message,
        });
    }
};
import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
        },
        price: {
            type: Number,
        },
        image: {
            type: String,
        },
        description: {
            type: String,
        },
        categoryId: {
            type: mongoose.Types.ObjectId,
            ref: "Category",
        },
        slug: { type: String, slug: "name" },
    },

    { timestamps: true, versionKey: false }
);
productSchema.plugin(mongoosePaginate);

export default mongoose.model("Product", productSchema);
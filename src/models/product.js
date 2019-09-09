import mongoose from "mongoose";

const Schema = mongoose.Schema;

const productSchema = Schema(
  {
    name: {
      type: String,
      required: true
    },
    images: {
      type: Array,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: "Category"
    },
    quantity: {
      type: Number,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Product", productSchema);

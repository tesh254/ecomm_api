import mongoose from "mongoose";

const Schema = mongoose.Schema;

const orderSchema = Schema(
  {
    cart: {
      type: Array,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    amount: {
      type: Number,
      required: true
    },
    // transaction: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Transaction"
    // },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Order", orderSchema);

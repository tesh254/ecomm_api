import mongoose from "mongoose";

const Schema = mongoose.Schema;

const transactionSchema = Schema(
  {
    transaction_id: {
      type: String,
      required: true
    },
    amount: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    transactionDate: {
      type: Date,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model("Transaction", transactionSchema);

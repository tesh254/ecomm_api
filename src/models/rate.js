import mongoose from "mongoose";

const Schema = mongoose.Schema;

const rateSchema = Schema(
  {
    rateValue: {
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

export default mongoose.model("Rate", rateSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const reviewSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  review: {
    type: String,
    required: true
  }
}, {
  timestamps: true
});

export default mongoose.model("Review", reviewSchema);

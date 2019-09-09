import mongoose from "mongoose";

const Schema = mongoose.Schema;

const profileSchema = Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    location: {
        type: String,
        required: false
    }
});

export default mongoose.model("Profile", profileSchema);

import mongoose from "mongoose";

const Schema = mongoose.Schema;

const userSchema = Schema({
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    password: {
        type: String, 
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        default: false
    },
    role: {
        type: String,
        default: "User"
    },
    isActivated: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model("User", userSchema);

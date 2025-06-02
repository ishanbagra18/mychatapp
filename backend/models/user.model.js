import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirmPassword: {
    type: String,
  },
  profilePic: { // New field for profile picture
    type: String,
default: "https://tse4.mm.bing.net/th?id=OIP.yA6YvWaP4N4NfEvaDmmVjwHaEm&pid=Api&P=0&h=180", 
  },
}, { timestamps: true }); // createdAt & updatedAt

const User = mongoose.model("User ", userSchema);
export default User;

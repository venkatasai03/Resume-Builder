import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String }, 
  authProvider: { type: String, enum: ['local', 'google'], default: 'local' },
  bio:{type: String, required: false},
  location:{type: String, required: false},
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("User", UserSchema);

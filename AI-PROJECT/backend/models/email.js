import mongoose from "mongoose";

const EmailSchema = new mongoose.Schema({
  from: String,
  subject: String,
  body: String,
  category: String,
  date: Date,
});

export const Email = mongoose.model("Email", EmailSchema);

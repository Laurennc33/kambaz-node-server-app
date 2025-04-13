import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema({
  _id: String, 
  title: { type: String, required: true },
  course: { type: String, required: true }, 
  description: { type: String },
  points: { type: Number, default: 0 },
}, { collection: "assignments" });

export default assignmentSchema;

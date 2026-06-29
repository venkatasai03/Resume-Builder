import mongoose from "mongoose";

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  template: { type: String, default: "classic" },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  linkedin: { type: String, required: true },
  summary: { type: String, required: true, default: "" },
  experience: [
    {
      jobTitle: String,
      company: String,
      location: String,
      startDate: String,
      endDate: String,
      responsibilities: [String],
    },
  ],
  skills: [String],
  education: [
    {
      degree: String,
      institution: String,
      graduationYear: String,
    },
  ],
  projects: [
    {
      name: String,
      description: String,
      technologies: [String],
    },
  ],
});

const Resume = mongoose.model("Resume", ResumeSchema);
export default Resume;

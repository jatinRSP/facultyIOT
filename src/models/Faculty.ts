import mongoose from 'mongoose'

const FacultySchema = new mongoose.Schema({
  facultyName: { type: String },
  mobileNumber: { type: String },
  email: { type: String, required: true, unique: true },
  cabinLocation: { type: String },
  facultyId: { type: String, required: true, unique: true },
  mac: { type: String },
  password: { type: String, required: true },
  availability: { type: Boolean, default: false },
  role: { type: String, default: 'faculty', enum: ['faculty', 'admin'] },
})

export default mongoose.models.Faculty || mongoose.model('Faculty', FacultySchema)


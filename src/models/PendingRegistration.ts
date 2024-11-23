import mongoose from 'mongoose'

const PendingRegistrationSchema = new mongoose.Schema({
  facultyId: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  token: { type: String, required: true },
  status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now, expires: '24h' } // Token expires after 24 hours
})

export default mongoose.models.PendingRegistration || mongoose.model('PendingRegistration', PendingRegistrationSchema)


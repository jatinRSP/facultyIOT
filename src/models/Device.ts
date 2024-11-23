import mongoose from 'mongoose'

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mac: { type: String, required: true, unique: true }
})

export default mongoose.models.Device || mongoose.model('Device', DeviceSchema)


import mongoose from 'mongoose'

const DeviceSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  mac: { type: String, }
})

export default mongoose.models.Device || mongoose.model('Device', DeviceSchema)


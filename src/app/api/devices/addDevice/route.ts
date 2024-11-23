import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Device from '@/models/Device'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { name } = await request.json()

    let deviceName = name.trim();

    const device = await Device.findOne({ name: deviceName })

    if (device) {
      return NextResponse.json({ status: "error", error: 'Device id already available' }, { status: 401 })
    }

    const newDevice = new Device({ name: deviceName });
    await newDevice.save();

    // For simplicity, we're just returning a success message
    let message = `Device Name: ${deviceName} is successfully created`;
    return NextResponse.json({ status: "success", message: message }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 })
  }
}


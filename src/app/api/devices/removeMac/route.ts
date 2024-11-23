import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Device from '@/models/Device'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { name } = await request.json()

    let deviceName = name.trim();
    const device = await Device.findOne({ name: deviceName });

    if (!device) {
      return NextResponse.json({ status: "error", error: 'Invalid device ID' }, { status: 401 })
    }

    const macid = device.mac;
    device.mac = null;
    await device.save();

    // For simplicity, we're just returning a success message
    let message = `MacID: ${macid} is successfully unallocated from Device Name: ${deviceName}`;
    return NextResponse.json({ status: "success", message: message }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred during removing macid from device' }, { status: 500 })
  }
}


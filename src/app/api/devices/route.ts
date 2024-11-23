import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Device from '@/models/Device'

export async function GET() {
  try {
    await dbConnect();

    // fetch devices which has macid
    const devices = await Device.find({ mac: { $ne: null } });

    let data = devices || [];
    return NextResponse.json({ status: "success", data: devices}, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 })
  }
}


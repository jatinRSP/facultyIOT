import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Device from '@/models/Device'

export async function GET() {
  try {
    await dbConnect()
    const devices = await Device.find({}).select('name mac -_id').lean()
    return NextResponse.json(devices)
  } catch (error) {
    console.error('Error fetching devices:', error)
    return NextResponse.json({ error: 'Failed to fetch devices' }, { status: 500 })
  }
}


import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Faculty from '@/models/Faculty'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const {macid, status} = await request.json()

    const existingFaculty = await Faculty.findOne({ mac: macid })

    existingFaculty.availability = status;
    await existingFaculty.save();
    return NextResponse.json({ message: 'Faculty availability changes successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error change faculty availability:', error)
    return NextResponse.json({ error: 'Failed to changes faculty availability' }, { status: 500 })
  }
}


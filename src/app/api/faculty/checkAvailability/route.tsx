import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Faculty from '@/models/Faculty'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const {macid} = await request.json()

    const faculty = await Faculty.findOne({ mac: macid })

    if (!faculty) {
      return NextResponse.json({ status: "error", data:{ message: 'Faculty not found'} }, { status: 404 })
    }
  
    let isAvailable = faculty.availability
    let message = `faculty is ${isAvailable ? 'available' : 'not available'}`

    return NextResponse.json({ status: "success", data: { isAvailable: faculty.availability, message:message } }, { status: 201 })
  } catch (error) {
    console.error('Error fetch faculty availability:', error)
    return NextResponse.json({ error: 'Failed to fetch faculty availability' }, { status: 500 })
  }
}


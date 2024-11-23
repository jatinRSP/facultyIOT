import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Faculty from '@/models/Faculty'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const facultyDetails = await request.json()

    const newFaculty = new Faculty(facultyDetails)
    await newFaculty.save()

    return NextResponse.json({ message: 'Faculty details submitted successfully' }, { status: 201 })
  } catch (error) {
    console.error('Error submitting faculty details:', error)
    if (error instanceof Error && error.name === 'ValidationError') {
      return NextResponse.json({ error: 'Invalid faculty details' }, { status: 400 })
    }
    return NextResponse.json({ error: 'Failed to submit faculty details' }, { status: 500 })
  }
}


import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Faculty from '@/models/Faculty'
import PendingRegistration from '@/models/PendingRegistration'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { facultyId, password, token } = await request.json()

    // Find the pending registration
    const pendingRegistration = await PendingRegistration.findOne({ facultyId, token, status: 'pending' })

    if (!pendingRegistration) {
      return NextResponse.json({ error: 'Invalid faculty ID, token, or registration already completed' }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create a new faculty record
    const newFaculty = new Faculty({
      facultyId: pendingRegistration.facultyId,
      email: pendingRegistration.email,
      password: hashedPassword
    })

    await newFaculty.save()

    // Update the pending registration status
    pendingRegistration.status = 'completed'
    await pendingRegistration.save()

    return NextResponse.json({ message: 'Faculty registration successful' }, { status: 201 })
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ error: 'Registration failed' }, { status: 500 })
  }
}


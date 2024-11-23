import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Faculty from '@/models/Faculty'
import PendingRegistration from '@/models/PendingRegistration'
import bcrypt from 'bcryptjs'
import { v6 as UUID } from 'uuid'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { email, password, token } = await request.json()
    const facultyId = UUID();


    // Find the pending registration
    const pendingRegistration = await PendingRegistration.findOne({ email, token, status: 'pending' })

    if (!pendingRegistration) {
      return NextResponse.json({ error: 'Invalid email, token, or registration already completed' }, { status: 400 })
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log('hashedPassword:', hashedPassword)
    // Create a new faculty record
    const newFaculty = new Faculty({
      facultyId: facultyId,
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


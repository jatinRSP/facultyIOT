import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Faculty from '@/models/Faculty'
import bcrypt from 'bcryptjs'

export async function POST(request: Request) {
  try {
    await dbConnect()
    const { email, password } = await request.json()

    const faculty = await Faculty.findOne({ email })

    if (!faculty) {
      return NextResponse.json({ error: 'Invalid faculty ID or password' }, { status: 401 })
    }

    const isPasswordValid = await bcrypt.compare(password, faculty.password)

    console.log('isPasswordValid:', isPasswordValid);

    if (!isPasswordValid) {
      return NextResponse.json({ error: 'Invalid faculty ID or password' }, { status: 401 })
    }

    // Here you would typically create a session or JWT token
    // For simplicity, we're just returning a success message
    return NextResponse.json({ message: 'Login successful' }, { status: 200 })
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ error: 'An error occurred during login' }, { status: 500 })
  }
}


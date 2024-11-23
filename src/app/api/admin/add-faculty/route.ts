import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PendingRegistration from "@/models/PendingRegistration";
import { generateToken, sendTokenEmail } from "@/lib/util";
import mongoose from "mongoose";

export async function POST(request: Request) {
  try {
    await dbConnect();
    const { facultyId, email } = await request.json();

    // Check if faculty already exists
    const existingRegistration = await PendingRegistration.findOne({
      $or: [{ facultyId }, { email }],
    });
    if (existingRegistration) {
      return NextResponse.json(
        {
          error:
            "Faculty with this ID or email already has a pending registration",
        },
        { status: 400 }
      );
    }

    // Generate a unique token
    const token = generateToken();
    const newPendingRegistration = new PendingRegistration({
      facultyId,
      email,
      token,
    });

    // Save the registration to the database
    await newPendingRegistration.save();

    // For testing: Log the token instead of sending an email
    console.log(`Registration token for ${email}: ${token}`);
    sendTokenEmail(email, token)
      .then((data) => {
        return NextResponse.json(
          {
            message:
              "Faculty added successfully. Check server logs for the registration token.",
            token: token, // Remove this line in production
          },
          { status: 201 }
        );
      })
      .catch((err) => {
        // delete the registration if email sending fails
        PendingRegistration.deleteOne({
          _id: newPendingRegistration._id,
        }).catch((err) => {
          console.error("Error deleting registration: ", err);
        });
      });
  } catch (error) {
    console.error("Error adding faculty:", error);
    return NextResponse.json(
      { error: "Failed to add faculty" },
      { status: 500 }
    );
  }
}

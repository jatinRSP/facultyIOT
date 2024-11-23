import { NextResponse } from "next/server";
import dbConnect from "@/lib/mongodb";
import PendingRegistration from "@/models/PendingRegistration";
import { generateToken, sendTokenEmail } from "@/lib/util";

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

    try {
      // Send email with token
      await sendTokenEmail(email, token);

      // Return success response
      return NextResponse.json(
        {
          message:
            "Faculty added successfully. Check server logs for the registration token.",
          token: token, // Remove this in production
        },
        { status: 201 }
      );
    } catch (emailError) {
      // Delete the registration if email sending fails
      await PendingRegistration.deleteOne({ _id: newPendingRegistration._id });
      console.error("Error sending email:", emailError);
      return NextResponse.json(
        { error: "Failed to send email. Registration canceled." },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error adding faculty:", error);
    return NextResponse.json(
      { error: "Failed to add faculty" },
      { status: 500 }
    );
  }
}

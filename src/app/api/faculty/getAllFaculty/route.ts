import dbConnect from "@/lib/mongodb";
import Faculty from "@/models/Faculty";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await dbConnect();

    const facultyData = await Faculty.find().lean();
    return NextResponse.json(facultyData, { status: 200 });
  } catch (error) {
    console.error("Error fetching faculty data:", error);
    return NextResponse.json(
      { error: "Failed to fetch faculty data" },
      { status: 500 }
    );
  }
}

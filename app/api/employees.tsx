import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const bodyText = await req.text(); // \u2705 Read request body as text
    console.log("Raw Body:", bodyText); // \u2705 Debugging log

    if (!bodyText) {
      return NextResponse.json({ error: "No data received" }, { status: 400 });
    }

    const { name, department, position } = JSON.parse(bodyText); // \u2705 Parse JSON manually

    if (!name || !department || !position) {
      return NextResponse.json({ error: "All fieldsk are required" }, { status: 400 });
    }

    const newEmployee = await prisma.employee.create({
      data: { name, department, position },
    });

    console.log("Employee Added:", newEmployee); // \u2705 Debugging log
    return NextResponse.json(newEmployee, { status: 201 });
  } catch (error) {
    console.error("Error adding employee:", error);
    return NextResponse.json({ error: "Error adding employee" }, { status: 500 });
  }
}

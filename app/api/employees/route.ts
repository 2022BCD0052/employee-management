import prisma from "@/lib/prism";
import { NextResponse } from "next/server";

// Get all employees
export async function GET() {
  try {
    const employees = await prisma.employee.findMany();
    return NextResponse.json(employees);
  } catch {
    return NextResponse.json({ error: "Error fetching employees" }, { status: 500 });
  }
}

// Add new employee
export async function POST(req: Request) {
  try {
    const body = await req.json();
    if (!body.name  || !body.department || !body.position) {
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    const newEmployee = await prisma.employee.create({
      data: {
        name: body.name,
        department: body.department,
        position: body.position,
      },
    });

    return NextResponse.json(newEmployee, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Error adding employee" }, { status: 500 });
  }
}

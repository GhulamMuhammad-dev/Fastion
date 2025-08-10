import { NextResponse } from "next/server";

export async function GET() {
  const mockProject = {
    id: "123",
    name: "Demo Animation",
    layers: [],
    timeline: []
  };
  return NextResponse.json(mockProject);
}

import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(): Promise<NextResponse> {
  try {
    (await cookies()).delete("authToken");
    return NextResponse.json(
      { message: "Cookie deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting cookie:", error);
    return NextResponse.json(
      { message: "Failed to delete cookie" },
      { status: 500 }
    );
  }
}

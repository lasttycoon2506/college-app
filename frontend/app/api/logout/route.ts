import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(): Promise<NextResponse> {
  try {
    (await cookies()).delete("authToken");
    return NextResponse.json({
      message: "Cookie deleted successfully",
      status: 200,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return NextResponse.json({
        error: error.message,
        status: 500,
      });
    }
    console.error("unexpected error occured while deleting cookie");
    return NextResponse.json({ error: "Failed to delete cookie", status: 500 });
  }
}

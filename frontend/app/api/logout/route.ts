import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export default async function GET() {
  const result = (await cookies()).delete("cookieName");

  console.log(result);
  return NextResponse.json({ message: "Cookie cleared" });
}

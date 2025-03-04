import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getUser(token: string) {
  const res: Response = await fetch(`http://localhost:8000/api/currentUser/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
}

export async function GET(): Promise<NextResponse> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("authToken");
  if (!cookie) {
    return NextResponse.json(
      { message: "No auth token found" },
      { status: 401 }
    );
  }

  const user = await getUser(cookie.value);
  console.log(user);

  return NextResponse.json({ message: "Login successful" }, { status: 200 });
}

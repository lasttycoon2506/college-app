import { mapBackendToFrontend, User, UserBackend } from "@/models/user";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getUser(token: string): Promise<UserBackend> {
  const res: Response = await fetch(`http://localhost:8000/api/currentUser/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export async function GET(): Promise<NextResponse> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");

  let userBackend: UserBackend;
  try {
    userBackend = await getUser(token!.value);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
  const user: User = mapBackendToFrontend(userBackend);
  if (!user.gpa) user.gpa = 0;
  if (!user.sat) user.sat = 0;
  if (!user.essay) user.essay = "";

  return NextResponse.json({ body: { user } }, { status: 200 });
}

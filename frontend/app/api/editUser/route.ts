import { EditUser } from "@/models/editUser";
import { UserApplication } from "@/models/userApplication";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function editUser(
  token: string,
  userData: EditUser
): Promise<UserApplication[]> {
  const response = await fetch("http://localhost:8000/api/currentUser/edit/", {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      first_name: userData.firstName,
      last_name: userData.lastName,
      email: userData.email,
      username: userData.email,
      password: userData.password,
      sat: userData.sat,
      gpa: userData.gpa,
      essay: userData.essay,
    }),
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const { userData }: { userData: EditUser } = await req.json();
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");

  try {
    await editUser(token!.value, userData);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
  return NextResponse.json({ status: 200 });
}

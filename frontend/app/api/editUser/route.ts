import { EditUser } from "@/models/editUser";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function editUser(token: string, userData: EditUser) {
  try {
    const response = await fetch(
      "http://localhost:8000/api/currentUser/edit/",
      {
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
      }
    );

    if (!response.ok) {
      const error = await response.json();
      return error;
    }
    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const userData: EditUser = await req.json();
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");
  const res = await editUser(token!.value, userData);
  if (res.error) {
    return NextResponse.json({ error: res.error }, { status: 400 });
  }
  return NextResponse.json({ status: 200 });
}

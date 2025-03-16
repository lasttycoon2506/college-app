import { ApiResponse } from "@/models/api-response";
import { EditUser } from "@/models/edit-user";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function editUser(
  token: string,
  userData: EditUser
): Promise<ApiResponse<number>> {
  try {
    const res: Response = await fetch(
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

    if (!res.ok) {
      const result = await res.json();
      return { error: result.error, statusCode: res.status };
    }
    return { statusCode: res.status };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return { error: { message: error.message, statusCode: 500 } };
    }
    return { error: { message: "unexpected error occurred", statusCode: 500 } };
  }
}

export async function PUT(req: NextRequest): Promise<NextResponse> {
  const userData: EditUser = await req.json();
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");
  const res = await editUser(token!.value, userData);
  if (res.error) {
    return NextResponse.json(
      { error: res.error },
      { status: res.error.statusCode }
    );
  }
  return NextResponse.json({ status: res.statusCode });
}

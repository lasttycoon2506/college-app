import { ApiResponse } from "@/models/api-response";
import { mapBackendToFrontend, User, UserBackend } from "@/models/user";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getUser(token: string): Promise<ApiResponse<UserBackend>> {
  try {
    const res: Response = await fetch(
      `http://localhost:8000/api/currentUser/`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await res.json();
    if (!res.ok) {
      return { error: { message: result, statusCode: res.status } };
    }
    return { data: result, statusCode: res.status };
  } catch (error: unknown) {
    if (error instanceof Error)
      return { error: { message: error.message, statusCode: 500 } };
    else
      return {
        error: {
          message: "unexpected error occured while retrieving user",
          statusCode: 500,
        },
      };
  }
}

export async function GET(): Promise<NextResponse> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");

  const res: ApiResponse<UserBackend> = await getUser(token!.value);
  if (res.error) {
    return NextResponse.json({
      error: res.error.message,
      status: res.error.statusCode,
    });
  }
  if (res.data) {
    const userBackend: UserBackend = res.data;
    const user: User = mapBackendToFrontend(userBackend);
    return NextResponse.json({ body: user, status: 200 });
  }
  return NextResponse.json({
    error: "unknown error occured while retrieving user",
    status: 500,
  });
}

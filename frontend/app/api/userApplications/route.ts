import { ApiResponse } from "@/models/api-response";
import { UserApplication } from "@/models/user-application";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function getUserApplications(
  token: string
): Promise<ApiResponse<UserApplication[]>> {
  try {
    const res = await fetch(
      "http://localhost:8000/api/currentUser/applications",
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
          message: "unknown error occured while retrieving user apps",
          statusCode: 500,
        },
      };
  }
}

export async function GET(): Promise<NextResponse> {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");

  const res = await getUserApplications(token!.value);
  if (res.error)
    return NextResponse.json({
      error: res.error.message,
      status: res.error.statusCode,
    });

  return NextResponse.json({
    body: res.data,
    status: res.statusCode,
  });
}

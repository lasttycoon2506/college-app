import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function fetchData(token: string) {
  const response = await fetch(`http://localhost:8000/api/currentUser/`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const json = await response.json();
  return json;
}

export async function GET() {
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");

  let userApplications;
  try {
    userApplications = await fetchData(token!.value);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: error.status }
    );
  }
}

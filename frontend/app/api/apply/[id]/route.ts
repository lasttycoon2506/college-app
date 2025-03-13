import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function apply(token: string, collegeId: number): Promise<any> {
  try {
    const response = await fetch(
      `http://localhost:8000/api/colleges/apply/${collegeId}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
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

export async function POST({
  params,
}: {
  params: { id: number };
}): Promise<NextResponse> {
  const { id } = await params;
  console.log(id);
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");
  const res = await apply(token!.value, id);
  if (res.error) {
    return NextResponse.json({ error: res.error }, { status: 400 });
  }
  return NextResponse.json({ status: 200 });
}

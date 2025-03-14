import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type ApiResponseType = {
  status: number;
  error: string;
};

async function apply(
  token: string,
  collegeId: number
): Promise<ApiResponseType> {
  try {
    const response: Response = await fetch(
      `http://localhost:8000/api/colleges/apply/${collegeId}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.json();
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
    else console.error("unknown error occurred");
    return { status: 500, error: "An error occurred" };
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { id }: { id: number } = await req.json();
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");
  const res: ApiResponseType = await apply(token!.value, id);
  if (res.error) {
    return NextResponse.json({ error: res.error }, { status: 400 });
  }
  return NextResponse.json({ status: 200 });
}

import { ApiResponse } from "@/models/api-response";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

type ApplyResponse = {
  applied: boolean;
  applicationId: number;
};

async function apply(
  token: string,
  collegeId: number
): Promise<ApiResponse<ApplyResponse>> {
  try {
    const res: Response = await fetch(
      `http://localhost:8000/api/colleges/apply/${collegeId}/`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const result = await res.json();
    if (!res.ok) {
      return {
        data: null,
        error: { message: result.error, statusCode: res.status },
      };
    }
    return { data: result, statusCode: res.status };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return { data: null, error: { message: error.message, statusCode: 500 } };
    }
    return {
      data: null,
      error: { message: "unknown error occurred", statusCode: 500 },
    };
  }
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  const { id }: { id: number } = await req.json();
  const cookieStore: ReadonlyRequestCookies = await cookies();
  const token: RequestCookie | undefined = cookieStore.get("authToken");
  const res: ApiResponse<ApplyResponse> = await apply(token!.value, id);
  if (res.error) {
    return NextResponse.json(
      { error: res.error },
      { status: res.error.statusCode }
    );
  }
  return NextResponse.json({ data: res.data, status: res.statusCode });
}

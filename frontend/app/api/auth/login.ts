import { cookies } from "next/headers";

async function getLoginToken(username: string, password: string) {
  const res = await fetch(`http://localhost:8000/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  return res.json();
}

export default async function Login(request: Request) {
  const { username, password } = await request.json();

  const res = await getLoginToken(username, password);

  if (res) {
    (await cookies()).set("authToken", res, {
      httpOnly: true, // Recommended for security
      secure: process.env.NODE_ENV === "production", // Recommended for production
      sameSite: "strict", // Recommended for security
      path: "/", // Adjust as needed
    });
  }
}

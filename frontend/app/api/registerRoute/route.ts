type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

async function Register(userData: UserData) {
  const res: Response = await fetch(`http://localhost:8000/api/token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export async function POST() {}

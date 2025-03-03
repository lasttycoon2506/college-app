"use client";
import AuthContext from "@/context/AuthContext";
import { FormEvent, useContext, useState } from "react";

export default function Login(): React.ReactNode {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { loading, user, isAuthenticated, error, login } =
    useContext(AuthContext);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    login({ username, password });
    console.log(error);
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <div className="inputBox">
          <input
            type="email"
            placeholder="Username"
            className="input input-bordered md:w-auto"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            required
          />
        </div>
        <div className="inputBox">
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered md:w-auto"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <button
            type="submit"
            className="btn bg-stone-300 shadow-xl border-none text-base"
          >
            Login
          </button>
        </div>
      </div>
    </form>
  );
}

import { FormEvent, useState } from "react";

export default function Login(): React.ReactNode {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function handleSubmit(event: FormEvent<HTMLDivElement>) {
    console.log(username);
    console.log(password);
  }

  return (
    <div className="flex gap-2">
      <div className="form" onSubmit={handleSubmit}>
        <div className="inputBox">
          <input
            type="email"
            placeholder="Username"
            className="input input-bordered md:w-auto"
          />
        </div>
        <div className="inputBox">
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered md:w-auto"
            pattern=""
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
    </div>
  );
}

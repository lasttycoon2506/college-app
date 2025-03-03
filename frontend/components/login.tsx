export default function Login(): React.ReactNode {
  return (
    <div>
      <div className="form-control">
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered md:w-auto"
        />
      </div>
      <div className="form-control">
        <input
          type="password"
          placeholder="Password"
          className="input input-bordered md:w-auto"
        />
      </div>
      <div>
        <button className="btn bg-stone-300 shadow-xl border-none text-base">
          Login
        </button>
      </div>
    </div>
  );
}

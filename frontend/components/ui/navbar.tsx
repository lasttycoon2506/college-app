import Image from "next/image";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 bg-info">
      <Image
        className="dark:invert mr-6 rounded-lg shadow-xl"
        src="college.svg"
        alt="clg campus"
        width={50}
        height={50}
      />
      <div className="flex-1">
        <a className="btn btn-ghost text-xl">EZ Apply</a>
      </div>
      <div className="flex gap-2">
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
          <button className="btn bg-success shadow-xl border-none text-base">
            Login
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">username</div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

"use client";
import Image from "next/image";
import Link from "next/link";
import Login from "../Login";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar(): React.ReactNode {
  const { user, logout } = useContext(AuthContext);
  const { replace } = useRouter();

  function handleProfile() {
    replace("/api/profile");
  }

  function handleLogout() {
    logout();
  }
  return (
    <div className="navbar bg-base-100 bg-primary">
      <Image
        className="dark:invert mr-6 rounded-lg shadow-xl"
        src="/college.svg"
        alt="clg campus"
        width={50}
        height={50}
        priority={true}
      />
      <div className="flex-1">
        <Link href="/">
          <button className="btn btn-ghost text-2xl font-bold">EZ Apply</button>
        </Link>
      </div>
      {!user && <Login />}
      {user && (
        <div>
          <a className="text-gray-50 font-bold">{user.email}</a>
          <div className="dropdown dropdown-end pl-2">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img src="/profile.svg" />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <button onClickCapture={handleProfile}>Profile</button>
              </li>
              <Link href="/">
                <li>
                  <button
                    className="text-red-500"
                    onClickCapture={handleLogout}
                  >
                    Logout
                  </button>
                </li>
              </Link>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

type UserData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export default function POST(): React.ReactNode {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const router: AppRouterInstance = useRouter();
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [isNotValidForm, setIsNotValidForm] = useState<boolean>(true);

  useEffect(() => {
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.password ||
      emailError ||
      passwordError
    ) {
      setIsNotValidForm(true);
    } else {
      setIsNotValidForm(false);
    }
  }, [userData]);

  async function register(): Promise<void> {
    const { firstName, lastName, email, password } = userData;
    try {
      const res: Response = await fetch("http://localhost:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email,
          password,
        }),
      });
      if (!res.ok) {
        const result = await res.json();
        toast.error(result.error.message);
      } else {
        toast.success("Successfully Registered!");
        router.push("/");
      }
    } catch (error: unknown) {
      if (error instanceof Error) toast.error(error.message);
      else toast.error("unknown error occured while registering");
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value }: { name: string; value: string } = e.target;

    if (name === "firstName") {
      if (value) {
        setFirstNameError(false);
      } else {
        setFirstNameError(true);
      }
    }
    if (name === "lastName") {
      if (value) {
        setLastNameError(false);
      } else {
        setLastNameError(true);
      }
    }
    if (name === "email") {
      if (value) {
        setEmailError(false);
      } else {
        setEmailError(true);
      }
    }
    if (name === "password") {
      if (/^.{8,30}$/.test(value)) {
        setPasswordError(false);
      } else {
        setPasswordError(true);
      }
    }
    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();
    userData.firstName &&
      userData.lastName &&
      userData.email &&
      userData.password;
    register();
  }

  return (
    <div className="bg-blue-50">
      <div className="container m-auto py-20 ">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <form className="w-full px-20" onSubmit={handleSubmit}>
            <div className="flex flex-wrap mx-3 mt-5 mb-6">
              <div className="w-full md:w-1/2 px-5 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  First Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                  type="text"
                  placeholder="Jane"
                  name="firstName"
                  value={userData.firstName}
                  onChange={handleChange}
                  required
                />
                {firstNameError && (
                  <p className="text-red-500 text-xs italic">Missing!</p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-5">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Last Name
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="text"
                  placeholder="Doe"
                  name="lastName"
                  value={userData.lastName}
                  onChange={handleChange}
                  required
                />
                {lastNameError && (
                  <p className="text-red-500 text-xs italic">Missing!</p>
                )}
              </div>
            </div>
            <div className="flex flex-wrap mx-3 mb-6">
              <div className="w-full md:w-1/2 px-5 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Email
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="email"
                  placeholder="jane@gmail.com"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                  required
                />
                {emailError && (
                  <p className="text-red-500 text-xs italic">Missing!</p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-5 mb-6 md:mb-0">
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                  Password
                </label>
                <input
                  className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  type="password"
                  placeholder="******************"
                  name="password"
                  value={userData.password}
                  onChange={handleChange}
                  required
                />
                {passwordError && (
                  <p className="text-red-500 text-xs italic">
                    Must be at least 8 Characters!
                  </p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center pt-10">
              <button
                disabled={isNotValidForm}
                className="btn btn-wide bg-success enabled:hover:border-gray-400 enabled:opacity-100 disabled:opacity-50 shadow-md shadow-cyan-500/50 border-none text-base"
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

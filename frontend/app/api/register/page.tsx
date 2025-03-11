"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
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
  const router = useRouter();
  const [firstNameError, setFirstNameError] = useState<boolean>(false);
  const [lastNameError, setLastNameError] = useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  async function Register(): Promise<void> {
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
        const error = await res.json();
        if (error.error["password"])
          toast.error("Password must be at least 8 characters!");
        else if (error.error["email"]) toast.error("Enter Valid Email!");
        else toast.error(error.error);
      } else {
        toast.success("Successfully Registered!");
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const { name, value } = e.target;

    if (name === "firstName" && value) {
      setFirstNameError(false);
    }
    if (name === "lastName" && value) {
      setLastNameError(false);
    }
    if (name === "email" && value) {
      setEmailError(false);
    }
    if (name === "password" && value) {
      setPasswordError(false);
    }

    setUserData({
      ...userData,
      [name]: value,
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>): void {
    e.preventDefault();

    if (!userData.firstName) {
      setFirstNameError(true);
    }
    if (!userData.lastName) {
      setLastNameError(true);
    }
    if (!userData.email) {
      setEmailError(true);
    }
    if (!userData.password) {
      setPasswordError(true);
    }
    if (
      userData.firstName &&
      userData.lastName &&
      userData.email &&
      userData.password
    )
      Register();
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
                />
                {passwordError && (
                  <p className="text-red-500 text-xs italic">Missing!</p>
                )}
                <p className="text-gray-600 text-xs italic">
                  Must be at least 8 characters long!
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center pt-10">
              <button className="btn btn-wide bg-info shadow-md shadow-cyan-500/50 border-none text-base">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

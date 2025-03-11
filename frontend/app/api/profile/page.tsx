"use client";
import UserApplicationCard from "@/components/UserApplicationCard";
import AuthContext from "@/context/AuthContext";
import { UserApplication } from "@/models/userApplication";
import { useContext, useEffect, useState } from "react";

export default function GET(): React.ReactNode {
  const [userApplications, setUserApplications] = useState<UserApplication[]>(
    []
  );
  const { user } = useContext(AuthContext);
  const [firstName, setFirstName] = useState<string>(user!.firstName);
  const [lastName, setLastName] = useState<string>(user!.lastName);
  const [email, setEmail] = useState<string>(user!.email);
  const [password, setPassword] = useState<string>("********");
  const [sat, setSat] = useState<string | null>(user?.sat ?? "");
  const [gpa, setGpa] = useState<string | null>(user?.gpa ?? "");
  const [essay, setEssay] = useState<string | null>(user?.essay ?? "");
  const [isNotDirty, setIsNotDirty] = useState<boolean>(true);
  const [satError, setSatError] = useState<boolean>(false);
  const [gpaError, setGpaError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  async function getUserApplications(): Promise<void> {
    try {
      const res: Response = await fetch("/api/userApplications");
      const resAsJson = await res.json();
      const userApps: UserApplication[] = resAsJson.body.userApplications;
      setUserApplications(userApps);
    } catch (error) {
      console.log(error);
    }
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    let { name, value } = e.target;

    if (name === "firstName" && value) {
      setFirstName(value);
    }
    if (name === "lastName" && value) {
      setLastName(value);
    }
    if (name === "email" && value) {
      setEmail(value);
    }
    if (name === "password" && value) {
      if (/^.{8}$/.test(value)) {
        setPassword(value);
        setPasswordError(false);
      } else {
        setPassword(e.target.value);
        setPasswordError(true);
      }
      setPassword(value);
    }
    if (name === "sat" && value) {
      if (/^\d{3,4}$/.test(value)) {
        setSat(value);
        setSatError(false);
      } else {
        setSat(e.target.value);
        setSatError(true);
      }
    }
    if (name === "gpa" && value) {
      if (/^\d.\d{2}$/.test(value)) {
        setGpa(value);
        setGpaError(false);
      } else {
        setGpa(e.target.value);
        setGpaError(true);
      }
    }
    if (name === "essay" && value) setEssay(value);
  }

  function resetPw() {
    setPassword("");
  }

  useEffect(() => {
    getUserApplications();
    if (
      firstName !== user!.firstName ||
      lastName !== user!.lastName ||
      email !== user!.email ||
      password !== "********" ||
      sat?.toString() !== user!.sat.toString() ||
      gpa?.toString() !== user!.gpa.toString() ||
      essay?.toString() !== user!.essay.toString()
    ) {
      setIsNotDirty(false);
    } else setIsNotDirty(true);
  }, [firstName, lastName, email, password, sat, gpa, essay]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
  }

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4 ml-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              {user && (
                <div>
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold">First Name:</span>
                      <div className="tooltip" data-tip="click to edit">
                        <div className="text-red-500">
                          <input
                            type="text"
                            value={firstName}
                            name="firstName"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold">Last Name:</span>
                      <div className="tooltip" data-tip="click to edit">
                        <div className="text-red-500">
                          <input
                            type="text"
                            value={lastName}
                            name="lastName"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold"> Username:</span>
                      <div className="tooltip" data-tip="click to edit">
                        <div className="text-red-500">
                          <input
                            type="text"
                            value={email}
                            name="email"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold"> Password:</span>
                      <div className="tooltip" data-tip="click to edit">
                        <div className="text-red-500">
                          <input
                            type="text"
                            value={password}
                            name="password"
                            onChange={handleChange}
                            onClickCapture={resetPw}
                          />
                          {passwordError && (
                            <p className="text-red-500 text-xs italic">
                              Must be at least 8 Characters long!
                            </p>
                          )}
                        </div>
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold">SAT:</span>
                      <div className="tooltip" data-tip="click to edit">
                        <div className="text-red-500">
                          <input
                            type="number"
                            value={sat ?? ""}
                            name="sat"
                            onChange={handleChange}
                          />
                          {satError && (
                            <p className="text-red-500 text-xs italic">
                              Valid SAT's Only!
                            </p>
                          )}
                        </div>
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold">GPA:</span>
                      <div className="tooltip" data-tip="click to edit">
                        <div className="text-red-500">
                          <input
                            type="number"
                            value={gpa ?? ""}
                            name="gpa"
                            onChange={handleChange}
                          />
                          {gpaError && (
                            <p className="text-red-500 text-xs italic">
                              Valid GPAs Only! (ex 3.54)
                            </p>
                          )}
                        </div>
                      </div>
                    </h2>
                    <h2 className="text-xl mb-10">
                      <span className="font-bold">Essay:</span>
                      {!essay ? (
                        <button
                          className="btn bg-info enabled:hover:border-gray-400 enabled:opacity-100 disabled:opacity-50 shadow-md shadow-cyan-500/50 border-none text-base ml-4"
                          onClickCapture={() =>
                            (
                              document.getElementById(
                                "essay"
                              ) as HTMLDialogElement
                            )?.showModal()
                          }
                        >
                          Add
                        </button>
                      ) : (
                        <button
                          className="btn bg-info enabled:hover:border-gray-400 enabled:opacity-100 disabled:opacity-50 shadow-md shadow-cyan-500/50 border-none text-base ml-4"
                          onClickCapture={() =>
                            (
                              document.getElementById(
                                "essay"
                              ) as HTMLDialogElement
                            )?.showModal()
                          }
                        >
                          View
                        </button>
                      )}
                    </h2>
                  </form>
                  <dialog id="essay" className="modal">
                    <div className="modal-box">
                      <textarea
                        className="textarea w-full max-w-full h-96"
                        placeholder="Your Essay..."
                        value={essay ?? ""}
                        onChange={handleChange}
                        name="essay"
                      />
                      <div className="modal-action">
                        <div>
                          <button
                            className="btn"
                            onClickCapture={() =>
                              (
                                document.getElementById(
                                  "essay"
                                ) as HTMLDialogElement
                              )?.close()
                            }
                          >
                            Save
                          </button>
                        </div>
                      </div>
                    </div>
                  </dialog>
                  <button
                    disabled={isNotDirty}
                    className="btn btn-wide bg-success enabled:hover:border-gray-400 enabled:opacity-100 disabled:opacity-50 shadow-md shadow-cyan-500/50 border-none text-base"
                  >
                    Save
                  </button>
                </div>
              )}
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Applications</h2>
              <ul>
                {userApplications.map(
                  (userApplication: UserApplication, index) => (
                    <div key={index}>
                      <UserApplicationCard
                        key={userApplication.id}
                        userApplication={userApplication}
                      />
                    </div>
                  )
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

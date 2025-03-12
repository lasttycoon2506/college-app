"use client";
import UserApplicationCard from "@/components/UserApplicationCard";
import AuthContext from "@/context/AuthContext";
import { UserApplication } from "@/models/userApplication";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { EditUser } from "@/models/editUser";

export default function GET(): React.ReactNode {
  const [userApplications, setUserApplications] = useState<UserApplication[]>(
    []
  );
  const { user, getUser } = useContext(AuthContext);
  const [userData, setUserData] = useState<EditUser>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    username: user?.username || "",
    password: "********",
    sat: user?.sat || "",
    gpa: user?.gpa || "",
    essay: user?.essay || "",
  });
  const [isNotDirty, setIsNotDirty] = useState<boolean>(true);
  const [satError, setSatError] = useState<boolean>(false);
  const [gpaError, setGpaError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);

  useEffect(() => {
    getUserApplications();
    if (
      !userData.firstName ||
      !userData.lastName ||
      !userData.email ||
      !userData.sat ||
      !userData.gpa ||
      !userData.essay
    ) {
      setIsNotDirty(true);
    } else if (
      (userData.firstName !== user!.firstName ||
        userData.lastName !== user!.lastName ||
        userData.email !== user!.email ||
        userData.password !== "********" ||
        userData.sat?.toString() !== user!.sat.toString() ||
        userData.gpa?.toString() !== user!.gpa.toString() ||
        userData.essay?.toString() !== user!.essay.toString()) &&
      !passwordError &&
      !gpaError &&
      !satError
    ) {
      setIsNotDirty(false);
    } else setIsNotDirty(true);
  }, [
    userData.firstName,
    userData.lastName,
    userData.email,
    userData.password,
    userData.sat,
    userData.gpa,
    userData.essay,
  ]);

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

    if (name === "password") {
      if (/^.{8,30}$/.test(value)) {
        setPasswordError(false);
      } else {
        setPasswordError(true);
      }
    }
    if (name === "sat") {
      if (/^\d{3,4}$/.test(value)) {
        setSatError(false);
      } else {
        setSatError(true);
      }
    }
    if (name === "gpa") {
      if (/^\d.\d{2}$/.test(value)) {
        setGpaError(false);
      } else {
        setGpaError(true);
      }
    }
    setUserData({ ...userData, [name]: value });
  }

  function resetPw() {
    setUserData({ ...userData, password: "" });
  }

  async function EditUser(): Promise<void> {
    try {
      const res: Response = await fetch("/api/editUser", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
      if (!res.ok) {
        const error = await res.json();
        if (error.error["email"]) toast.error("Enter Valid Email!");
        else toast.error(error.error);
      } else {
        getUser();
        setIsNotDirty(true);
        toast.success("Successfully Edited!");
      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if ((event.nativeEvent as SubmitEvent).submitter?.id === "submitEditBtn") {
      EditUser();
    }
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
                            value={userData.firstName ?? ""}
                            name="firstName"
                            onChange={handleChange}
                            required
                          />
                          {!userData.firstName && (
                            <p className="text-red-500 text-xs italic">
                              Missing!
                            </p>
                          )}
                        </div>
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold">Last Name:</span>
                      <div className="tooltip" data-tip="click to edit">
                        <div className="text-red-500">
                          <input
                            type="text"
                            value={userData.lastName ?? ""}
                            name="lastName"
                            onChange={handleChange}
                            required
                          />
                          {!userData.lastName && (
                            <p className="text-red-500 text-xs italic">
                              Missing!
                            </p>
                          )}
                        </div>
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold"> Username:</span>
                      <div className="tooltip" data-tip="click to edit">
                        <div className="text-red-500">
                          <input
                            type="email"
                            value={userData.email ?? ""}
                            name="email"
                            onChange={handleChange}
                            required
                          />
                          {!userData.email && (
                            <p className="text-red-500 text-xs italic">
                              Missing!
                            </p>
                          )}
                        </div>
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold"> Password:</span>
                      <div className="tooltip" data-tip="click to edit">
                        <div className="text-red-500">
                          <input
                            type="text"
                            value={userData.password ?? ""}
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
                            value={userData.sat ?? ""}
                            name="sat"
                            placeholder="required"
                            onChange={handleChange}
                            required
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
                            value={userData.gpa ?? ""}
                            name="gpa"
                            placeholder="required"
                            onChange={handleChange}
                            required
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
                      {!userData.essay ? (
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
                          className="btn bg-info enabled:hover:border-gray-400 enabled:opacity-100 w-20 disabled:opacity-50 shadow-md shadow-cyan-500/50 border-none text-base ml-4"
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
                    <dialog id="essay" className="modal">
                      <div className="modal-box">
                        <textarea
                          className="textarea w-full max-w-full h-96"
                          placeholder="Your Essay..."
                          value={userData.essay ?? ""}
                          onChange={handleChange}
                          name="essay"
                          required
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
                      id="submitEditBtn"
                      disabled={isNotDirty}
                      className="btn btn-wide bg-success enabled:hover:border-gray-400 enabled:opacity-100 disabled:opacity-50 shadow-md shadow-cyan-500/50 border-none text-base"
                    >
                      Save
                    </button>
                  </form>
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

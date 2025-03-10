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
  const [sat, setSat] = useState(user?.sat);
  const [gpa, setGpa] = useState(user?.gpa);
  const [essay, setEssay] = useState(user?.essay);
  const [isNotDirty, setIsNotDirty] = useState(true);
  const [satError, setSatError] = useState(false);
  const [gpaError, setGpaError] = useState(false);
  const [essayError, setEssayError] = useState(false);

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

  function handleChange(e: any) {
    let { name, value } = e.target;

    if (name === "sat" && value) {
      if (/^\d*$/.test(value)) {
        setSat(value);
        setSatError(false);
      } else {
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

    if (name === "essay") setEssay(value);
  }

  useEffect(() => {
    getUserApplications();

    if (
      sat?.toString() !== user?.sat.toString() ||
      gpa?.toString() !== user?.gpa.toString() ||
      essay?.toString() !== user?.essay.toString()
    ) {
      setIsNotDirty(false);
    } else setIsNotDirty(true);
  }, [sat, gpa, essay, user?.sat, user?.gpa, user?.essay]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
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
                  <h2 className="text-xl mb-4 ">
                    <span className="font-bold">First Name:</span>
                    <div className="text-red-500">{user.firstName}</div>
                  </h2>
                  <h2 className="text-xl mb-4 ">
                    <span className="font-bold">Last Name:</span>
                    <div className="text-red-500">{user.lastName}</div>
                  </h2>
                  <h2 className="text-xl mb-4 ">
                    <span className="font-bold"> Username:</span>
                    <div className="text-red-500">{user.username}</div>
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold">SAT:</span>
                      <div className="text-red-500">
                        <input
                          type="number"
                          value={sat}
                          name="sat"
                          onChange={handleChange}
                        />
                        {satError && (
                          <p className="text-red-500 text-xs italic">
                            Integers only!
                          </p>
                        )}
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold">GPA:</span>
                      <div className="text-red-500">
                        <input
                          type="number"
                          value={gpa}
                          name="gpa"
                          onChange={handleChange}
                        />
                        {gpaError && (
                          <p className="text-red-500 text-xs italic">
                            Valid GPAs Only! (ex 3.54)
                          </p>
                        )}
                      </div>
                    </h2>
                    <h2 className="text-xl mb-4 ">
                      <span className="font-bold">Essay:</span>
                      <div className="text-red-500">
                        <input
                          type="text"
                          value={essay}
                          name="essay"
                          onChange={handleChange}
                        />
                      </div>
                    </h2>
                    <button
                      disabled={isNotDirty}
                      className="btn btn-wide bg-info enabled:hover:border-gray-400 enabled:opacity-100 disabled:opacity-50 shadow-md shadow-cyan-500/50 border-none text-base"
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

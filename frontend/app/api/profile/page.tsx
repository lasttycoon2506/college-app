"use client";
import UserApplicationCard from "@/components/UserApplicationCard";
import AuthContext from "@/context/AuthContext";
import { UserApplication } from "@/models/userApplication";
import { useContext, useEffect, useState } from "react";

export default function GET() {
  const [userApplications, setUserApplications] = useState<UserApplication[]>(
    []
  );
  const { user } = useContext(AuthContext);

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

  useEffect(() => {
    getUserApplications();
  }, []);

  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4 ml-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              {user && (
                <>
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
                  <h2 className="text-xl mb-4 ">
                    <span className="font-bold">SAT:</span>
                    <div className="text-red-500">{user.sat}</div>
                  </h2>
                  <h2 className="text-xl mb-4 ">
                    <span className="font-bold">GPA:</span>
                    <div className="text-red-500">{user.gpa}</div>
                  </h2>
                  <h2 className="text-xl mb-4 ">
                    <span className="font-bold">Essay:</span>
                    <div className="text-red-500">{user.essay}</div>
                  </h2>
                </>
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

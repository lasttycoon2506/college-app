"use client";
import AuthContext from "@/context/AuthContext";
import { useContext } from "react";

export default function Profile() {
  const { user } = useContext(AuthContext);
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              {user && (
                <>
                  <h2 className="text-2xl mb-4">
                    <span className="font-bold block">
                      First Name: {user.firstName}
                    </span>
                  </h2>
                  <h2 className="text-2xl mb-4">
                    <span className="font-bold block">
                      Last Name: {user.lastName}
                    </span>
                  </h2>
                  <h2 className="text-2xl mb-4">
                    <span className="font-bold block">
                      Username: {user.username}
                    </span>
                  </h2>
                  <h2 className="text-2xl">
                    <span className="font-bold block">SAT: {user.sat}</span>{" "}
                  </h2>
                  <h2 className="text-2xl">
                    <span className="font-bold block">GPA: {user.gpa}</span>{" "}
                  </h2>
                  <h2 className="text-2xl">
                    <span className="font-bold block">Essay: {user.essay}</span>{" "}
                  </h2>
                </>
              )}
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Your Listings</h2>

              {/* <ProfileProperties properties={properties} /> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

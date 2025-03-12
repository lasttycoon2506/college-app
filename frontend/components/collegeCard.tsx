"use client";
import Image from "next/image";
import type { College } from "@/models/college";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";

export default function CollegeCard({
  college,
}: {
  college: College;
}): React.ReactNode {
  const currentDate: string = new Date().toISOString().slice(0, 10);
  const { user } = useContext(AuthContext);

  return (
    <div className="card card-side bg-base-100 shadow-xl card-bordered border-neutral my-3">
      <figure>
        <Image
          className="dark:invert mr-6 rounded-lg"
          src={`/campus${college.id}.jpg`}
          alt="clg campus"
          width={300}
          height={400}
          priority={true}
        />
      </figure>
      <div className="card-body">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <h2 className="card-title mb-5 text-2xl">
              <strong>
                <em>{college.name}</em>
              </strong>
            </h2>
            <p>{college.address}</p>
            <p>${college.tuition.valueOf().toLocaleString()} / semester</p>
            <p>{college.type}</p>
            <p>{college.undergrad.valueOf().toLocaleString()} undergrads.</p>
            {currentDate >
            new Date(college.applicationDeadline).toISOString().slice(0, 10) ? (
              <p className="text-red-500 text-lg">
                <strong>
                  Deadline: {college.applicationDeadline.toString()}
                </strong>
              </p>
            ) : (
              <p>
                <strong>Deadline:</strong>{" "}
                {college.applicationDeadline.toString()}
              </p>
            )}
          </div>
          <div>
            <div className="grid grid-rows-2 gap-4">
              <div className="flex justify-center items-center">
                <Link href={`/api/college/${college.id}?picId=${college.id}`}>
                  <button className="btn btn-wide bg-info shadow-md shadow-cyan-500/50 border-none text-base">
                    Info
                  </button>
                </Link>
              </div>
              {currentDate >
              new Date(college.applicationDeadline)
                .toISOString()
                .slice(0, 10) ? (
                <div className="flex justify-center items-center">
                  <button className="btn btn-wide bg-error shadow-md border-none text-base opacity-50 cursor-not-allowed">
                    Deadline Passed
                  </button>
                </div>
              ) : user?.userApplications?.some(
                  (x) => x.college.id === college.id
                ) ? (
                <div className="flex justify-center items-center">
                  <button
                    disabled={true}
                    className="btn btn-wide bg-success shadow-md shadow-green-500/50 border-none text-base"
                  >
                    Already Applied!
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <button className="btn btn-wide bg-success shadow-md shadow-green-500/50 border-none text-base">
                    Apply
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

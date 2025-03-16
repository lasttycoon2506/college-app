"use client";
import type { College } from "@/models/college";
import Link from "next/link";
import { useContext } from "react";
import AuthContext from "@/context/AuthContext";
import { toast } from "react-toastify";
import { ApiResponse } from "@/models/api-response";
import { ApplyResponse } from "@/models/apply-response";

export default function CollegeCard({
  college,
}: {
  college: College;
}): React.ReactNode {
  const currentDate: string = new Date().toISOString().slice(0, 10);
  const { user, getUser } = useContext(AuthContext);

  async function applyToCollege(): Promise<void> {
    try {
      const res: Response = await fetch(`/api/apply`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: college.id,
        }),
      });
      const result: ApiResponse<ApplyResponse> = await res.json();
      if (result.error) {
        toast.error(result.error.message);
      } else {
        getUser();
        toast.success("Successfully Applied!");
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(error.message);
      }
      toast.error("unknown error occured while applying");
    }
  }

  function handleApply(): void {
    applyToCollege();
  }

  return (
    <div className="card card-side bg-base-100 shadow-xl card-bordered border-neutral my-3">
      <figure>
        <img
          className="dark:invert mr-6 rounded-2xl shadow-xl mx-3 my-3"
          src={`/campus${college.id}.jpg`}
          style={{ width: 300, height: 225 }}
        />
      </figure>
      <div className="card-body">
        <div className="grid grid-cols-2 gap-1">
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
                <Link href={`/api/college/${college.id}`}>
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
                    className="btn btn-wide shadow-md shadow-green-500/50 border-none text-regal-blue"
                  >
                    Already Applied!
                  </button>
                </div>
              ) : !user ? (
                <div className="flex justify-center items-center">
                  <button
                    disabled={true}
                    className="btn btn-wide bg-warning shadow-md shadow-green-500/50 border-none text-base"
                  >
                    Register To Apply!
                  </button>
                </div>
              ) : !user?.gpa || !user.sat || !user.essay ? (
                <div className="flex justify-center items-center">
                  <button
                    disabled={true}
                    className="btn btn-wide bg-warning shadow-md shadow-green-500/50 border-none text-base"
                  >
                    Missing Scores!
                  </button>
                </div>
              ) : (
                <div className="flex justify-center items-center">
                  <button
                    onClickCapture={handleApply}
                    className="btn btn-wide bg-success shadow-md shadow-green-500/50 border-none text-base"
                  >
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

import Image from "next/image";
import type { College } from "@/models/college";
import { getRandomInt } from "@/helpers/randomIntGen";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function College({ college }: { college: College }) {
  const [randomInt, setRandomInt] = useState(0);
  const currentDate = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    const randomInt = getRandomInt(5);
    setRandomInt(randomInt);
  }, []);

  return (
    <div className="card card-side bg-base-100 shadow-xl card-bordered border-neutral my-3">
      <figure>
        <Image
          className="dark:invert mr-6 rounded-lg"
          src={`/campus${randomInt}.jpg`}
          alt="clg campus"
          width={200}
          height={200}
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
            <p>${college.tuition} / semester</p>
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
                <Link href={`/api/colleges/${college.id}?picId=${randomInt}`}>
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
                    Apply
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

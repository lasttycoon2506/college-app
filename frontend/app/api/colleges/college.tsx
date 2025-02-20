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
        <div className="grid grid-flow-col grid-rows-2 gap-2">
          <div className="row-span-3 col-span 2 ...">
            <h2 className="card-title mb-1">
              <strong>
                <em>{college.name}</em>
              </strong>
            </h2>
            <p>{college.address}</p>
            <p>${college.tuition} / semester</p>
            {currentDate >
            new Date(college.applicationDeadline).toISOString().slice(0, 10) ? (
              <div className="bg-error rounded">
                <p>
                  <strong>
                    Deadline: {college.applicationDeadline.toString()}
                  </strong>
                </p>
              </div>
            ) : (
              <p>
                <strong>Deadline:</strong>{" "}
                {college.applicationDeadline.toString()}
              </p>
            )}
          </div>
          <div className="col-span-1 row-span-2 ...">
            <div className="grid grid-flow-col grid-rows-2 gap-4">
              <div className="flex justify-center items-center">
                <Link href={`/api/colleges/${college.id}?picId=${randomInt}`}>
                  <button className="btn btn-wide bg-neutral-400 shadow-xl shadow-neutral-400/50 border-none">
                    Info
                  </button>
                </Link>
              </div>
              <div className="flex justify-center items-center">
                <button className="btn btn-wide bg-cyan-500 shadow-xl shadow-cyan-500/50 border-none">
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

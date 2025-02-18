import Image from "next/image";
import type { College } from "@/models/college";
import { getRandomInt } from "@/helpers/randomIntGen";
import { useEffect, useState } from "react";

export default function College({ college }: { college: College }) {
  const [randomInt, setRandomInt] = useState(0);

  useEffect(() => {
    const randomInt = getRandomInt(5);
    setRandomInt(randomInt);
  }, []);

  return (
    <div className="card card-side bg-base-100 shadow-xl">
      <figure>
        <Image
          className="dark:invert mr-6"
          src={`/campus${randomInt}.jpg`}
          alt="clg campus"
          width={200}
          height={200}
        />
      </figure>
      <div className="card-body">
        <div className="grid grid-flow-col grid-rows-4 gap-2">
          <div className="row-span-3 col-span 2 ...">
            <h2 className="card-title">
              <strong>
                <em>{college.name}</em>
              </strong>
            </h2>
            <p>{college.address}</p>
            <p>${college.tuition} / semester</p>
            <p>Deadline: {college.applicationDeadline.toString()}</p>
          </div>
          <div className="col-span-1 row-span-3 ... flex justify-center items-center">
            <button className="btn btn-neutral">Info</button>
          </div>
          <div className="col-span-1 row-span-3 ... flex justify-center items-center">
            <button className="btn btn-primary">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

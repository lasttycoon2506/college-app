import Image from "next/image";
import type { College } from "@/models/college";
import { getRandomInt } from "@/app/helpers/randomIntGen";
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
        <h2 className="card-title">{college.name}</h2>
        <p>{college.address}</p>
        <p>{college.tuition}</p>
        <p>{college.applicationDeadline.toString()}</p>
        <div className="grid grid-cols-10 gap-1">
          <div className="...">
            <Image
              className="dark:invert mt-4 "
              src="/info.svg"
              alt="info icon"
              width={20}
              height={20}
            />
          </div>
          <div className="...">{college.established}</div>
          <div className="...">{college.type}</div>
          <div className="...">{college.academicStaff}</div>
          <div className="...">{college.undergrad}</div>
          <div className="...">{college.postgrad}</div>
          <div className="...">{college.endowment}</div>
          <div className="...">{college.division}</div>
          <div className="...">{college.campusSize}</div>
        </div>

        <div className="card-actions justify-end">
          <button className="btn btn-primary">Watch</button>
        </div>
      </div>
    </div>
  );
}

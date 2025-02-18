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
    <div className="max-w-sm w-full lg:max-w-full lg:flex">
      <div
        className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden"
        style={{
          backgroundImage: `url('/campus${randomInt}.jpg')`,
        }}
      ></div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <div className="text-gray-900 font-bold text-xl mb-2">
            {college.name}
          </div>
          <p className="text-gray-700 text-base">{college.address}</p>
        </div>
        <div className="flex items-center">
          <Image
            className="w-10 h-10 rounded-full mr-4"
            src="/college.svg"
            alt="Avatar of Jonathan Reinink"
            width={10}
            height={10}
          />
          <div className="text-sm">
            <p className="text-gray-900 leading-none">Jonathan Reinink</p>
            <p className="text-gray-600">Aug 18</p>
          </div>
        </div>
      </div>
    </div>
  );
}

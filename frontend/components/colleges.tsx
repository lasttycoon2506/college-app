"use client";
import type { College } from "@/models/college";
import { use } from "react";
import CollegeComponent from "./college";
import { getRandomInt } from "@/app/helpers/randomIntGen";

export default function Colleges({ colleges }: { colleges: Promise<College> }) {
  const allColleges = use(colleges);

  return (
    <ul>
      {allColleges.colleges.map((college) => (
        <CollegeComponent key={college.id} college={college} />
      ))}
    </ul>
  );
}

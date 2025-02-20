"use client";
import { use } from "react";
import CollegeComponent from "./collegeCard";
import { PaginatedColleges } from "@/models/paginatedColleges";

export default function Colleges({
  colleges,
}: {
  colleges: Promise<PaginatedColleges>;
}) {
  const allColleges = use(colleges);

  return (
    <ul>
      {allColleges.colleges.map((college) => (
        <CollegeComponent key={college.id} college={college} />
      ))}
    </ul>
  );
}

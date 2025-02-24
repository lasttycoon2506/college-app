"use client";
import { use } from "react";
import CollegeCard from "./CollegeCard";
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
        <CollegeCard key={college.id} college={college} />
      ))}
    </ul>
  );
}

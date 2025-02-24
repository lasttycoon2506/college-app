"use client";
import { use, useState } from "react";
import Filters from "./ui/Filters";
import { College } from "@/models/college";

export default function Colleges({
  colleges,
}: {
  colleges: Promise<College[]>;
}) {
  const [filteredColleges, setFilteredColleges] = useState(colleges);
  const allColleges = use(colleges);

  function applyFilter(filters) {
    const newFilteredColleges = filteredColleges.filter((college) => {
      let isValid = false;
      if (filters.category) {
        isValid = college.category === filters.category;
      }
      return isValid;
    });
    setFilteredColleges(newFilteredColleges);
  }

  return <Filters colleges={allColleges} onFilter={applyFilter} />;
}

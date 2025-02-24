"use client";
import { use, useState } from "react";
import Filters from "./ui/Filters";
import { PaginatedColleges } from "@/models/paginatedColleges";

export default function Colleges({
  colleges,
}: {
  colleges: Promise<PaginatedColleges>;
}) {
  const allColleges = use(colleges);

  const [filteredColleges, setFilteredColleges] = useState(
    allColleges.colleges
  );

  function applyFilter(filters: Record<string, string>) {
    const newFilteredColleges = filteredColleges.filter((college) => {
      let isValid = false;
      Object.keys(filters).forEach((key) => {
        if (
          college[key] ===
          Object.values(filters[key]).toString().replaceAll(",", "")
        ) {
          console.log("works");
        }

        // if (college[key] === Object.values)
      });
      //   console.log(Object.keys(filters));
      //   if (filters.category) {
      //     isValid = college.category === filters.category;
      //   }
      return isValid;
    });
    setFilteredColleges(newFilteredColleges);
  }

  return <Filters colleges={filteredColleges} onFilter={applyFilter} />;
}

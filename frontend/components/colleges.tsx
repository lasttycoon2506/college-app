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
      isValid = Object.keys(filters).some((key) => {
        if (
          college[key] ===
          Object.values(filters[key]).toString().replaceAll(",", "")
        ) {
          return true;
        } else return false;
      });
      return isValid;
    });
    console.log(newFilteredColleges);
    setFilteredColleges(newFilteredColleges);
  }

  return <Filters colleges={filteredColleges} onFilter={applyFilter} />;
}

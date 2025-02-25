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
    if (Object.keys(filters).length === 0) {
      setFilteredColleges(allColleges.colleges);
    } else {
      const newFilteredColleges = allColleges.colleges.filter((college) => {
        let isValid = false;
        isValid = Object.keys(filters).some((key) => {
          const filterValue = Object.values(filters[key])
            .toString()
            .replaceAll(",", "")
            .replaceAll("$", "");
          console.log(filterValue);
          if (college[key] === filterValue) {
            return true;
          } else if (
            filterValue.split("-")[0] <= college[key] &&
            college[key] <= filterValue.split("-")[1]
          ) {
            return true;
          } else if (filterValue.replace("+", "") < college[key]) {
            return true;
          } else return false;
        });
        return isValid;
      });
      setFilteredColleges(newFilteredColleges);
    }
  }

  return <Filters colleges={filteredColleges} onFilter={applyFilter} />;
}

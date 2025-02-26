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
  const currentDate: Date = new Date();
  const [currentPg, setCurrentPg] = useState(0);

  const [filteredColleges, setFilteredColleges] = useState(
    allColleges.colleges
  );

  function applyFilter(filters: Record<string, string>): void {
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
          if (college[key] === filterValue) {
            return true;
          } else if (
            filterValue.split("-")[0] <= college[key] &&
            college[key] <= filterValue.split("-")[1]
          ) {
            return true;
          } else if (
            filterValue.replace("+", "") < college[key] &&
            typeof college[key] === "number"
          ) {
            return true;
          } else if (filterValue === "Open") {
            if (currentDate < new Date(college[key])) {
              return true;
            }
            return false;
          } else if (filterValue === "Closed") {
            if (currentDate > new Date(college[key])) {
              return true;
            }
            return false;
          } else {
            return false;
          }
        });
        return isValid;
      });
      setFilteredColleges(newFilteredColleges);
    }
  }

  return <Filters colleges={filteredColleges} onFilter={applyFilter} />;
}

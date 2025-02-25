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
            .replaceAll(",", "");
          if (college[key] === filterValue) {
            return true;
          }
          //   else if (
          //     college[key] <=
          //     Object.values(filters[key]).toString().replaceAll(",", "")
          //   ) {
          //   }
          else return false;
        });
        return isValid;
      });
      setFilteredColleges(newFilteredColleges);
    }
  }

  return <Filters colleges={filteredColleges} onFilter={applyFilter} />;
}

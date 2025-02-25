"use client";

import { College } from "@/models/college";
import { useState } from "react";
import CollegeCard from "../CollegeCard";

type FiltersProps = {
  colleges: College[];
  onFilter: (filters: Record<string, string>) => void;
};

export default function Filters({ colleges, onFilter }: FiltersProps) {
  const [filters, setFilters] = useState({});
  const filterOptions = [
    "0-10000",
    "10000-20000",
    "20000+",
    "Public",
    "Private",
    "0-10000",
    "10000-25000",
    "25000+",
    "Open",
    "Closed",
  ];
  const filterNames = ["tuition", "type", "undergrad", "deadline"];

  function handleFilterChange(filterName: string, filterValue: string) {
    const newFilters = { ...filters, [filterName]: filterValue };
    setFilters(newFilters);
    onFilter(newFilters);
  }

  function isChecked(value: string): boolean {
    return Object.values(filters).includes(value);
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-start-1">
        <div className="form-control pt-5 ps-3">
          <div className="border-b border-blue-900 mr-3">
            <h1 className="text-center text-lg font-black pb-3">Filters:</h1>
          </div>
          <div className="border-b border-blue-900 py-3 mr-3 ...">
            <h4 className="font-semibold pb-2">
              <em>Tuition</em>
            </h4>
            {filterOptions.map((filterOption) => (
              <label className="label cursor-pointer py-0 justify-start">
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary checkbox-xs"
                  checked={isChecked(filterOption)}
                  value={filterOption}
                  onChange={(e) =>
                    handleFilterChange(e.target.checked, e.target.value)
                  }
                />
                <span className="label-text ps-1">$0 - $10,000 </span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div className="col-span-3 col-start-2 ...">
        <ul>
          {colleges.map((college) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </ul>
      </div>
    </div>
  );
}

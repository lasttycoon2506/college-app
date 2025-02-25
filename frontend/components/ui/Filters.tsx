"use client";

import { College } from "@/models/college";
import { ChangeEvent, useState } from "react";
import CollegeCard from "../CollegeCard";

type FiltersProps = {
  colleges: College[];
  onFilter: (filters: Record<string, string>) => void;
};

export default function Filters({ colleges, onFilter }: FiltersProps) {
  const [filters, setFilters] = useState({});
  const filterOptions: string[] = [
    "0-10000",
    "10000-20000",
    "20000+",
    "Public",
    "Private",
    "0-10001",
    "10001-25000",
    "25000+",
    "Open",
    "Closed",
  ];
  const count = 1;

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    const filterValue: string = event.target.value;
    const isChecked: boolean = event.target.checked;
    let filterCategory: string;

    if (filterOptions.slice(0, 3).includes(filterValue)) {
      filterCategory = "tuition";
    } else if (filterOptions.slice(3, 5).includes(filterValue)) {
      filterCategory = "type";
    } else if (filterOptions.slice(6, 9).includes(filterValue)) {
      filterCategory = "undergrad";
    } else {
      filterCategory = "deadline";
    }

    if (isChecked) {
      const newFilters = { ...filters, [filterCategory]: filterValue };
      setFilters(newFilters);
      onFilter(newFilters);
    } else {
    }
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
            {filterOptions.map((filterOption) => (
              <>
                {filterOption === "0-10000" ? (
                  <h4 className="font-semibold pb-2">
                    <em>Tuition</em>
                  </h4>
                ) : filterOption === "Public" ? (
                  <h4 className="font-semibold pb-2">
                    <em>Type</em>
                  </h4>
                ) : filterOption === "0-10001" ? (
                  <h4 className="font-semibold pb-2">
                    <em>Undergrad</em>
                  </h4>
                ) : filterOption === "Open" ? (
                  <h4 className="font-semibold pb-2">
                    <em>Deadline</em>
                  </h4>
                ) : (
                  <></>
                )}
                <label
                  className="label cursor-pointer py-0 justify-start"
                  key={filterOption}
                >
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary checkbox-xs"
                    checked={isChecked(filterOption)}
                    value={filterOption}
                    onChange={(e) => handleFilterChange(e)}
                  />
                  <span className="label-text ps-1">{filterOption}</span>
                </label>
              </>
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

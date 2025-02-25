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
    "0-10000",
    "10000-25000",
    "25000+",
    "Open",
    "Closed",
  ];
  const filterNames: string[] = ["tuition", "type", "undergrad", "deadline"];

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>) {
    const checkboxValue: string = event.target.value;
    const isChecked: boolean = event.target.checked;
    let filterCategory;

    if (filterOptions.slice(0, 3).includes(checkboxValue)) {
      filterCategory = "tuition";
    } else if (filterOptions.slice(3, 5).includes(checkboxValue)) {
      filterCategory = "type";
    } else if (filterOptions.slice(6, 9).includes(checkboxValue)) {
      filterCategory = "undergrad";
    } else {
      filterCategory = "deadline";
    }

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
                  onChange={(e) => handleFilterChange(e)}
                />
                <span className="label-text ps-1">{filterOption}</span>
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

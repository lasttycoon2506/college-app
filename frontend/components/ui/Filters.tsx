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

  function handleFilterChange(filterName: string, filterValue: string) {
    const newFilters = { ...filters, [filterName]: filterValue };
    setFilters(newFilters);
    onFilter(newFilters);
  }

  return (
    <div className="form-control pt-5 ps-3">
      <div className="border-b border-blue-900 mr-3">
        <h1 className="text-center text-lg font-black pb-3">Filters:</h1>
      </div>
      <div className="border-b border-blue-900 py-3 mr-3 ...">
        <h4 className="font-semibold pb-2">
          <em>Tuition</em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xs"
            id="box1"
            name="tuition"
            value="0-10000"
            onClick={(e) =>
              handleFilterChange(
                "tuition",
                (e.target as HTMLInputElement).value
              )
            }
          />
          <span className="label-text ps-1">$0 - $10,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-secondary checkbox-xs"
            id="box2"
            name="tuition"
            value="10000-20000"
            onClick={(e) =>
              handleFilterChange(
                "tuition",
                (e.target as HTMLInputElement).value
              )
            }
          />
          <span className="label-text ps-1">$10,000 - $20,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-accent checkbox-xs"
            id="box3"
            name="tuition"
            value="20000+"
            onClick={(e) =>
              handleFilterChange(
                "tuition",
                (e.target as HTMLInputElement).value
              )
            }
          />
          <span className="label-text ps-1">$20,000+ </span>
        </label>
      </div>
      <div className="border-b border-blue-900 py-3 mr-3 ...">
        <h4 className="font-semibold pb-2">
          <em>Type </em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-warning checkbox-xs"
            id="box4"
            name="type"
            value="public"
            onClick={(e) =>
              handleFilterChange("type", (e.target as HTMLInputElement).value)
            }
          />
          <span className="label-text ps-1">Public </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-info checkbox-xs"
            id="box5"
            name="type"
            value="private"
            onClick={(e) =>
              handleFilterChange("type", (e.target as HTMLInputElement).value)
            }
          />
          <span className="label-text ps-1">Private </span>
        </label>
      </div>
      <div className="border-b border-blue-900 py-3 mr-3 ...">
        <h4 className="font-semibold pb-2">
          <em>Undergrad</em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-error checkbox-xs"
            id="box6"
            name="undergrad"
            value="0-10000"
            onClick={(e) =>
              handleFilterChange(
                "undergrad",
                (e.target as HTMLInputElement).value
              )
            }
          />
          <span className="label-text ps-1">0 - 10,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-xs"
            id="box7"
            name="undergrad"
            value="10000-25000"
            onClick={(e) =>
              handleFilterChange(
                "undergrad",
                (e.target as HTMLInputElement).value
              )
            }
          />
          <span className="label-text ps-1">10,000 - 25,000 </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-secondary checkbox-xs"
            id="box8"
            name="undergrad"
            value="25000+"
            onClick={(e) =>
              handleFilterChange(
                "undergrad",
                (e.target as HTMLInputElement).value
              )
            }
          />
          <span className="label-text ps-1">25,000+ </span>
        </label>
      </div>
      <div className="border-b border-blue-900 py-3 mr-3 ...">
        <h4 className="font-semibold pb-2">
          <em>Deadline</em>
        </h4>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-accent checkbox-xs"
            id="box9"
            name="deadline"
            value="open"
            onClick={(e) =>
              handleFilterChange(
                "deadline",
                (e.target as HTMLInputElement).value
              )
            }
          />
          <span className="label-text ps-1">Open </span>
        </label>
        <label className="label cursor-pointer py-0 justify-start">
          <input
            type="checkbox"
            className="checkbox checkbox-error checkbox-xs"
            id="box10"
            name="deadline"
            value="closed"
            onClick={(e) =>
              handleFilterChange(
                "deadline",
                (e.target as HTMLInputElement).value
              )
            }
          />
          <span className="label-text ps-1">Closed </span>
        </label>
      </div>
      <ul>
        {colleges.map((college) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </ul>
    </div>
  );
}

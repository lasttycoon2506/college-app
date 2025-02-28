"use client";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { ChangeEvent, useState } from "react";

export default function Filters(): React.ReactNode {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const filterOptions: string[] = [
    "$0 - $10,000",
    "$10,000 - $20,000",
    "$20,000+",
    "Public",
    "Private",
    "0 - 10,000",
    "10,000 - 25,000",
    "25,000+",
    "Open",
    "Closed",
  ];
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const pathname: string = usePathname();
  const { replace } = useRouter();

  function handleFilterChange(event: ChangeEvent<HTMLInputElement>): void {
    const params: URLSearchParams = new URLSearchParams(searchParams);
    const filterValue: string = event.target.value;
    const isChecked: boolean = event.target.checked;
    let filterCategory: string;

    if (filterOptions.slice(0, 3).includes(filterValue)) {
      filterCategory = "tuition";
    } else if (filterOptions.slice(3, 5).includes(filterValue)) {
      filterCategory = "collegeType";
    } else if (filterOptions.slice(5, 8).includes(filterValue)) {
      filterCategory = "undergrad";
    } else {
      filterCategory = "applicationDeadline";
    }

    if (isChecked) {
      const newFilters = { ...filters, [filterCategory]: filterValue };
      setFilters(newFilters);
      params.set(filterCategory, filterValue);
      replace(`${pathname}?${params.toString()}`);
    } else {
      const newFilters = { ...filters };
      delete newFilters[filterCategory];
      setFilters(newFilters);
      params.delete(filterCategory);
      replace(`${pathname}?${params.toString()}`);
    }
  }

  function isChecked(value: string): boolean {
    return Object.values(filters).includes(value);
  }

  return (
    <div className="form-control ps-3">
      <div className="border-b border-blue-900 mr-3">
        <h1 className="text-center text-lg font-black pb-2">Filter</h1>
      </div>
      <div className="border-b border-blue-900 py-3 mr-3 ...">
        {filterOptions.map((filterOption, index) => (
          <div key={index}>
            {filterOption === "$0 - $10,000" ? (
              <h4 className="font-semibold">
                <em>Tuition</em>
              </h4>
            ) : filterOption === "Public" ? (
              <h4 className="font-semibold pt-3">
                <em>Type</em>
              </h4>
            ) : filterOption === "0 - 10,000" ? (
              <h4 className="font-semibold pt-3">
                <em>Undergrad Size</em>
              </h4>
            ) : filterOption === "Open" ? (
              <h4 className="font-semibold pt-3">
                <em>Deadline</em>
              </h4>
            ) : (
              <></>
            )}
            <label
              className="label cursor-pointer py-0 justify-start"
              key={index}
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
          </div>
        ))}
      </div>
    </div>
  );
}

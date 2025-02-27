"use client";

export default function Pagination({
  currentPg,
  pgSize,
  totalColleges,
}: {
  currentPg: number;
  pgSize: number;
  totalColleges: number;
}): React.ReactNode {
  return (
    <div className="join">
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="1"
        defaultChecked
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="2"
      />
    </div>
  );
}

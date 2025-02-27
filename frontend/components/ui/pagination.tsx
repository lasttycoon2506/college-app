"use client";

import Link from "next/link";

export default function Pagination({
  currentPg,
  pgSize,
  totalColleges,
}: {
  currentPg: number;
  pgSize: number;
  totalColleges: number;
}): React.ReactNode {
  const totalPgs = Math.ceil(totalColleges / pgSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {currentPg > 1 && (
        <Link
          className="mr-2 px-2 py-1 border border-gray-300 rounded"
          href={`/api/colleges?page=${currentPg - 1}`}
        >
          Previous
        </Link>
      )}

      <span className="mx-2">
        Page {currentPg} of {totalPgs}
      </span>

      {currentPg < totalPgs && (
        <Link
          className="ml-2 px-2 py-1 border border-gray-300 rounded"
          href={`/api/colleges?page=${currentPg + 1}`}
        >
          Next
        </Link>
      )}
    </section>
  );
}

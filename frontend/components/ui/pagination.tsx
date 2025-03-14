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
  const totalPgs: number = Math.ceil(totalColleges / pgSize);

  return (
    <section className="container mx-auto flex justify-center items-center my-8">
      {currentPg > 1 && (
        <Link href={`/api/colleges?page=${currentPg - 1}`}>
          <button className="btn w-40 bg-black shadow-lg border-none text-white mx-5">
            Previous
          </button>
        </Link>
      )}

      <span className="mx-2">
        Page {currentPg} of {totalPgs}
      </span>

      {currentPg < totalPgs && (
        <Link href={`/api/colleges?page=${currentPg + 1}`}>
          <button className="btn w-40 bg-black shadow-lg border-none text-white mx-5">
            Next
          </button>
        </Link>
      )}
    </section>
  );
}

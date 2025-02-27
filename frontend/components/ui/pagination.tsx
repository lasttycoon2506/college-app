"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Pagination(): React.ReactNode {
  const searchParams = useSearchParams();
  const currentPath = usePathname();
  const router = useRouter();
  const currentPg = 1;

  function createPageUrl(pg: number) {
    const params = new URLSearchParams(searchParams);
    params.set("page", pg.toString());
    router.push(`api/colleges/${currentPg.toString()}`);
  }

  useEffect(() => {
    createPageUrl(currentPg);
  }, []);

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
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="3"
      />
      <input
        className="join-item btn btn-square"
        type="radio"
        name="options"
        aria-label="4"
      />
    </div>
  );
}

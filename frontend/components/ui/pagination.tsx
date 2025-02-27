import { usePathname, useSearchParams } from "next/navigation";

export default function Pagination(): React.ReactNode {
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const currentPg = Number(searchParams.get("page")) || 1;

  function createPageUrl(pg: number): string {
    const params = new URLSearchParams(searchParams);
    params.set("page", pg.toString());
    return `${pathName}?${params.toString()}`;
  }

  function handleOnChange() {
    console.log();
  }
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
        onChange={handleOnChange}
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

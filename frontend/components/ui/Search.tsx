"use client";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";

export default function Search() {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const pathname: string = usePathname();
  const { replace } = useRouter();

  function handleInputChange(keyword?: string, location?: string): void {
    const params: URLSearchParams = new URLSearchParams(searchParams);
    keyword ? params.set("keyword", keyword) : params.delete("keyword");
    location ? params.set("location", location) : params.delete("location");
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="py-5 px-2">
      <div className="border-b border-blue-900">
        <h1 className="text-center text-lg font-black pb-2">Search</h1>
      </div>
      <input
        type="text"
        placeholder="Keyword"
        className="input input-bordered w-20 md:w-auto my-3 mx-5 focus:outline-red-500"
        onChange={(e) => handleInputChange(e.target.value, "")}
      />
      <input
        type="text"
        placeholder="Location"
        className="input input-bordered w-20 md:w-auto mb-2 mx-5 focus:outline-red-500"
        onChange={(e) => handleInputChange("", e.target.value)}
      />
    </div>
  );
}

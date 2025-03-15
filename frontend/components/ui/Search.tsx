"use client";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import {
  ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams,
} from "next/navigation";
import { useDebouncedCallback } from "use-debounce";

export default function Search(): React.ReactNode {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const pathname: string = usePathname();
  const { replace }: AppRouterInstance = useRouter();

  const handleSearch = useDebouncedCallback((keyword: string): void => {
    const params: URLSearchParams = new URLSearchParams(searchParams);
    keyword ? params.set("keyword", keyword) : params.delete("keyword");
    replace(`${pathname}?${params.toString()}`);
  }, 500);

  return (
    <div className="py-5 px-2">
      <div className="border-b border-blue-900">
        <h1 className="text-center text-lg font-black pb-2">Search</h1>
      </div>
      <input
        type="text"
        placeholder="Keyword"
        className="input input-bordered w-20 md:w-auto mt-3 mx-5 focus:outline-red-500"
        defaultValue={searchParams.get("keyword")?.toString()}
        onChange={(e) => handleSearch(e.target.value)}
      />
    </div>
  );
}

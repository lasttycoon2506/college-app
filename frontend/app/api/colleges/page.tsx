import CollegeCard from "@/components/college-card";
import Filters from "@/components/ui/filters";
import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import { College } from "@/models/college";
import { PaginatedColleges } from "@/models/paginated-colleges";
import { NextResponse } from "next/server";

async function getPaginatedColleges(
  pg: number,
  keyword: string,
  min_tuition: string,
  max_tuition: string,
  collegeType: string,
  min_undergrad: string,
  max_undergrad: string,
  deadline_open: string,
  deadline_closed: string
): Promise<PaginatedColleges | Error> {
  try {
    const res: Response = await fetch(
      `http://localhost:8000/api/colleges/?page=${pg}&name=${keyword}&min_tuition=${min_tuition}&max_tuition=${max_tuition}&type=${collegeType}&min_undergrad=${min_undergrad}&max_undergrad=${max_undergrad}&deadline_open=${deadline_open}&deadline_closed=${deadline_closed}`
    );

    return res.json();
  } catch (error: unknown) {
    if (error instanceof Error) console.error(error);
    else console.error("unknown error occurred");
    throw new Error("unknown error occurred");
  }
}

export default async function GET({
  searchParams,
}: {
  searchParams: {
    page: string;
    keyword: string;
    tuition: string;
    collegeType: string;
    undergrad: string;
    applicationDeadline: string;
  };
}): Promise<React.ReactNode | NextResponse> {
  const today: Date = new Date();
  const {
    page = "1",
    keyword = "",
    tuition,
    collegeType,
    undergrad,
    applicationDeadline,
  } = await searchParams;

  const pgSize: number = 5;
  let min_tuition: string = "";
  let max_tuition: string = "";
  let min_undergrad: string = "";
  let max_undergrad: string = "";
  let deadline_open: string = "";
  let deadline_closed: string = "";
  let paginatedColleges: PaginatedColleges;

  if (tuition) {
    [min_tuition, max_tuition] = tuition
      .replaceAll(",", "")
      .replaceAll("$", "")
      .split("-");
  }
  if (undergrad) {
    [min_undergrad, max_undergrad] = undergrad.replaceAll(",", "").split("-");
  }
  if (applicationDeadline) {
    applicationDeadline === "Open"
      ? (deadline_open = today.toLocaleDateString())
      : (deadline_closed = today.toLocaleDateString());
  }
  const result = await getPaginatedColleges(
    Number(page),
    keyword,
    min_tuition,
    max_tuition,
    collegeType,
    min_undergrad,
    max_undergrad,
    deadline_open,
    deadline_closed
  );
  if (result instanceof Error)
    return NextResponse.json({ error: result.message }, { status: 500 });
  else paginatedColleges = result;
  const totalColleges: number = paginatedColleges!.count;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-start-1 ...">
        <Search />
        <Filters />
      </div>
      <div className="col-span-3 col-start-2 ...">
        <ul>
          {paginatedColleges!.colleges.map((college: College) => (
            <CollegeCard key={college.id} college={college} />
          ))}
        </ul>
        {totalColleges > pgSize && (
          <Pagination
            currentPg={Number(page)}
            pgSize={pgSize}
            totalColleges={totalColleges}
          />
        )}
      </div>
    </div>
  );
}

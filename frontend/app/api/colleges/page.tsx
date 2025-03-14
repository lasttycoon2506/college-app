import CollegeCard from "@/components/college-card";
import Filters from "@/components/ui/filters";
import Pagination from "@/components/ui/pagination";
import Search from "@/components/ui/search";
import { ApiResponse } from "@/models/api-response";
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
): Promise<ApiResponse<PaginatedColleges>> {
  try {
    const res: Response = await fetch(
      `http://localhost:8000/api/colleges/?page=${pg}&name=${keyword}&min_tuition=${min_tuition}&max_tuition=${max_tuition}&type=${collegeType}&min_undergrad=${min_undergrad}&max_undergrad=${max_undergrad}&deadline_open=${deadline_open}&deadline_closed=${deadline_closed}`
    );
    const result = await res.json();
    if (!res.ok) return { error: { message: result, statusCode: res.status } };
    return { data: result, statusCode: res.status };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return { error: { message: error.message, statusCode: 500 } };
    }
    return { error: { message: "unknown error occurred", statusCode: 500 } };
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
  const res: ApiResponse<PaginatedColleges> = await getPaginatedColleges(
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
  if (res.error)
    return NextResponse.json({
      error: res.error.message,
      status: res.error.statusCode,
    });
  paginatedColleges = res.data;
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

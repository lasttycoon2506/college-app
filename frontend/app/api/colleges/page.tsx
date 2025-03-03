import CollegeCard from "@/components/CollegeCard";
import Filters from "@/components/ui/Filters";
import Pagination from "@/components/ui/Pagination";
import Search from "@/components/ui/Search";
import { PaginatedColleges } from "@/models/paginatedColleges";

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
): Promise<PaginatedColleges> {
  const res = await fetch(
    `http://localhost:8000/api/colleges/?page=${pg}&name=${keyword}&min_tuition=${min_tuition}&max_tuition=${max_tuition}&type=${collegeType}&min_undergrad=${min_undergrad}&max_undergrad=${max_undergrad}&deadline_open=${deadline_open}&deadline_closed=${deadline_closed}`
  );
  return res.json();
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
}): Promise<React.ReactNode> {
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
  const paginatedColleges: PaginatedColleges = await getPaginatedColleges(
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
  const totalColleges: number = paginatedColleges.count;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-start-1 ...">
        <Search />
        <Filters />
      </div>
      <div className="col-span-3 col-start-2 ...">
        <ul>
          {paginatedColleges.colleges.map((college: any) => (
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

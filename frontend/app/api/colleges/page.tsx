import CollegeCard from "@/components/CollegeCard";
import Filters from "@/components/ui/Filters";
import Pagination from "@/components/ui/Pagination";
import { PaginatedColleges } from "@/models/paginatedColleges";

async function getPaginatedColleges(
  pg: number,
  min_tuition: string,
  max_tuition: string,
  collegeType: string,
  min_undergrad: string,
  max_undergrad: string
): Promise<PaginatedColleges> {
  const res = await fetch(
    `http://localhost:8000/api/colleges/?page=${pg}&min_tuition=${min_tuition}&max_tuition=${max_tuition}&type=${collegeType}&min_undergrad=${min_undergrad}&max_undergrad=${max_undergrad}`
  );
  return res.json();
}

export default async function GetCollegesForPg({
  searchParams,
}: {
  searchParams: {
    page: string;
    tuition: string;
    collegeType: string;
    undergrad: string;
  };
}): Promise<React.ReactNode> {
  const { page = "1", tuition, collegeType, undergrad } = await searchParams;
  const pgSize: number = 5;
  let min_tuition = "";
  let max_tuition = "";
  let min_undergrad = "";
  let max_undergrad = "";
  if (tuition) {
    [min_tuition, max_tuition] = tuition
      .replaceAll(",", "")
      .replaceAll("$", "")
      .split("-");
  }
  if (undergrad) {
    [min_undergrad, max_undergrad] = undergrad.replaceAll(",", "").split("-");
  }
  const paginatedColleges: PaginatedColleges = await getPaginatedColleges(
    Number(page),
    min_tuition,
    max_tuition,
    collegeType,
    min_undergrad,
    max_undergrad
  );
  const totalColleges: number = paginatedColleges.count;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div className="col-start-1 ...">
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

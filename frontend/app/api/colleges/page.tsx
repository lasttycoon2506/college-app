import CollegeCard from "@/components/CollegeCard";
import Filters from "@/components/ui/Filters";
import Pagination from "@/components/ui/Pagination";
import { PaginatedColleges } from "@/models/paginatedColleges";

async function getPaginatedColleges(
  pg: number,
  collegeType: string
): Promise<PaginatedColleges> {
  const res = await fetch(
    `http://localhost:8000/api/colleges/?page=${pg}&type=${collegeType}`
  );
  return res.json();
}

export default async function GetCollegesForPg({
  searchParams,
}: {
  searchParams: { page: string; collegeType: string };
}): Promise<React.ReactNode> {
  const { page = "1", collegeType } = await searchParams;
  const paginatedColleges: PaginatedColleges = await getPaginatedColleges(
    Number(page),
    collegeType
  );
  const totalColleges: number = paginatedColleges.count;
  const pgSize: number = 5;

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

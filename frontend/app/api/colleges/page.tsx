import CollegeCard from "@/components/CollegeCard";
import { PaginatedColleges } from "@/models/paginatedColleges";

async function getPaginatedColleges(pg: number): Promise<PaginatedColleges> {
  const res = await fetch(`http://localhost:8000/api/colleges/?page=${pg}`);
  return res.json();
}

export default async function GetCollegesForPg({
  searchParams,
}: {
  searchParams: { page: string };
}): Promise<React.ReactNode> {
  const { page = "1" } = await searchParams;
  const paginatedColleges: PaginatedColleges = await getPaginatedColleges(
    Number(page)
  );
  const totalColleges: number = paginatedColleges.count;
  const pgSize: number = 5;

  return (
    <div>
      <ul>
        {paginatedColleges.colleges.map((college: any) => (
          <CollegeCard key={college.id} college={college} />
        ))}
      </ul>
      {totalColleges > pgSize && <div>chacha</div>}
    </div>
  );
}

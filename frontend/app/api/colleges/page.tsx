import CollegeCard from "@/components/CollegeCard";

async function getPg(pg: number) {
  const res = await fetch(`http://localhost:8000/api/colleges/?page=${pg}`);
  return res.json();
}

export default async function GetPgResults({
  params,
}: {
  params: { page: string };
}) {
  const { page } = await params;
  const clg = await getPg(Number(page));
  console.log(clg);

  return (
    <div>
      <CollegeCard college={clg} />
    </div>
  );
}

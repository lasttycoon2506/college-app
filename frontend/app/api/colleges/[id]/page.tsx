import Image from "next/image";

async function getCollegeDetails(id: number) {
  const res = await fetch(`http://localhost:8000/api/colleges/${id}`);
  return res.json();
}

export default async function CollegeDetails({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: any;
}) {
  const { id } = await params;
  const { picId } = await searchParams;
  const college = await getCollegeDetails(id);

  return (
    <div className="grid grid-flow-col grid-rows-3 gap-4">
      <div className="row-span-2 ...">
        <img
          src={`/campus${picId}.jpg`}
          className="max-w-sm rounded-lg shadow-2xl "
        />
      </div>
      <div className="row-span-3 col-span-1 ... ">
        <h1 className="text-5xl font-bold">{college.name}</h1>
        <p className="pt-6">{college.address}</p>
        <p className="py-2">{college.tuition}</p>
        <p className="py-2">{college.type}</p>
        <p className="py-2">{college.address}</p>
        <p className="py-2">{college.address}</p>
        <p className="py-2">{college.address}</p>
      </div>
      <div className="row-span-3 col-span-1 ... flex justify-center items-center">
        <button className="btn bg-cyan-500 shadow-lg shadow-cyan-500/50">
          Apply
        </button>
      </div>
    </div>
  );
}

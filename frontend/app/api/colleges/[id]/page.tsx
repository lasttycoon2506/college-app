import Image from "next/image";

async function getCollegeDetails(id: number) {
  const res = await fetch(`http://localhost:8000/api/colleges/${id}`);
  return res.json();
}

export default async function CollegeDetails({
  params,
}: {
  params: { id: number };
}) {
  const { id } = await params;
  const college = await getCollegeDetails(id);

  return (
    <div className="card card-side bg-base-100 shadow-xl card-bordered border-neutral">
      <figure>
        <Image
          className="dark:invert mr-6"
          src={`/campus.jpg`}
          alt="clg campus"
          width={200}
          height={200}
        />
      </figure>
      <div className="card-body">
        <div className="grid grid-flow-col grid-rows-4 gap-2">
          <div className="row-span-3 col-span 2 ...">
            <h2 className="card-title mb-1">
              <strong>
                <em>{college.name}</em>
              </strong>
            </h2>
            <p>{college.address}</p>
            <p>${college.tuition} / semester</p>
            <p>Deadline: {college.applicationDeadline.toString()}</p>
          </div>
          <div className="col-span-1 row-span-3 ... flex justify-center items-center"></div>
          <div className="col-span-1 row-span-3 ... flex justify-center items-center">
            <button className="btn btn-primary">Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

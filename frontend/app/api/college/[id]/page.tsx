import { College } from "@/models/college";

async function getCollegeDetails(id: number): Promise<College> {
  const res = await fetch(`http://localhost:8000/api/college/${id}`);
  return res.json();
}

export default async function CollegeDetailsPg({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { picId: number };
}): Promise<React.ReactNode> {
  const { id } = await params;
  const { picId } = await searchParams;
  const college: College = await getCollegeDetails(id);
  const currentDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="grid grid-cols-3 gap-5">
      <div>
        <img
          src={`/campus${picId}.jpg`}
          className="max-w-sm rounded-lg shadow-2xl mt-7 ms-7"
        />
      </div>
      <div className="bg-neutral-content rounded-lg mt-7">
        <div className="bg-primary-content rounded-lg py-5">
          <h1 className="text-5xl font-bold text-center">{college.name}</h1>
        </div>
        <p className="pt-2 text-center">{college.address}</p>
        <p className="py-2 text-center">
          <strong>$</strong>
          {college.tuition} / semester
        </p>
        <p className="py-2 text-center">{college.type}</p>
        <p className="py-2 text-center">
          <strong>Est:</strong> {college.established}
        </p>
        <p className="py-2 text-center">
          <strong>Endowment: $</strong>
          {college.endowment}
        </p>
        <p className="py-2 text-center">
          <strong>Academic Staff: </strong> {college.academicStaff}
        </p>
        <p className="py-2 text-center">
          <strong>Undergrad: </strong>
          {college.undergrad}
        </p>
        <p className="py-2 text-center">
          <strong>Postgrad: </strong>
          {college.postgrad}
        </p>
        <p className="py-2 text-center">
          <strong>Size: </strong>
          {college.campusSize} acres
        </p>
        <p className="py-2 text-center">
          <strong>Division:</strong> {college.division}
        </p>
      </div>
      <div>
        {currentDate >
        new Date(college.applicationDeadline).toISOString().slice(0, 10) ? (
          <div className="grid grid-rows-2 gap-4 mt-20">
            <div>
              <div className="card bg-error text-neutral-content w-96">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">App. Deadline</h2>
                  <p>
                    {new Date(college.applicationDeadline)
                      .toISOString()
                      .slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-rows-2 gap-4 mt-20">
            <div>
              <div className="card bg-info text-neutral-content w-96">
                <div className="card-body items-center text-center">
                  <h2 className="card-title">App. Deadline</h2>
                  <p>
                    {new Date(college.applicationDeadline)
                      .toISOString()
                      .slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="flex justify-center items-center m-10">
                <button className="btn btn-lg btn-wide bg-success shadow-xl shadow-green-500/50 border-none text-2xl">
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

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
  const currentDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="grid grid-cols-3 gap-5 mx-10 my-10">
      <div>
        <img
          src={`/campus${picId}.jpg`}
          className="max-w-sm rounded-lg shadow-2xl "
        />
      </div>
      <div className="bg-neutral-content rounded-lg mx-10">
        <div className="bg-primary-content rounded-lg">
          <h1 className="text-5xl font-bold text-center">{college.name}</h1>
        </div>
        <p className="pt-6 text-center">{college.address}</p>
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
        <div className="grid grid-rows-2 gap-4 mt-20">
          <div>
            {currentDate > college.applicationDeadline ? (
              <div>
                <div className="card bg-error text-neutral-content w-96">
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">App. Deadline</h2>
                    <p>{college.applicationDeadline}</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex justify-center items-center">
                <div className="card bg-success text-neutral-content w-96">
                  <div className="card-body items-center text-center">
                    <h2 className="card-title">
                      <strong>
                        <em>App. Deadline</em>
                      </strong>
                    </h2>
                    <p>{college.applicationDeadline}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex justify-center items-center mt-20">
            <button className="btn btn-lg btn-wide bg-cyan-500 shadow-xl shadow-cyan-500/50 border-none text-2xl">
              Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

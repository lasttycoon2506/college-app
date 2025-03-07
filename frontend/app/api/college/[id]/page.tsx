import { College } from "@/models/college";
import { NextResponse } from "next/server";

async function getCollegeDetails(id: number): Promise<College> {
  const res: Response = await fetch(`http://localhost:8000/api/college/${id}`);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
}

export default async function GET({
  params,
  searchParams,
}: {
  params: { id: number };
  searchParams: { picId: number };
}): Promise<React.ReactNode | NextResponse> {
  const { id } = await params;
  const { picId } = await searchParams;
  let college: College;
  try {
    college = await getCollegeDetails(id);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status }
    );
  }
  const currentDate = new Date().toISOString().slice(0, 10);

  return (
    <div className="bg-blue-50">
      <div className="container m-auto pt-5 pb-24">
        <div className="card card-side bg-base-100 shadow-lg">
          <div className="flex justify-center items-center">
            <img
              src={`/campus${picId}.jpg`}
              className="max-w-sm rounded-lg shadow-2xl mt-7 mx-7"
              style={{ height: 300 }}
            />
          </div>
          <div className="rounded-lg mt-7">
            <div className="rounded-lg py-5">
              <h1 className="text-5xl font-bold text-center">
                {college!.name}
              </h1>
            </div>
            <p className="pt-2 text-center">{college!.address}</p>
            <p className="py-2 text-center">
              <strong>$</strong>
              {college!.tuition} / semester
            </p>
            <p className="py-2 text-center">{college!.type}</p>
            <p className="py-2 text-center">
              <strong>Est:</strong> {college!.established}
            </p>
            <p className="py-2 text-center">
              <strong>Endowment: $</strong>
              {college!.endowment}
            </p>
            <p className="py-2 text-center">
              <strong>Academic Staff: </strong> {college!.academicStaff}
            </p>
            <p className="py-2 text-center">
              <strong>Undergrad: </strong>
              {college!.undergrad}
            </p>
            <p className="py-2 text-center">
              <strong>Postgrad: </strong>
              {college!.postgrad}
            </p>
            <p className="py-2 text-center">
              <strong>Size: </strong>
              {college!.campusSize} acres
            </p>
            <p className="py-2 text-center">
              <strong>Division:</strong> {college!.division}
            </p>
          </div>
          <div>
            {currentDate >
            new Date(college!.applicationDeadline)
              .toISOString()
              .slice(0, 10) ? (
              <div className="grid grid-rows-2 gap-4 mt-20">
                <div className="flex justify-center items-center">
                  <div className="card bg-error text-neutral-content w-60">
                    <div className="card-body text-center">
                      <h2 className="card-title justify-center">
                        App. Deadline
                      </h2>
                      <p>
                        {new Date(college!.applicationDeadline)
                          .toISOString()
                          .slice(0, 10)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-rows-2 gap-4 mt-20">
                <div className="flex justify-center items-center">
                  <div className="card bg-info text-neutral-content w-60">
                    <div className="card-body text-center">
                      <h2 className="card-title justify-center text-red-500">
                        App. Deadline
                      </h2>
                      <p>
                        {new Date(college!.applicationDeadline)
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
      </div>
    </div>
  );
}

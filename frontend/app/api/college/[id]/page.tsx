import { ApiResponse } from "@/models/api-response";
import { College } from "@/models/college";
import { NextResponse } from "next/server";

async function getCollegeDetails(id: number): Promise<ApiResponse<College>> {
  try {
    const res: Response = await fetch(
      `http://localhost:8000/api/college/${id}`
    );
    const result = await res.json();
    if (!res.ok) {
      return { error: { message: result, statusCode: res.status } };
    }
    return { data: result, statusCode: res.status };
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error);
      return {
        error: { message: error.message, statusCode: 500 },
      };
    }
    return {
      error: { message: "unknown error occurred", statusCode: 500 },
    };
  }
}

export default async function GET({
  params,
}: {
  params: { id: number };
}): Promise<React.ReactNode | NextResponse> {
  const { id } = await params;
  let college: College;
  const currentDate: string = new Date().toISOString().slice(0, 10);

  const res: ApiResponse<College> = await getCollegeDetails(id);
  if (res) {
    if (res.error)
      return NextResponse.json({
        error: res.error,
        status: res.error.statusCode,
      });
    else {
      if (res.data) {
        college = res.data;
      }
    }
  }

  return (
    <div className="bg-blue-50">
      <div className="container m-auto pt-5 pb-24">
        <div className="card card-side bg-base-100 shadow-2xl">
          <div className="flex justify-center items-center">
            <img
              src={`/campus${id}.jpg`}
              className="max-w-sm rounded-2xl shadow-2xl mt-7 mx-7"
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
          {currentDate >
          new Date(college!.applicationDeadline).toISOString().slice(0, 10) ? (
            <div className="flex justify-center items-center ps-10 ">
              <div className="card bg-error text-neutral-content w-60">
                <div className="card-body text-center">
                  <h2 className="card-title justify-center">App. Deadline</h2>
                  <p>
                    {new Date(college!.applicationDeadline)
                      .toISOString()
                      .slice(0, 10)}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex justify-center items-center ps-10">
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
          )}
        </div>
      </div>
    </div>
  );
}

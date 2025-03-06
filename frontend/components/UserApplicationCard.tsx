import { UserApplication } from "@/models/userApplication";

export default function UserApplicationCard({
  userApplication,
}: {
  userApplication: UserApplication;
}) {
  return (
    <div className="card w-96 bg-base-100 card-xs shadow-sm">
      <div className="card-body">
        <h2 className="card-title">{userApplication.college.name}</h2>
        <p>{userApplication.dateApplied}</p>
        {/* <div className="justify-end card-actions">
          <button className="btn btn-primary">Buy Now</button>
        </div> */}
      </div>
    </div>
  );
}

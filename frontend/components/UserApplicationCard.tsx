import { UserApplication } from "@/models/userApplication";

export default function UserApplicationCard({
  userApplication,
}: {
  userApplication: UserApplication;
}) {
  return (
    <div className="card bg-accent shadow-xl my-2 mr-8">
      <div className="card-body">
        <h2 className="card-title">{userApplication.college.name}</h2>
        <p>Applied: {userApplication.dateApplied}</p>
      </div>
    </div>
  );
}

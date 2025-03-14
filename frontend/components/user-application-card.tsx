import { UserApplication } from "@/models/user-application";

export default function UserApplicationCard({
  userApplication,
}: {
  userApplication: UserApplication;
}) {
  return (
    <div className="card card-side bg-accent shadow-xl my-2 mr-8">
      <div className="card-body">
        <h2 className="card-title">{userApplication.college.name}</h2>
        <p>Applied: {userApplication.dateApplied}</p>
      </div>
      <figure className="flex items-center justify-center pr-5">
        <img
          src={`/campus${userApplication.college.id}.jpg`}
          className=" rounded-xl shadow-2xl"
          style={{ width: 90, height: 90 }}
        />
      </figure>
    </div>
  );
}

import { College } from "@/models/college";

export default async function getColleges() {
  const data = await fetch("http://localhost:8000/api/colleges/");
  const colleges = await data.json();

  return (
    <ul>
      {colleges.map((college: College) => (
        <li key={college.id}>{college.title}</li>
      ))}
    </ul>
  );
}

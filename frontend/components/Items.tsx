import { College } from "@/models/college";
import CollegeCard from "./CollegeCard";

export default function Items({ currentItems }: { currentItems: College[] }) {
  return (
    <ul>
      {currentItems.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </ul>
  );
}

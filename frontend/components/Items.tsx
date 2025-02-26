import { College } from "@/models/college";
import CollegeCard from "./CollegeCard";

export default function Items({
  currentItems,
}: {
  currentItems: College[];
}): React.ReactNode {
  return (
    <ul>
      {currentItems.map((college) => (
        <CollegeCard key={college.id} college={college} />
      ))}
    </ul>
  );
}

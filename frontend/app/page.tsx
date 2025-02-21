import AllColleges from "@/components/CollegesResolved";
import Filters from "@/components/ui/Filters";
import Search from "@/components/ui/Search";

export default function HomePage() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-start-1">{Filters()}</div>
        <div className="col-span-3 col-start-2 ...">
          <AllColleges />
        </div>
      </div>
    </>
  );
}

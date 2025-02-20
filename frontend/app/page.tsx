import AllColleges from "@/app/api/colleges/collegesResolved";
import filters from "@/components/ui/filters";

export default function HomePage() {
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
        <div className="col-start-1">{filters()}</div>
        <div className="col-span-3 col-start-2 ...">
          <AllColleges />
        </div>
      </div>
    </>
  );
}

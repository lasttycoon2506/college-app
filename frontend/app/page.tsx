import AllColleges from "@/components/collegesResolved";
import filters from "@/components/filters";

export default function Home() {
  return (
    <>
      <div className="grid grid-flow-col grid-rows-3 gap-4">
        <div className="row-span-3 ...">{filters()}</div>
        <div className="col-span-2 row-span-3 ...">
          <AllColleges />
        </div>
      </div>
    </>
  );
}

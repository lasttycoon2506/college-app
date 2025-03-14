import CollegesListBtn from "@/components/colleges-list-btn";
import RegisterBtn from "@/components/register-btn";

export default function HomePage(): React.ReactNode {
  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="col-start-2 ...">
        <div className="flex justify-center items-center py-10">
          <RegisterBtn />
        </div>
        <div className="flex justify-center items-center py-10">
          <CollegesListBtn />
        </div>
      </div>
    </div>
  );
}

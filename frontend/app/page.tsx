import CollegesListBtn from "@/components/CollegesListBtn";
import RegisterBtn from "@/components/RegisterBtn";

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

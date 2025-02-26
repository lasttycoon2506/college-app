import { Suspense } from "react";
import getColleges from "../db/getColleges";
import Colleges from "./Colleges";

export default function AllColleges(): React.ReactNode {
  const colleges = getColleges();

  function handlePgNumber(pgNumber: number): void {}

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Colleges colleges={colleges} />
    </Suspense>
  );
}

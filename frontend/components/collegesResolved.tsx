import { Suspense } from "react";
import getColleges from "../db/getColleges";
import Colleges from "./Colleges";

export default function AllColleges() {
  const colleges = getColleges();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Colleges colleges={colleges} />
    </Suspense>
  );
}

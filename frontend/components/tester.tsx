import { Suspense } from "react";
import getColleges from "./getColleges";
import Colleges from "./colleges";

export default function AllColleges() {
  const colleges = getColleges();

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Colleges colleges={colleges} />
    </Suspense>
  );
}

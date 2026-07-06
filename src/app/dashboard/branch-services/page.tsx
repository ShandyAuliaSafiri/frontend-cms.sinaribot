import { Suspense } from "react";
import BranchServices from "./BranchServices";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BranchServices />
    </Suspense>
  );
}
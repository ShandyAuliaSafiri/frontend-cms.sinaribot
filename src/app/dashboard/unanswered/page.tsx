import { Suspense } from "react";
import UnansweredQuestion from "./UnansweredQuestion";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UnansweredQuestion />
    </Suspense>
  );
}
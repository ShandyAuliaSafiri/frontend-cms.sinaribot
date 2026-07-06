import { Suspense } from "react";
import Services from "./Services";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Services />
    </Suspense>
  );
}
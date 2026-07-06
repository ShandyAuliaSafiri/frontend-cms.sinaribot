import { Suspense } from "react";
import Branches from "./branches";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Branches />
    </Suspense>
  );
}
import { Suspense } from "react";
import Prices from "./prices";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Prices />
    </Suspense>
  );
}
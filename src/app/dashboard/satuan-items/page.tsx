import { Suspense } from "react";
import SatuanItem from "./SatuanItem";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SatuanItem />
    </Suspense>
  );
}
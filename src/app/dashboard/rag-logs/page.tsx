import { Suspense } from "react";
import RagLog from "./RagLog";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RagLog />
    </Suspense>
  );
}
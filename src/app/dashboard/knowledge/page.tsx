import { Suspense } from "react";
import KnowledgeBase from "./KnowledgeBase";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <KnowledgeBase />
    </Suspense>
  );
}
import { Suspense } from "react";
import NewsNews from "./NewsNews";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <NewsNews />
    </Suspense>
  );
}
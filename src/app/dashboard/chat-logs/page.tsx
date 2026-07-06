import { Suspense } from "react";
import ChatHistoryClient from "./ChatHistoryClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChatHistoryClient />
    </Suspense>
  );
}
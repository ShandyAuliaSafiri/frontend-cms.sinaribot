import { Suspense } from "react";
import UserCms from "./UserCms";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <UserCms />
    </Suspense>
  );
}
import { Suspense } from "react";

// Lazy import of the client component so it’s only executed on the client side.
import PatientHistoryClient from "./patient-history-client";

export default function PatientHistoryPage() {
  return (
    <Suspense fallback={<div className="p-6">Loading patient history...</div>}>
      <PatientHistoryClient />
    </Suspense>
  );
}

// NOTE: The full client-side logic was moved to `patient-history-client.jsx`.
// This file is now a Server Component which avoids the build-time error
// about `useSearchParams` needing a Suspense boundary.

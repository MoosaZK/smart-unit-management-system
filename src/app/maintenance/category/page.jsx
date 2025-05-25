"use client";

import CategoryData from "@/components/category-data";
import { Suspense } from "react";

export default function CategoryPage() {
  return (
    <Suspense fallback={<div className="p-4">Loading category data...</div>}>
      <CategoryData />
    </Suspense>
  );
}

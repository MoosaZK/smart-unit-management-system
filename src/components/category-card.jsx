"use client";

import React from "react";
import { useRouter } from "next/navigation";

export default function CategoryCard({ categories, source }) {
  const router = useRouter();

  const handleCategoryClick = (category) => {
    router.push(`/maintenance/category?category=${category}&source=${source}`);
  };

  return (
    <div className="mb-8 mx-auto">
      <h2 className="text-2xl font-bold mb-4">Category Breakdown</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {categories.map((category) => (
          <div
            key={category}
            className="border-2 border-blue-300 bg-blue-50 p-4 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow h-24 flex items-center justify-center cursor-pointer"
            onClick={() => handleCategoryClick(category)}
          >
            <p className="text-lg font-semibold">{category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

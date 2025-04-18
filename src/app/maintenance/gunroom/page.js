import React from "react";

export default function GunroomMaintenancePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Category Breakdown Section */}
      <div className="mb-8 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold mb-4">Category Breakdown</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {[
            "Electrical",
            "Building",
            "Sewerage",
            "Recreational",
            "Furniture",
            "Water",
            "IT",
            "Gas",
          ].map((category) => (
            <div
              key={category}
              className="border-2 border-gray-300 p-4 text-center rounded-lg shadow-sm hover:shadow-md transition-shadow h-24 flex items-center justify-center"
            >
              <p className="text-lg font-semibold">{category}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

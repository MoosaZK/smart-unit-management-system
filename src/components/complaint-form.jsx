"use client";

import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  complaintCategories,
  complaintSubcategories,
  priorityLevels,
} from "@/data/complaints";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

export function ComplaintForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    subcategory: "",
    priority: "medium",
    description: "",
    location: "",
    ...initialData,
  });

  const [subcategories, setSubcategories] = useState([]);
  const [errors, setErrors] = useState({});

  // Update subcategories when category changes
  useEffect(() => {
    if (formData.category) {
      setSubcategories(complaintSubcategories[formData.category] || []);
      // Reset subcategory if not valid for new category
      if (
        formData.subcategory &&
        !complaintSubcategories[formData.category]?.some(
          (sub) => sub.id === formData.subcategory
        )
      ) {
        setFormData((prev) => ({ ...prev, subcategory: "" }));
      }
    } else {
      setSubcategories([]);
      setFormData((prev) => ({ ...prev, subcategory: "" }));
    }
  }, [formData.category]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is updated
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.category) {
      newErrors.category = "Category is required";
    }

    if (
      formData.category &&
      subcategories.length > 0 &&
      !formData.subcategory
    ) {
      newErrors.subcategory = "Subcategory is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit a Complaint</CardTitle>
        <p className="text-sm text-muted-foreground">
          Fill out the form below to submit a new complaint
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            {/* Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>
              <input
                type="text"
                id="title"
                name="title"
                placeholder="Brief summary of your complaint"
                className={`w-full p-2 border rounded-md ${
                  errors.title ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.title}
                onChange={handleChange}
              />
              {errors.title && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.title}
                </p>
              )}
            </div>

            {/* Category and Subcategory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label
                  htmlFor="category"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category
                </label>
                <select
                  id="category"
                  name="category"
                  className={`w-full p-2 border rounded-md ${
                    errors.category ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select Category</option>
                  {complaintCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.category}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="subcategory"
                  className="block text-sm font-medium text-gray-700"
                >
                  Subcategory
                </label>
                <select
                  id="subcategory"
                  name="subcategory"
                  className={`w-full p-2 border rounded-md ${
                    errors.subcategory ? "border-red-500" : "border-gray-300"
                  }`}
                  value={formData.subcategory}
                  onChange={handleChange}
                  disabled={!formData.category || subcategories.length === 0}
                >
                  <option value="">Select Subcategory</option>
                  {subcategories.map((subcategory) => (
                    <option key={subcategory.id} value={subcategory.id}>
                      {subcategory.name}
                    </option>
                  ))}
                </select>
                {errors.subcategory && (
                  <p className="text-sm text-red-500 flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" /> {errors.subcategory}
                  </p>
                )}
              </div>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Priority
              </label>
              <div className="flex border rounded-md overflow-hidden">
                {priorityLevels.map((priority) => (
                  <label
                    key={priority.id}
                    className={`flex-1 text-center p-2 cursor-pointer ${
                      formData.priority === priority.id
                        ? priority.id === "low"
                          ? "bg-green-100 border-green-300 text-green-800"
                          : priority.id === "medium"
                          ? "bg-orange-100 border-orange-300 text-orange-800"
                          : "bg-red-100 border-red-300 text-red-800"
                        : "bg-gray-50 text-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={priority.id}
                      checked={formData.priority === priority.id}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    {priority.name}
                  </label>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700"
              >
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                placeholder="Detailed explanation of your complaint"
                className={`w-full p-2 border rounded-md ${
                  errors.description ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.description}
                onChange={handleChange}
              />
              {errors.description && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.description}
                </p>
              )}
              <p className="text-xs text-gray-500">
                Please include all relevant details that could help us resolve
                your complaint
              </p>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <label
                htmlFor="location"
                className="block text-sm font-medium text-gray-700"
              >
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                placeholder="Building and room number/name"
                className={`w-full p-2 border rounded-md ${
                  errors.location ? "border-red-500" : "border-gray-300"
                }`}
                value={formData.location}
                onChange={handleChange}
              />
              {errors.location && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" /> {errors.location}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => window.history.back()}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-blue-500 hover:bg-blue-600">
              Submit Complaint
            </Button>
          </div>

          <div className="bg-blue-50 p-4 rounded-md text-sm text-blue-700 flex items-start gap-2 mt-4">
            <AlertCircle className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <p>
              Once submitted, you'll be able to track the status of your
              complaint from your dashboard.
            </p>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}

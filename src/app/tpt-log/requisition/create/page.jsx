"use client";

import React from "react";
import { useForm, FormProvider } from "react-hook-form";
import {
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function CreateRequisitionPage() {
  const router = useRouter();

  // react-hook-form setup
  const formMethods = useForm({
    defaultValues: {
      unitName: "",
      location: "",
      requisitionDate: "",
      officerName: "",
      officerRank: "",
      officerPno: "",
      officerContact: "",
      remarks: "",
      approvedByName: "",
      approvedByRank: "",
      approvedDate: "",
      transportRows: [
        {
          dateRequired: "",
          time: "",
          vehicleType: "",
          vehiclesCount: "",
          duration: "",
          purpose: "",
          destination: "",
        },
      ],
    },
  });

  const {
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = formMethods;

  const transportRows = watch("transportRows");

  // add a new blank transport row
  const addRow = () => {
    setValue("transportRows", [
      ...transportRows,
      {
        dateRequired: "",
        time: "",
        vehicleType: "",
        vehiclesCount: "",
        duration: "",
        purpose: "",
        destination: "",
      },
    ]);
  };

  // remove row by index
  const removeRow = (idx) => {
    if (transportRows.length === 1) return; // keep at least one
    setValue(
      "transportRows",
      transportRows.filter((_, i) => i !== idx)
    );
  };

  const onSubmit = (data) => {
    // TODO: replace with API integration
    console.log("Requisition submitted", data);
    // For now redirect back to list
    router.push("/tpt-log");
  };

  return (
    <div className="container mx-auto max-w-4xl py-8 space-y-8">
      <h1 className="text-2xl md:text-3xl font-extrabold text-center">
        New Transport Requisition
      </h1>

      <FormProvider {...formMethods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* General details */}
          <section className="grid md:grid-cols-3 gap-4 border rounded-lg p-4">
            <FormItem>
              <FormLabel>Unit Name</FormLabel>
              <FormControl>
                <Input
                  {...formMethods.register("unitName", { required: true })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input
                  {...formMethods.register("location", { required: true })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>

            <FormItem>
              <FormLabel>Date</FormLabel>
              <FormControl>
                <Input
                  type="date"
                  {...formMethods.register("requisitionDate", {
                    required: true,
                  })}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          </section>

          {/* Requesting officer details */}
          <section className="space-y-4 border rounded-lg p-4">
            <h2 className="text-lg font-semibold">
              Requesting Officer Details
            </h2>
            <div className="grid md:grid-cols-2 gap-4">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...formMethods.register("officerName", { required: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Rank</FormLabel>
                <FormControl>
                  <Input
                    {...formMethods.register("officerRank", { required: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>P. No</FormLabel>
                <FormControl>
                  <Input
                    {...formMethods.register("officerPno", { required: true })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Contact No</FormLabel>
                <FormControl>
                  <Input
                    {...formMethods.register("officerContact", {
                      required: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </section>

          {/* Transport details table */}
          <section className="space-y-4 border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Transport Details</h2>
              <Button type="button" variant="ghost" size="sm" onClick={addRow}>
                <Plus className="h-4 w-4 mr-1" /> Add Row
              </Button>
            </div>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>S. No</TableHead>
                  <TableHead>Date Required</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Vehicle Type</TableHead>
                  <TableHead>No. of Vehicles</TableHead>
                  <TableHead>Duration (Hours/Days)</TableHead>
                  <TableHead>Purpose of Use</TableHead>
                  <TableHead>Destination</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transportRows.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{idx + 1}</TableCell>
                    <TableCell>
                      <Input
                        type="date"
                        {...formMethods.register(
                          `transportRows.${idx}.dateRequired`,
                          {
                            required: true,
                          }
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="time"
                        {...formMethods.register(`transportRows.${idx}.time`, {
                          required: true,
                        })}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        {...formMethods.register(
                          `transportRows.${idx}.vehicleType`,
                          {
                            required: true,
                          }
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        min="1"
                        {...formMethods.register(
                          `transportRows.${idx}.vehiclesCount`,
                          {
                            required: true,
                          }
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        {...formMethods.register(
                          `transportRows.${idx}.duration`,
                          {
                            required: true,
                          }
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        {...formMethods.register(
                          `transportRows.${idx}.purpose`,
                          {
                            required: true,
                          }
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        {...formMethods.register(
                          `transportRows.${idx}.destination`,
                          {
                            required: true,
                          }
                        )}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="text-destructive"
                        onClick={() => removeRow(idx)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </section>

          {/* Remarks */}
          <section className="border rounded-lg p-4">
            <FormItem>
              <FormLabel>Remarks (if any)</FormLabel>
              <FormControl>
                <Textarea rows={3} {...formMethods.register("remarks")} />
              </FormControl>
            </FormItem>
          </section>

          {/* Approved By */}
          <section className="space-y-4 border rounded-lg p-4">
            <h2 className="text-lg font-semibold">Approved By</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    {...formMethods.register("approvedByName", {
                      required: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Rank/Designation</FormLabel>
                <FormControl>
                  <Input
                    {...formMethods.register("approvedByRank", {
                      required: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>

              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    {...formMethods.register("approvedDate", {
                      required: true,
                    })}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            </div>
          </section>

          {/* Submit */}
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
            >
              Cancel
            </Button>
            <Button type="submit">Submit Requisition</Button>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "@/components/ui/card";
import { nightReports } from "@/data/nightReports";
import { ArrowLeft, Printer } from "lucide-react";

export default function ReportDetailPage({ params }) {
  const router = useRouter();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const reportData = nightReports.find((r) => r.id === parseInt(params.id));

    if (reportData) {
      setReport(reportData);
    }
    setLoading(false);
  }, [params.id]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <p>Loading report data...</p>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="container mx-auto p-6">
        <Link href="/hr-management/report">
          <Button variant="outline" className="mb-4 flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Reports
          </Button>
        </Link>
        <Card>
          <CardContent className="p-6">
            <p className="text-center">Report not found</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Helper function to render section headers
  const SectionHeader = ({ children }) => (
    <h3 className="font-semibold text-lg border-b pb-1 mb-2">{children}</h3>
  );

  // Helper function to render data rows
  const DataRow = ({ label, value }) => (
    <div className="grid grid-cols-1 md:grid-cols-3 py-1.5 border-b">
      <div className="font-medium">{label}</div>
      <div className="md:col-span-2">{value || "N/A"}</div>
    </div>
  );

  return (
    <div className="container mx-auto p-6 space-y-6 print:p-0">
      <div className="flex items-center justify-between print:hidden">
        <Link href="/hr-management/report">
          <Button variant="outline" className="flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Reports
          </Button>
        </Link>
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={handlePrint}
        >
          <Printer size={16} />
          Print Report
        </Button>
      </div>

      <Card className="border print:border-0 print:shadow-none">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">OOD REPORT PERFORMA</CardTitle>
          <CardDescription>Date: {report.date}</CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="p-4 bg-muted/20 rounded-lg print:bg-transparent">
            <div className="flex flex-col md:flex-row justify-between mb-4 gap-2">
              <div>
                <span className="font-semibold">P.No:</span> {report.pNo}
              </div>
              <div>
                <span className="font-semibold">Name:</span> {report.name}
              </div>
              <div>
                <span className="font-semibold">Rank:</span> {report.rank}
              </div>
              <div>
                <span className="font-semibold">Date:</span> {report.date}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <DataRow label="1. Rounds" value={report.details.rounds} />
            <DataRow label="2. CBs/SPs" value={report.details.cbSps} />
            <DataRow label="3. ARMS" value={report.details.arms} />
            <DataRow label="4. Locker" value={report.details.locker} />
            <DataRow
              label="5. Important Signals/Info"
              value={report.details.importantSignals}
            />

            <SectionHeader>6. State of transport</SectionHeader>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">Unit</th>
                    <th className="border p-2 text-left">Total</th>
                    <th className="border p-2 text-left">OPS</th>
                    <th className="border p-2 text-left">N/OPS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">BAHADUR</td>
                    <td className="border p-2">
                      {report.details.transport.bahadur.total}
                    </td>
                    <td className="border p-2">
                      {report.details.transport.bahadur.ops}
                    </td>
                    <td className="border p-2">
                      {report.details.transport.bahadur.nOps}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">S/RANGE</td>
                    <td className="border p-2">
                      {report.details.transport.sRange.total}
                    </td>
                    <td className="border p-2">
                      {report.details.transport.sRange.ops}
                    </td>
                    <td className="border p-2">
                      {report.details.transport.sRange.nOps}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">RP SCHOOL</td>
                    <td className="border p-2">
                      {report.details.transport.rpSchool.total}
                    </td>
                    <td className="border p-2">
                      {report.details.transport.rpSchool.ops}
                    </td>
                    <td className="border p-2">
                      {report.details.transport.rpSchool.nOps}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <SectionHeader>7. FOOD</SectionHeader>
            <DataRow
              label="As per menu"
              value={report.details.food.asPerMenu === "yes" ? "Yes" : "No"}
            />
            <DataRow label="Lunch" value={report.details.food.lunch} />
            <DataRow label="Supper" value={report.details.food.supper} />
            <DataRow label="Breakfast" value={report.details.food.breakfast} />
            <DataRow
              label="Standard of food"
              value={report.details.food.standard}
            />

            {report.details.food.asPerMenu === "no" && (
              <DataRow
                label="8. Food if not as per menu, mention reasons"
                value={report.details.food.notAsPerMenuReason}
              />
            )}

            <SectionHeader>9. Daily water state</SectionHeader>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">Unit</th>
                    <th className="border p-2 text-left">Previous Balance</th>
                    <th className="border p-2 text-left">Received</th>
                    <th className="border p-2 text-left">Supplied</th>
                    <th className="border p-2 text-left">Balance</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border p-2">UNIT B</td>
                    <td className="border p-2">
                      {report.details.waterState.unitB.prevBalance}
                    </td>
                    <td className="border p-2">
                      {report.details.waterState.unitB.received}
                    </td>
                    <td className="border p-2">
                      {report.details.waterState.unitB.supplied}
                    </td>
                    <td className="border p-2">
                      {report.details.waterState.unitB.balance}
                    </td>
                  </tr>
                  <tr>
                    <td className="border p-2">SRE A</td>
                    <td className="border p-2">
                      {report.details.waterState.sreA.prevBalance}
                    </td>
                    <td className="border p-2">
                      {report.details.waterState.sreA.received}
                    </td>
                    <td className="border p-2">
                      {report.details.waterState.sreA.supplied}
                    </td>
                    <td className="border p-2">
                      {report.details.waterState.sreA.balance}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <DataRow
              label="10. Fresh water state in barracks W/Room"
              value={report.details.freshWaterBarracks}
            />

            <SectionHeader>11. Patient State</SectionHeader>
            <DataRow
              label="PNS SHAFIA"
              value={`${report.details.patientState.pnsShafiaOfficers} Officers & ${report.details.patientState.pnsShafiaSailors} Sailors`}
            />
            <DataRow
              label="PNS RAHAT"
              value={`${report.details.patientState.pnsRahatOfficers} Officers & ${report.details.patientState.pnsRahatSailors} Sailors`}
            />
            <DataRow
              label="CMH/HAFEEZ"
              value={report.details.patientState.cmhHafeez}
            />

            <DataRow
              label="12. Cleaning / Testing of swimming pool water"
              value={report.details.swimmingPool}
            />

            <SectionHeader>13. Punishment state</SectionHeader>
            <DataRow
              label="Total"
              value={report.details.punishmentState.total}
            />
            <DataRow
              label="P No-9"
              value={report.details.punishmentState.pNo9}
            />
            <DataRow
              label="P No-10"
              value={report.details.punishmentState.pNo10}
            />
            <DataRow
              label="P No-12"
              value={report.details.punishmentState.pNo12}
            />

            <DataRow
              label="14. Incoming Drafts"
              value={report.details.incomingDrafts}
            />
            <DataRow
              label="15. Outgoing Drafts"
              value={report.details.outgoingDrafts}
            />
            <DataRow
              label="16. Commandants commitments for next day"
              value={report.details.commandantsCommitments}
            />
            <DataRow
              label="17. Any Instruction given by Commandant/ Capt MWT/ EXO"
              value={report.details.instructions}
            />
            <DataRow
              label="18. Rounds Observations"
              value={report.details.roundsObservations
                .split("\n")
                .map((item, i) => (
                  <div key={i}>{item}</div>
                ))}
            />
            <DataRow label="19. FIREX" value={report.details.firex} />
            <DataRow
              label="20. Today's activity"
              value={report.details.todayActivity}
            />
            <DataRow
              label="21. Planned activity for Tomorrow"
              value={report.details.plannedActivity}
            />
            <DataRow
              label="22. Dengue spray / Smoking gun conducted"
              value={report.details.dangueSmoking}
            />
            <DataRow
              label="23. Sports events conducted today"
              value={report.details.sportsEvents}
            />

            <SectionHeader>24. Night Muster state of UTO's</SectionHeader>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr>
                    <th className="border p-2 text-left">CLASS</th>
                    <th className="border p-2 text-left">TOTAL</th>
                    <th className="border p-2 text-left">PRESENT</th>
                    <th className="border p-2 text-left">AWAY</th>
                    <th className="border p-2 text-left">LEAVE</th>
                    <th className="border p-2 text-left">DUTY</th>
                    <th className="border p-2 text-left">EXCUSE</th>
                    <th className="border p-2 text-left">MED CAT</th>
                    <th className="border p-2 text-left">TY</th>
                  </tr>
                </thead>
                <tbody>
                  {report.details.nightMuster.classes.map((cls, idx) => (
                    <tr key={idx}>
                      <td className="border p-2">{cls.name}</td>
                      <td className="border p-2">{cls.total}</td>
                      <td className="border p-2">{cls.present}</td>
                      <td className="border p-2">{cls.away}</td>
                      <td className="border p-2">{cls.leave}</td>
                      <td className="border p-2">{cls.duty}</td>
                      <td className="border p-2">{cls.excuse}</td>
                      <td className="border p-2">{cls.medCat}</td>
                      <td className="border p-2">{cls.ty}</td>
                    </tr>
                  ))}
                  <tr className="font-bold">
                    <td className="border p-2">TOTAL</td>
                    <td className="border p-2">
                      {report.details.nightMuster.classes.reduce(
                        (sum, cls) => sum + parseInt(cls.total),
                        0
                      )}
                    </td>
                    <td className="border p-2">
                      {report.details.nightMuster.classes.reduce(
                        (sum, cls) => sum + parseInt(cls.present),
                        0
                      )}
                    </td>
                    <td className="border p-2">
                      {report.details.nightMuster.classes.reduce(
                        (sum, cls) => sum + parseInt(cls.away),
                        0
                      )}
                    </td>
                    <td className="border p-2">
                      {report.details.nightMuster.classes.reduce(
                        (sum, cls) => sum + parseInt(cls.leave),
                        0
                      )}
                    </td>
                    <td className="border p-2">
                      {report.details.nightMuster.classes.reduce(
                        (sum, cls) => sum + parseInt(cls.duty),
                        0
                      )}
                    </td>
                    <td className="border p-2">
                      {report.details.nightMuster.classes.reduce(
                        (sum, cls) => sum + parseInt(cls.excuse),
                        0
                      )}
                    </td>
                    <td className="border p-2">
                      {report.details.nightMuster.classes.reduce(
                        (sum, cls) => sum + parseInt(cls.medCat),
                        0
                      )}
                    </td>
                    <td className="border p-2">
                      {report.details.nightMuster.classes.reduce(
                        (sum, cls) => sum + parseInt(cls.ty),
                        0
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
        <CardFooter className="print:hidden justify-center border-t pt-6">
          <Button className="flex items-center gap-2" onClick={handlePrint}>
            <Printer size={16} />
            Print Report
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

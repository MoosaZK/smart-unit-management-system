"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { 
  Table, 
  TableBody, 
  TableCaption, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { navyPersonnel } from "@/data/navyPersonnel"

export default function OfficersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()
  const officers = navyPersonnel.officers

  const filteredOfficers = officers.filter(officer => 
    officer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    officer.pNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
    officer.state.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handleRowClick = (officerId) => {
    router.push(`/hr-management/officers/${officerId}`)
  }

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-6">Navy Officers Management</h1>
      
      <div className="mb-4">
        <Input
          placeholder="Search by name, P-Number or state..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
      </div>
      
      <Table>
        <TableCaption>List of Navy Officers</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>P-Number</TableHead>
            <TableHead>State</TableHead>
            {/* <TableHead>Rank</TableHead> */}
            <TableHead>Contact Number</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Next of Kin</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOfficers.map((officer) => (
            <TableRow 
              key={officer.id} 
              onClick={() => handleRowClick(officer.id)}
              className="cursor-pointer hover:bg-gray-100"
            >
              <TableCell className="font-medium">{officer.name}</TableCell>
              <TableCell>{officer.pNumber}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${getStateColor(officer.state)}`}>
                  {officer.state}
                </span>
              </TableCell>
              {/* <TableCell>{officer.rank}</TableCell> */}
              <TableCell>{officer.contactNumber}</TableCell>
              <TableCell className="max-w-xs truncate">{officer.address}</TableCell>
              <TableCell>{officer.nextOfKin}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

// Helper function to get color based on state
function getStateColor(state) {
  switch (state) {
    case "Present":
      return "bg-green-100 text-green-800"
    case "TY":
      return "bg-blue-100 text-blue-800"
    case "CL":
      return "bg-yellow-100 text-yellow-800"
    case "SL":
      return "bg-orange-100 text-orange-800"
    case "Night Off":
      return "bg-purple-100 text-purple-800"
    case "Detained":
      return "bg-red-100 text-red-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

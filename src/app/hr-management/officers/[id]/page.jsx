"use client"

import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { navyPersonnel } from "@/data/navyPersonnel"
import officerImage from "../../../../../public/images/navalOfficer.jpeg"
export default function OfficerDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const officerId = parseInt(params.id)
  
  const officer = navyPersonnel.officers.find(o => o.id === officerId)
  
  if (!officer) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h1 className="text-2xl font-bold mb-4">Officer Not Found</h1>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-8">
      <Button 
        variant="outline" 
        onClick={() => router.back()}
        className="mb-6"
      >
        ← Back to Officers
      </Button>
      
      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <Card>
            <CardContent className="pt-6 flex flex-col items-center">
              <div className="relative w-48 h-48 rounded-full overflow-hidden mb-4 border-4 border-gray-200">
                <Image 
                  src={officerImage}
                  alt={officer.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h2 className="text-xl font-bold">{officer.name}</h2>
              <p className="text-gray-500">{officer.rank}</p>
              <div className="mt-2">
                <span className={`px-3 py-1 rounded-full text-sm ${getStateColor(officer.state)}`}>
                  {officer.state}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Officer Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">P-Number</h3>
                    <p className="text-lg">{officer.pNumber}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Contact Number</h3>
                    <p className="text-lg">{officer.contactNumber}</p>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Address</h3>
                  <p className="text-lg">{officer.address}</p>
                </div>
                
                <div>
                  <h3 className="text-sm font-medium text-gray-500">Next of Kin</h3>
                  <p className="text-lg">{officer.nextOfKin}</p>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Information</h3>
                  <p className="text-gray-600">
                    This section can contain additional information about the officer such as
                    service history, qualifications, awards, or any other relevant details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
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
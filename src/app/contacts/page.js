"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function ContactsPage() {
  const contacts = [
    { id: 1, name: "OPS", phone: "555-0001" },
    { id: 2, name: "N&H", phone: "555-0002" },
    { id: 3, name: "AWW", phone: "555-0003" },
    { id: 4, name: "UW", phone: "555-0004" },
    { id: 5, name: "IT", phone: "555-0005" },
    { id: 6, name: "COMM", phone: "555-0006" },
    { id: 7, name: "EW", phone: "555-0007" },
    { id: 8, name: "E&F", phone: "555-0008" },
    { id: 9, name: "NS&F", phone: "555-0009" },
    { id: 10, name: "PA CMD", phone: "555-0010" },
    { id: 11, name: "CO House", phone: "555-0011" },
    { id: 12, name: "CO House Staff", phone: "555-0012" },
    { id: 13, name: "MWT Secy", phone: "555-0013" },
    { id: 14, name: "EXO Secy", phone: "555-0014" },
    { id: 15, name: "C&C", phone: "555-0015" },
    { id: 16, name: "Sick bay", phone: "555-0016" },
    { id: 17, name: "Fire Brigade", phone: "555-0017" },
    { id: 18, name: "Tpt", phone: "555-0018" },
    { id: 19, name: "Duty PO(R)", phone: "555-0019" },
    { id: 20, name: "Swimm Pool", phone: "555-0020" },
    { id: 21, name: "BOQ recpt.", phone: "555-0021" },
    { id: 22, name: "Exchange", phone: "555-0022" },
    { id: 23, name: "Ward Room", phone: "555-0023" },
    { id: 24, name: "MSO", phone: "555-0024" },
    { id: 25, name: "DG Room", phone: "555-0025" },
    { id: 26, name: "Gun Room", phone: "555-0026" },
    { id: 27, name: "Ships Galley", phone: "555-0027" },
    { id: 28, name: "Main Guard RM", phone: "555-0028" },
    { id: 29, name: "BAHADUR", phone: "555-0029" },
    { id: 30, name: "JAUHAR", phone: "555-0030" },
    { id: 31, name: "RAHNUMA", phone: "555-0031" },
    { id: 32, name: "RAHBAR", phone: "555-0032" },
    { id: 33, name: "KARSZ", phone: "555-0033" },
    { id: 34, name: "DILAWAR", phone: "555-0034" },
    { id: 35, name: "RAHAT", phone: "555-0035" },
    { id: 36, name: "SHIFA", phone: "555-0036" },
    { id: 37, name: "HIMALAYA", phone: "555-0037" },
    { id: 38, name: "NIGRAAN", phone: "555-0038" },
    { id: 39, name: "PNSL", phone: "555-0039" },
    { id: 40, name: "STC", phone: "555-0040" },
    { id: 41, name: "RAZA", phone: "555-0041" },
    { id: 42, name: "MEHRAN", phone: "555-0042" },
    { id: 43, name: "Barracks", phone: "555-0043" },
    { id: 44, name: "MAHRAN", phone: "555-0044" },
    { id: 45, name: "ZAFAR", phone: "555-0045" },
    { id: 46, name: "PUNJAB", phone: "555-0046" },
    { id: 47, name: "D/KYARD", phone: "555-0047" },
    { id: 48, name: "IQBAL", phone: "555-0048" },
    { id: 49, name: "HAFEEZ", phone: "555-0049" },
    { id: 50, name: "ORO COMKAR", phone: "555-0050" },
    { id: 51, name: "NIGRAN Ops Room", phone: "555-0051" },
    { id: 52, name: "4th FP ORO", phone: "555-0052" },
    { id: 53, name: "4th FP C&C", phone: "555-0053" },
    { id: 54, name: "Zonal Fire Brigade KARSZ", phone: "555-0054" },
    { id: 55, name: "Fire Brigade KARSZ", phone: "555-0055" },
    { id: 56, name: "Fire Brigade RAZA", phone: "555-0056" },
    { id: 57, name: "BD/EOD Team", phone: "555-0057" },
    { id: 58, name: "Golf Club", phone: "555-0058" },
    { id: 59, name: "Bahria Auditorium", phone: "555-0059" },
    { id: 60, name: "Karsaz Propeller gate", phone: "555-0060" },
    { id: 61, name: "Bahria College NORE I", phone: "555-0061" },
    { id: 62, name: "Bahria Coll KARSZ", phone: "555-0062" },
    { id: 63, name: "Shooting Range", phone: "555-0063" },
    { id: 64, name: "DSTOP", phone: "555-0064" },
    { id: 65, name: "K Electric", phone: "555-0065" },
    { id: 66, name: "DA Reception", phone: "555-0066" },
    { id: 67, name: "SHIFA Reception", phone: "555-0067" },
    { id: 68, name: "RAHAT Reception", phone: "555-0068" },
  ];

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter contacts based on search term
  const filteredContacts = contacts.filter(contact => 
    contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contact.phone.includes(searchTerm)
  );

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentContacts = filteredContacts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredContacts.length / itemsPerPage);

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-6">Contact Directory - IMP Contacts</h1>
      
      {/* Search bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search contacts..."
          className="pl-10 w-full max-w-sm"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to first page on search
          }}
        />
      </div>
      
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[100px] font-medium">ID</TableHead>
              <TableHead className="font-medium">Name</TableHead>
              <TableHead className="font-medium">Phone</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentContacts.length > 0 ? (
              currentContacts.map((contact) => (
                <TableRow key={contact.id} className="hover:bg-slate-50">
                  <TableCell className="font-medium">{contact.id}</TableCell>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.phone}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-gray-500">
                  No contacts found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      
      {/* Pagination */}
      {filteredContacts.length > itemsPerPage && (
        <Pagination className="mt-6">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
            
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              // Show pages around current page
              let pageNum;
              if (totalPages <= 5) {
                pageNum = i + 1;
              } else if (currentPage <= 3) {
                pageNum = i + 1;
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i;
              } else {
                pageNum = currentPage - 2 + i;
              }
              
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    isActive={currentPage === pageNum}
                    className="cursor-pointer"
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}
            
            <PaginationItem>
              <PaginationNext 
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
} 
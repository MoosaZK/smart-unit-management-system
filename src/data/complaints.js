export const complaintCategories = [
  { id: "furniture", name: "Furniture and Stores (F&S)" },
  { id: "plumbing", name: "Plumbing" },
  { id: "electrical", name: "Electrical" },
  { id: "structural", name: "Structural Damage" },
  { id: "hvac", name: "HVAC/Air Conditioning" },
  { id: "cleaning", name: "Cleaning Services" },
  { id: "security", name: "Security Systems" },
  { id: "network", name: "Network/IT" },
];

export const complaintSubcategories = {
  furniture: [
    { id: "broken-chairs", name: "Broken Chairs/Tables" },
    { id: "furniture-replacement", name: "Furniture Replacement" },
    { id: "storage-issues", name: "Storage Issues" },
  ],
  plumbing: [
    { id: "leakage", name: "Water Leakage" },
    { id: "clogged-drains", name: "Clogged Drains" },
    { id: "broken-fixtures", name: "Broken Fixtures" },
  ],
  electrical: [
    { id: "power-outage", name: "Power Outage" },
    { id: "faulty-wiring", name: "Faulty Wiring" },
    { id: "lighting-issues", name: "Lighting Issues" },
  ],
  structural: [
    { id: "wall-damage", name: "Wall Damage" },
    { id: "ceiling-issues", name: "Ceiling Issues" },
    { id: "flooring-problems", name: "Flooring Problems" },
  ],
  hvac: [
    { id: "cooling-issues", name: "Cooling Issues" },
    { id: "heating-issues", name: "Heating Issues" },
    { id: "ventilation-problems", name: "Ventilation Problems" },
  ],
  cleaning: [
    { id: "routine-cleaning", name: "Routine Cleaning" },
    { id: "special-cleaning", name: "Special Cleaning Request" },
    { id: "pest-control", name: "Pest Control" },
  ],
  security: [
    { id: "door-locks", name: "Door Locks/Keys" },
    { id: "cctv-issues", name: "CCTV Issues" },
    { id: "alarm-system", name: "Alarm System" },
  ],
  network: [
    { id: "internet-issues", name: "Internet Connectivity" },
    { id: "hardware-failure", name: "Hardware Failure" },
    { id: "software-issues", name: "Software Issues" },
  ],
};

export const priorityLevels = [
  { id: "low", name: "Low" },
  { id: "medium", name: "Medium" },
  { id: "high", name: "High" },
];

export const complaintStatus = [
  {
    id: "pending",
    name: "Pending",
    color: "bg-yellow-100 text-yellow-800 border-yellow-300",
  },
  {
    id: "in-progress",
    name: "In Progress",
    color: "bg-blue-100 text-blue-800 border-blue-300",
  },
  {
    id: "resolved",
    name: "Resolved",
    color: "bg-green-100 text-green-800 border-green-300",
  },
  {
    id: "rejected",
    name: "Rejected",
    color: "bg-red-100 text-red-800 border-red-300",
  },
];

// Sample complaint data
export const sampleComplaints = [
  {
    id: "comp-001",
    title: "New Plumbing Line",
    description:
      "Need installation of new plumbing line in the admin block bathroom.",
    category: "plumbing",
    subcategory: "broken-fixtures",
    priority: "high",
    status: "in-progress",
    submittedBy: "Lt. Hassan",
    assignedTo: "Sgt. Ahmed",
    submittedDate: "2023-03-20",
    dueDate: "2023-05-30",
    location: "Admin Block - Ground Floor",
    images: [],
    updates: [
      {
        id: "upd-001",
        text: "Materials ordered",
        date: "2023-03-22",
        by: "Sgt. Ahmed",
      },
      {
        id: "upd-002",
        text: "Materials received, scheduling work",
        date: "2023-04-05",
        by: "Sgt. Ahmed",
      },
    ],
  },
  {
    id: "comp-002",
    title: "New DG Installation",
    description: "Installation of backup generator for officers mess",
    category: "electrical",
    subcategory: "power-outage",
    priority: "medium",
    status: "pending",
    submittedBy: "Lt. Haseeb",
    assignedTo: "W.O. Ali",
    submittedDate: "2023-04-10",
    dueDate: "2023-06-15",
    location: "Officers Mess",
    images: [],
    updates: [],
  },
  {
    id: "comp-003",
    title: "Broken Chairs in Conference Room",
    description:
      "Five chairs in the main conference room need repair or replacement",
    category: "furniture",
    subcategory: "broken-chairs",
    priority: "low",
    status: "resolved",
    submittedBy: "Capt. Khan",
    assignedTo: "Cpl. Farooq",
    submittedDate: "2023-02-15",
    dueDate: "2023-03-01",
    location: "Main Conference Room",
    images: [],
    updates: [
      {
        id: "upd-003",
        text: "Three chairs repaired, two will be replaced",
        date: "2023-02-20",
        by: "Cpl. Farooq",
      },
      {
        id: "upd-004",
        text: "New chairs have arrived and installed",
        date: "2023-02-28",
        by: "Cpl. Farooq",
      },
    ],
  },
  {
    id: "comp-004",
    title: "Network Connection Issues",
    description: "Network connectivity issues in the east wing offices",
    category: "network",
    subcategory: "internet-issues",
    priority: "high",
    status: "in-progress",
    submittedBy: "Lt. Cmdr. Malik",
    assignedTo: "Tech. Sgn. Ibrahim",
    submittedDate: "2023-04-25",
    dueDate: "2023-05-05",
    location: "East Wing - Second Floor",
    images: [],
    updates: [
      {
        id: "upd-005",
        text: "Initial assessment complete, router issue identified",
        date: "2023-04-26",
        by: "Tech. Sgn. Ibrahim",
      },
    ],
  },
  {
    id: "comp-005",
    title: "Air Conditioning Failure",
    description: "AC unit not cooling in the operations room",
    category: "hvac",
    subcategory: "cooling-issues",
    priority: "medium",
    status: "pending",
    submittedBy: "Maj. Zafar",
    assignedTo: undefined,
    submittedDate: "2023-05-01",
    dueDate: null,
    location: "Operations Room",
    images: [],
    updates: [],
  },
];

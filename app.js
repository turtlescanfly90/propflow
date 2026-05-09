const storageKey = "propflow-demo-state-v7";
const userStoragePrefix = "propflow-user-state-v1";
let activeStorageKey = storageKey;

const defaultTenants = [
  {
    id: "TEN-1001",
    fullName: "Maya Collins",
    phone: "07123 456789",
    email: "maya@example.com",
    address: "Flat 4, 18 Albion Road, London",
    postcode: "N1 8AB",
    tenancyStart: "2026-04-01",
    tenancyEnd: "",
    status: "active",
  },
  {
    id: "TEN-1002",
    fullName: "Owen Rees",
    phone: "07234 567890",
    email: "owen@example.com",
    address: "7 Mason Street, London",
    postcode: "N1 7AL",
    tenancyStart: "2026-03-15",
    tenancyEnd: "",
    status: "active",
  },
  {
    id: "TEN-1003",
    fullName: "Priya Shah",
    phone: "07345 678901",
    email: "priya@example.com",
    address: "21 Park View, London",
    postcode: "N21 1QS",
    tenancyStart: "2025-11-20",
    tenancyEnd: "",
    status: "active",
  },
];

const defaultProperties = [
  {
    id: "PROP-1001",
    address: "Flat 4, 18 Albion Road, London",
    postcode: "N1 8AB",
    type: "Purpose-built flat",
    bedrooms: 2,
    bathrooms: 1,
    landlord: "Harbour Family Trust",
    landlordEmail: "owners@harbourtrust.example",
    landlordPhone: "020 7946 0142",
    occupancy: "occupied",
    monthlyRent: 1450,
    agencyFeePercent: 10,
    otherExpenses: 85,
  },
  {
    id: "PROP-1002",
    address: "7 Mason Street, London",
    postcode: "N1 7AL",
    type: "Terraced house",
    bedrooms: 3,
    bathrooms: 2,
    landlord: "Daniel Mercer",
    landlordEmail: "daniel.mercer@example.com",
    landlordPhone: "0161 555 0198",
    occupancy: "occupied",
    monthlyRent: 1650,
    agencyFeePercent: 10,
    otherExpenses: 120,
  },
  {
    id: "PROP-1003",
    address: "21 Park View, London",
    postcode: "N21 1QS",
    type: "Converted maisonette",
    bedrooms: 2,
    bathrooms: 1,
    landlord: "Asha Patel",
    landlordEmail: "asha.patel@example.com",
    landlordPhone: "0121 555 0183",
    occupancy: "occupied",
    monthlyRent: 1325,
    agencyFeePercent: 9,
    otherExpenses: 70,
  },
  {
    id: "PROP-1004",
    address: "12 Dock Lane, London",
    postcode: "E16 1AG",
    type: "Studio flat",
    bedrooms: 1,
    bathrooms: 1,
    landlord: "West Quay Holdings",
    landlordEmail: "property@westquay.example",
    landlordPhone: "0117 555 0150",
    occupancy: "vacant",
    monthlyRent: 980,
    agencyFeePercent: 10,
    otherExpenses: 55,
  },
];

const defaultTeamMembers = [
  {
    id: "USR-1001",
    fullName: "Leah Turner",
    email: "leah@harbourlettings.example",
    role: "agency_admin",
    branch: "All branches",
    status: "active",
  },
  {
    id: "USR-1002",
    fullName: "Marcus Hill",
    email: "marcus@harbourlettings.example",
    role: "property_manager",
    branch: "London",
    status: "active",
  },
  {
    id: "USR-1003",
    fullName: "Northline Plumbing Ltd",
    email: "jobs@northline.example",
    role: "contractor",
    branch: "London",
    status: "invited",
  },
];

const defaultRentItems = [
  {
    id: "RENT-1001",
    tenantId: "TEN-1001",
    amount: 1450,
    dueDate: "2026-05-05",
    status: "due",
  },
  {
    id: "RENT-1002",
    tenantId: "TEN-1002",
    amount: 1650,
    dueDate: "2026-05-01",
    status: "overdue",
  },
  {
    id: "RENT-1003",
    tenantId: "TEN-1003",
    amount: 1325,
    dueDate: "2026-05-03",
    status: "paid",
  },
];

const defaultNotifications = [
  {
    id: "NOT-1001",
    tenantId: "TEN-1002",
    subject: "Rent payment reminder",
    message: "Your rent payment is overdue. Please contact the agency if you have already made payment or need support.",
    channel: "in_app",
    priority: "urgent",
    status: "prepared",
    createdAt: "03 May 2026",
  },
  {
    id: "NOT-1002",
    tenantId: "TEN-1001",
    subject: "Upcoming rent due",
    message: "This is a reminder that your rent is due soon.",
    channel: "email",
    priority: "normal",
    status: "draft",
    createdAt: "02 May 2026",
  },
];


const defaultTickets = [
  {
    id: "RF-1042",
    title: "Water leak",
    property: "Flat 4, 18 Albion Road, London",
    tenant: "Maya Collins",
    priority: "Urgent",
    status: "New",
    trade: "Plumber",
    approval: "Not required",
    sla: "4 hours",
    contractor: "Northline Plumbing Ltd",
    contractorEmail: "jobs@northline.example",
    tag: "urgent",
    description: "Water is coming through the bathroom ceiling when the upstairs flat uses the shower.",
    evidence: ["Leak photo", "Ceiling stain", "Access panel"],
    media: ["Leak photo", "Ceiling stain", "Access panel"],
    availabilityWindows: ["Monday 9am-12pm", "Tuesday 2pm-6pm", "Anytime with 24h notice"],
    accessNotes: "Parking is available behind the building. Please call on arrival. No pets in property.",
    preferredContact: "Phone",
    permissionToEnter: false,
    appointment: { status: "proposed", proposedBy: "agency", proposedStart: "Tuesday 2pm", proposedEnd: "Tuesday 4pm", confirmedStart: "", confirmedEnd: "", notes: "" },
    estimatedCost: 260,
    actualCost: "",
    invoiceFile: "",
    tradesNotes: "",
    completion: { tenantConfirmed: false, comment: "" },
    createdAt: "Today 09:18",
  },
  {
    id: "RF-1041",
    title: "Electrical problem",
    property: "7 Mason Street, London",
    tenant: "Owen Rees",
    priority: "Emergency",
    status: "Reviewed",
    trade: "Electrician",
    approval: "Not required",
    sla: "2 hours",
    contractor: "BrightSpark Electrical",
    contractorEmail: "jobs@brightspark.example",
    tag: "urgent",
    description: "Sockets in the kitchen are tripping the breaker.",
    evidence: ["Consumer unit", "Kitchen socket"],
    media: ["Consumer unit", "Kitchen socket"],
    availabilityWindows: ["Today after 4pm", "Tomorrow 9am-11am"],
    accessNotes: "Tenant works from home. Ring intercom twice.",
    preferredContact: "Phone",
    permissionToEnter: false,
    appointment: { status: "confirmed", proposedBy: "contractor", proposedStart: "Today 4pm", proposedEnd: "Today 6pm", confirmedStart: "Today 4pm", confirmedEnd: "Today 6pm", notes: "" },
    estimatedCost: 420,
    actualCost: "",
    invoiceFile: "",
    tradesNotes: "",
    completion: { tenantConfirmed: false, comment: "" },
    createdAt: "Today 08:42",
  },
  {
    id: "RF-1038",
    title: "Boiler pressure dropping",
    property: "7 Mason Street, London",
    tenant: "Owen Rees",
    priority: "Routine",
    status: "Reviewed",
    trade: "Heating engineer",
    approval: "Required over GBP 250",
    sla: "2 working days",
    contractor: "Heatwise Boiler Care",
    contractorEmail: "jobs@heatwise.example",
    tag: "approval",
    description: "Boiler loses pressure every few days and needs topping up.",
    evidence: ["Boiler display", "Pressure gauge", "Tenant note"],
    media: ["Boiler display", "Pressure gauge", "Tenant note"],
    availabilityWindows: ["Friday 10am-1pm", "Weekend only"],
    accessNotes: "Parking permit needed from tenant.",
    preferredContact: "Email",
    permissionToEnter: false,
    appointment: { status: "proposed", proposedBy: "agency", proposedStart: "", proposedEnd: "", confirmedStart: "", confirmedEnd: "", notes: "" },
    estimatedCost: 320,
    actualCost: "",
    invoiceFile: "",
    tradesNotes: "",
    completion: { tenantConfirmed: false, comment: "" },
    createdAt: "Yesterday 16:25",
  },
  {
    id: "RF-1037",
    title: "Damp in bedroom",
    property: "21 Park View, London",
    tenant: "Priya Shah",
    priority: "Urgent",
    status: "Awaiting tenant availability",
    trade: "Property manager",
    approval: "Inspection first",
    sla: "24 hours",
    contractor: "DryHome Damp Specialists",
    contractorEmail: "jobs@dryhome.example",
    tag: "urgent",
    description: "Black mould has appeared around the bedroom window frame.",
    evidence: ["Window frame", "Wall photo"],
    media: ["Window frame", "Wall photo"],
    availabilityWindows: ["Thursday 1pm-5pm"],
    accessNotes: "Tenant prefers text before visit.",
    preferredContact: "In-app message",
    permissionToEnter: true,
    appointment: { status: "proposed", proposedBy: "agency", proposedStart: "", proposedEnd: "", confirmedStart: "", confirmedEnd: "", notes: "" },
    estimatedCost: 180,
    actualCost: "",
    invoiceFile: "",
    tradesNotes: "",
    completion: { tenantConfirmed: false, comment: "" },
    createdAt: "Yesterday 11:10",
  },
];

const defaultDocuments = [
  {
    id: "DOC-2108",
    type: "Gas safety certificate",
    property: "21 Park View, London",
    fileName: "gas-safety-park-view.pdf",
    issueDate: "2025-05-18",
    validityYears: "1",
    expiry: "2026-05-18",
    visibility: "tenant",
    notes: "Renewal reminder sent to property manager.",
    uploadedAt: "02 May 2026",
    fileDataUrl: "",
    fileMime: "application/pdf",
  },
  {
    id: "DOC-2107",
    type: "Electrical safety certificate / EICR",
    property: "21 Park View, London",
    fileName: "eicr-park-view.pdf",
    issueDate: "2021-05-15",
    validityYears: "5",
    expiry: "2026-05-15",
    visibility: "tenant",
    notes: "Auto-calculated from issue date plus 5 years.",
    uploadedAt: "30 Apr 2026",
    fileDataUrl: "",
    fileMime: "application/pdf",
  },
  {
    id: "DOC-2089",
    type: "Tenancy agreement",
    property: "Flat 4, 18 Albion Road, London",
    fileName: "albion-road-tenancy.pdf",
    issueDate: "",
    validityYears: "",
    expiry: "",
    visibility: "tenant",
    notes: "Signed AST stored for tenant and agency.",
    uploadedAt: "14 Apr 2026",
    fileDataUrl: "",
    fileMime: "application/pdf",
  },
  {
    id: "DOC-2075",
    type: "Inventory and check-in",
    property: "7 Mason Street, London",
    fileName: "mason-street-inventory.pdf",
    issueDate: "",
    validityYears: "",
    expiry: "",
    visibility: "private",
    notes: "Tenant signature pending.",
    uploadedAt: "09 Apr 2026",
    fileDataUrl: "",
    fileMime: "application/pdf",
  },
];

const tradeRules = {
  "Water leak": { trade: "Plumber", contractor: "Northline Plumbing Ltd", sla: "4 hours", approval: "Not required" },
  "Electrical problem": { trade: "Electrician", contractor: "BrightSpark Electrical", sla: "2 hours", approval: "Not required" },
  "Heating or boiler": { trade: "Heating engineer", contractor: "Heatwise Boiler Care", sla: "2 working days", approval: "Required over GBP 250" },
  "Damp or mould": { trade: "Property manager", contractor: "DryHome Damp Specialists", sla: "24 hours", approval: "Inspection first" },
  "Appliance fault": { trade: "Appliance engineer", contractor: "Northline Plumbing Ltd", sla: "2 working days", approval: "Required over GBP 250" },
};

const londonDemoAddressMap = {
  "Flat 4, 18 Albion Road, London N1": { address: "Flat 4, 18 Albion Road, London", postcode: "N1 8AB" },
  "Flat 4, 18 Albion Road, London": { address: "Flat 4, 18 Albion Road, London", postcode: "N1 8AB" },
  "7 Mason Street, Manchester M4": { address: "7 Mason Street, London", postcode: "N1 7AL" },
  "7 Mason Street, London": { address: "7 Mason Street, London", postcode: "N1 7AL" },
  "21 Park View, Birmingham B13": { address: "21 Park View, London", postcode: "N21 1QS" },
  "21 Park View, London": { address: "21 Park View, London", postcode: "N21 1QS" },
  "12 Dock Lane, Bristol BS1": { address: "12 Dock Lane, London", postcode: "E16 1AG" },
  "12 Dock Lane, London": { address: "12 Dock Lane, London", postcode: "E16 1AG" },
};

const londonDemoPropertyPostcodes = {
  "PROP-1001": "N1 8AB",
  "PROP-1002": "N1 7AL",
  "PROP-1003": "N21 1QS",
  "PROP-1004": "E16 1AG",
};

const londonCouncilDirectory = [
  { name: "Barking and Dagenham", website: "https://www.lbbd.gov.uk" },
  { name: "Barnet", website: "https://www.barnet.gov.uk" },
  { name: "Bexley", website: "https://www.bexley.gov.uk" },
  { name: "Brent", website: "https://www.brent.gov.uk" },
  { name: "Bromley", website: "https://www.bromley.gov.uk" },
  { name: "Camden", website: "https://www.camden.gov.uk" },
  { name: "City of London", website: "https://www.cityoflondon.gov.uk" },
  { name: "Croydon", website: "https://www.croydon.gov.uk" },
  { name: "Ealing", website: "https://www.ealing.gov.uk" },
  { name: "Enfield", website: "https://www.enfield.gov.uk" },
  { name: "Greenwich", website: "https://www.royalgreenwich.gov.uk" },
  { name: "Hackney", website: "https://hackney.gov.uk" },
  { name: "Hammersmith and Fulham", website: "https://www.lbhf.gov.uk" },
  { name: "Haringey", website: "https://www.haringey.gov.uk" },
  { name: "Harrow", website: "https://www.harrow.gov.uk" },
  { name: "Havering", website: "https://www.havering.gov.uk" },
  { name: "Hillingdon", website: "https://www.hillingdon.gov.uk" },
  { name: "Hounslow", website: "https://www.hounslow.gov.uk" },
  { name: "Islington", website: "https://www.islington.gov.uk" },
  { name: "Kensington and Chelsea", website: "https://www.rbkc.gov.uk" },
  { name: "Kingston upon Thames", website: "https://www.kingston.gov.uk" },
  { name: "Lambeth", website: "https://www.lambeth.gov.uk" },
  { name: "Lewisham", website: "https://lewisham.gov.uk" },
  { name: "Merton", website: "https://www.merton.gov.uk" },
  { name: "Newham", website: "https://www.newham.gov.uk" },
  { name: "Redbridge", website: "https://www.redbridge.gov.uk" },
  { name: "Richmond upon Thames", website: "https://www.richmond.gov.uk" },
  { name: "Southwark", website: "https://www.southwark.gov.uk" },
  { name: "Sutton", website: "https://www.sutton.gov.uk" },
  { name: "Tower Hamlets", website: "https://www.towerhamlets.gov.uk" },
  { name: "Waltham Forest", website: "https://www.walthamforest.gov.uk" },
  { name: "Wandsworth", website: "https://www.wandsworth.gov.uk" },
  { name: "Westminster", website: "https://www.westminster.gov.uk" },
];

function londonDemoAddressFor(value) {
  return londonDemoAddressMap[value]?.address || value;
}

function migrateKnownDemoAddressesToLondon(snapshot) {
  const next = { ...snapshot };
  next.tenants = (next.tenants || []).map((tenant) => {
    const mapped = londonDemoAddressMap[tenant.address];
    return mapped ? { ...tenant, address: mapped.address, postcode: mapped.postcode } : tenant;
  });
  next.properties = (next.properties || []).map((property) => {
    const mapped = londonDemoAddressMap[property.address];
    if (!mapped && !londonDemoPropertyPostcodes[property.id]) return property;
    const postcode = londonDemoPropertyPostcodes[property.id] || mapped.postcode;
    return {
      ...property,
      address: mapped?.address || property.address,
      postcode,
      detectedCouncilName: property.postcode === postcode ? property.detectedCouncilName : "",
      manualCouncilName: property.postcode === postcode ? property.manualCouncilName : "",
      councilName: property.postcode === postcode ? property.councilName : "",
      councilSource: property.postcode === postcode ? property.councilSource : "not_checked",
      lastCouncilCheckedAt: property.postcode === postcode ? property.lastCouncilCheckedAt : "",
    };
  });
  next.tickets = (next.tickets || []).map((ticket) => ({ ...ticket, property: londonDemoAddressFor(ticket.property) }));
  next.documents = (next.documents || []).map((documentItem) => ({ ...documentItem, property: londonDemoAddressFor(documentItem.property) }));
  return next;
}

let state = emptyWorkspaceState();
if (state.branding?.primary === "#14745f") state.branding.primary = "#2563eb";
const postcodeLookupCache = new Proxy({}, {
  get: (target, key) => state.postcodeLookups?.[key],
  set: (target, key, value) => {
    state.postcodeLookups = state.postcodeLookups || {};
    state.postcodeLookups[key] = value;
    return true;
  },
  ownKeys: () => Reflect.ownKeys(state.postcodeLookups || {}),
  getOwnPropertyDescriptor: () => ({ enumerable: true, configurable: true }),
});
const postcodeLookupService = PostcodeLookup.createPostcodeLookupService({
  fetchImpl: (...args) => fetch(...args),
  cacheStore: postcodeLookupCache,
});
const propFlowAuth = {
  client: null,
  configured: false,
  remoteConfig: null,
  configProblem: "",
  user: null,
  profile: null,
};
const propFlowBuildId = "20260509-tenant-actions-v1";
let selectedTicketId = state.tickets[0]?.id || "";
let ticketFilter = "all";
let repairRouteFilter = {};
let documentPropertyFilter = "all";
let documentVisibilityFilter = "all";
let documentStatusFilter = "all";
let tenantStatusFilter = "all";
let tenantSearch = "";
let repairSearch = "";
let documentSearch = "";
let rentSearch = "";
let rentStatusFilter = "all";
let propertySearch = "";
let propertyStatusFilter = "all";
let contractorSearch = "";
let boroughSearch = "";
let selectedPropertyId = "";
let activeDetailTab = "overview";
let selectedTradesJobId = "";
let pendingPropertyCouncilLookup = null;
let pendingAvailabilityWindows = [];
let pendingConfirmationEmail = "";

const roleNavList = document.querySelector("#roleNavList");
let navItems = [];
const sections = [...document.querySelectorAll(".panel-section")];
const ticketList = document.querySelector("#ticketList");
const contractorSelect = document.querySelector("#contractorSelect");
const documentList = document.querySelector("#documentList");
const tenantDocumentList = document.querySelector("#tenantDocumentList");
const tenantList = document.querySelector("#tenantList");
const teamList = document.querySelector("#teamList");
const propertyList = document.querySelector("#propertyList");
const propertyDetail = document.querySelector("#propertyDetail");

const navIconPaths = {
  dashboard: "M4 13h6V4H4v9ZM14 20h6V4h-6v16ZM4 20h6v-3H4v3Z",
  property: "M3 21h18M5 21V7l8-4 6 4v14M9 21v-7h6v7M9 10h.01M13 10h.01",
  users: "M16 21v-2a4 4 0 0 0-8 0v2M12 3a4 4 0 1 0 0 8 4 4 0 0 0 0-8ZM22 21v-2a4 4 0 0 0-3-3.87",
  repair: "M4 5h16v14H4V5ZM8 9h8M8 13h5",
  trade: "M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.1-3.1a5 5 0 0 1-6.6 6.6L6.5 20.5a2.1 2.1 0 0 1-3-3l7.7-7.7a5 5 0 0 1 6.6-6.6l-3.1 3.1Z",
  money: "M12 2v20M17 5H9.5a3.5 3.5 0 1 0 0 7H14a3.5 3.5 0 1 1 0 7H6",
  bell: "M18 8a6 6 0 1 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM13.73 21a2 2 0 0 1-3.46 0",
  document: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6ZM14 2v6h6M8 13h8M8 17h6",
  council: "M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M8 10h.01M12 10h.01M16 10h.01",
  team: "M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM22 11h-6M19 8v6",
  settings: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06A1.7 1.7 0 0 0 15 19.4a1.7 1.7 0 0 0-1 .6 1.7 1.7 0 0 0-.41 1.1V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 8.6 19.4a1.7 1.7 0 0 0-1.88.34l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.7 1.7 0 0 0 4.6 15a1.7 1.7 0 0 0-.6-1",
  schedule: "M8 2v4M16 2v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z",
  invoice: "M7 3h10v18l-3-2-2 2-2-2-3 2V3ZM9 8h6M9 12h6M9 16h4",
  message: "M21 15a4 4 0 0 1-4 4H7l-4 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v8Z",
};

const roleNavConfigs = {
  agency: [
    { label: "Dashboard", panel: "overviewPanel", route: "/agency/dashboard", icon: "dashboard" },
    { label: "Properties", panel: "propertiesPanel", route: "/agency/properties", icon: "property" },
    { label: "Tenants", panel: "tenantsPanel", route: "/agency/tenants", icon: "users" },
    { label: "Repairs", panel: "ticketsPanel", route: "/agency/repairs", icon: "repair" },
    { label: "Tradespeople", panel: "contractorsPanel", route: "/agency/tradespeople", icon: "trade" },
    { label: "Finance", panel: "financePanel", route: "/agency/financials", icon: "money" },
    { label: "Notify", panel: "notificationsPanel", route: "/agency/notify", icon: "bell" },
    { label: "Documents", panel: "documentsPanel", route: "/agency/documents", icon: "document" },
    { label: "Councils", panel: "councilsPanel", route: "/agency/councils", icon: "council" },
    { label: "Team", panel: "teamPanel", route: "/agency/team", icon: "team" },
    { label: "Settings", panel: "settingsPanel", route: "/agency/settings", icon: "settings" },
  ],
  tenant: [
    { label: "Home", panel: "tenantPanel", route: "/tenant/home", anchor: "tenantHome", icon: "dashboard" },
    { label: "Report repair", panel: "tenantPanel", route: "/tenant/report-repair", anchor: "tenantReportRepair", icon: "repair" },
    { label: "My repairs", panel: "tenantPanel", route: "/tenant/repairs", anchor: "tenantRepairs", icon: "repair" },
    { label: "Documents", panel: "tenantPanel", route: "/tenant/documents", anchor: "tenantDocuments", icon: "document" },
    { label: "Rent", panel: "tenantPanel", route: "/tenant/rent", anchor: "tenantRent", icon: "money" },
    { label: "Messages", panel: "tenantPanel", route: "/tenant/messages", anchor: "tenantMessages", icon: "message" },
    { label: "Settings", panel: "tenantPanel", route: "/tenant/settings", anchor: "tenantProfile", icon: "settings" },
  ],
  landlord: [
    { label: "Dashboard", panel: "landlordPanel", route: "/landlord/dashboard", anchor: "landlordDashboard", icon: "dashboard" },
    { label: "My properties", panel: "landlordPanel", route: "/landlord/properties", anchor: "landlordProperties", icon: "property" },
    { label: "Repairs", panel: "landlordPanel", route: "/landlord/repairs", anchor: "landlordRepairs", icon: "repair" },
    { label: "Documents", panel: "landlordPanel", route: "/landlord/documents", anchor: "landlordDocuments", icon: "document" },
    { label: "Rent / financials", panel: "landlordPanel", route: "/landlord/financials", anchor: "landlordFinancials", icon: "money" },
    { label: "Invoices", panel: "landlordPanel", route: "/landlord/invoices", anchor: "landlordInvoices", icon: "invoice" },
    { label: "Tradespeople", panel: "landlordPanel", route: "/landlord/tradespeople", anchor: "landlordTradespeople", icon: "trade" },
    { label: "Messages", panel: "landlordPanel", route: "/landlord/messages", anchor: "landlordMessages", icon: "message" },
    { label: "Settings", panel: "landlordPanel", route: "/landlord/settings", anchor: "landlordSettings", icon: "settings" },
  ],
  trades: [
    { label: "Jobs", panel: "tradesPanel", route: "/trades/jobs", icon: "dashboard" },
    { label: "Assigned repairs", panel: "tradesPanel", route: "/trades/assigned-repairs", icon: "repair" },
    { label: "Schedule", panel: "tradesPanel", route: "/trades/schedule", icon: "schedule" },
    { label: "Invoices", panel: "tradesPanel", route: "/trades/invoices", icon: "invoice" },
    { label: "Messages", panel: "tradesPanel", route: "/trades/messages", icon: "message" },
    { label: "Settings", panel: "tradesPanel", route: "/trades/settings", icon: "settings" },
  ],
};

function loadExternalScript(src) {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) {
      existing.addEventListener("load", resolve, { once: true });
      existing.addEventListener("error", reject, { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
}

async function ensureSupabaseLibrary() {
  if (window.supabase?.createClient) return true;
  const sources = [
    "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2",
    "https://unpkg.com/@supabase/supabase-js@2",
  ];
  for (const source of sources) {
    try {
      await loadExternalScript(source);
      if (window.supabase?.createClient) return true;
    } catch (error) {
      console.warn("Could not load Supabase library", source, error);
    }
  }
  propFlowAuth.configProblem = "Supabase settings are configured, but the Supabase browser library failed to load.";
  return false;
}

function supabaseConfig() {
  const config = propFlowAuth.remoteConfig || {};
  const url = String(config.supabaseUrl || "").trim();
  const anonKey = String(config.supabaseAnonKey || "").trim();
  const hasValues = Boolean(url && anonKey);
  const hasValidValues = Boolean(
    hasValues &&
      url.startsWith("https://") &&
      !url.includes("YOUR_SUPABASE") &&
      !anonKey.includes("YOUR_SUPABASE"),
  );
  const configured = Boolean(window.supabase?.createClient && hasValidValues);
  if (window.location.protocol === "file:") {
    propFlowAuth.configProblem = "You are opening the local file version. Use the Vercel URL, not file:///C:/...";
  } else if (!hasValues && !propFlowAuth.configProblem) {
    propFlowAuth.configProblem = "No Supabase values were returned to the main app.";
  } else if (hasValues && !hasValidValues) {
    propFlowAuth.configProblem = "Supabase values are present, but the URL/key format is invalid. Check for wrong value or pasted quotes in Vercel.";
  }
  if (!configured && hasValidValues && !window.supabase?.createClient) {
    propFlowAuth.configProblem = "Supabase settings are configured, but the Supabase browser library did not load.";
  }
  return { url, anonKey, configured };
}

async function loadRemoteAuthConfig() {
  propFlowAuth.configProblem = "";
  try {
    const response = await fetch(`/api/auth-config?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`Auth config API returned ${response.status}`);
    const config = await response.json();
    if (config?.supabaseUrl && config?.supabaseAnonKey) {
      propFlowAuth.remoteConfig = config;
      return;
    }
    propFlowAuth.configProblem = "The Vercel API is running, but it returned empty Supabase values.";
  } catch (error) {
    propFlowAuth.configProblem = error.message || "Could not load the Vercel auth config API.";
    console.warn("Could not load auth config", error);
  }
  const fallbackConfig = window.PropFlowAuthConfig || {};
  if (fallbackConfig.supabaseUrl && fallbackConfig.supabaseAnonKey) {
    propFlowAuth.remoteConfig = fallbackConfig;
    return;
  }
  propFlowAuth.remoteConfig = fallbackConfig;
  if (!propFlowAuth.configProblem) {
    propFlowAuth.configProblem = "The generated auth config file is empty.";
  }
}

async function initAuthClient() {
  await loadRemoteAuthConfig();
  await ensureSupabaseLibrary();
  const config = supabaseConfig();
  if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
    console.log("Supabase URL present:", Boolean(config.url));
    console.log("Supabase anon key present:", Boolean(config.anonKey));
  }
  propFlowAuth.configured = config.configured;
  if (!config.configured) return;
  propFlowAuth.client = window.supabase.createClient(config.url, config.anonKey);
}

async function ensureAuthClientReady() {
  if (!propFlowAuth.configured || !propFlowAuth.client) {
    await initAuthClient();
  }
  return propFlowAuth.configured && propFlowAuth.client;
}

function missingSupabaseConfigMessage() {
  return `Supabase environment variables are missing. ${propFlowAuth.configProblem || "Check Vercel project environment variables and redeploy."}`;
}

function demoWorkspaceState() {
  return {
    tenants: [...defaultTenants],
    properties: [...defaultProperties],
    teamMembers: [...defaultTeamMembers],
    rentItems: [...defaultRentItems],
    notifications: [...defaultNotifications],
    tickets: [...defaultTickets],
    documents: [...defaultDocuments],
    postcodeLookups: {},
    branding: { name: "PropFlow", subtitle: "Agency workspace", primary: "#2563eb" },
  };
}

function emptyWorkspaceState() {
  return {
    tenants: [],
    properties: [],
    teamMembers: [],
    rentItems: [],
    notifications: [],
    tickets: [],
    documents: [],
    postcodeLookups: {},
    branding: { name: "PropFlow", subtitle: "Agency workspace", primary: "#2563eb" },
  };
}

function normaliseWorkspaceState(saved, fallback) {
  return {
    ...fallback,
    ...saved,
    tenants: Array.isArray(saved.tenants) ? saved.tenants : fallback.tenants,
    properties: Array.isArray(saved.properties) ? saved.properties : fallback.properties,
    teamMembers: Array.isArray(saved.teamMembers) ? saved.teamMembers : fallback.teamMembers,
    rentItems: Array.isArray(saved.rentItems) ? saved.rentItems : fallback.rentItems,
    notifications: Array.isArray(saved.notifications) ? saved.notifications : fallback.notifications,
    tickets: Array.isArray(saved.tickets) ? saved.tickets : fallback.tickets,
    documents: Array.isArray(saved.documents) ? saved.documents : fallback.documents,
    postcodeLookups: saved.postcodeLookups || {},
    branding: saved.branding || fallback.branding,
  };
}

function loadState(key = activeStorageKey, options = {}) {
  const fallback = options.seedDemo ? demoWorkspaceState() : emptyWorkspaceState();
  try {
    const saved = JSON.parse(localStorage.getItem(key));
    if (saved && typeof saved === "object") return normaliseWorkspaceState(saved, fallback);
  } catch (error) {
    console.warn("Could not load workspace state", error);
  }

  return fallback;
}

function stripSeedRecordsFromUserWorkspace(workspace) {
  const seed = demoWorkspaceState();
  const withoutSeedIds = (records, seedRecords) => {
    const seedIds = new Set(seedRecords.map((record) => record.id).filter(Boolean));
    const seedEmails = new Set(seedRecords.map((record) => String(record.email || record.landlordEmail || "").toLowerCase()).filter(Boolean));
    const seedNames = new Set(seedRecords.map((record) => String(record.fullName || record.landlord || record.contractor || "").toLowerCase()).filter(Boolean));
    const seedAddresses = new Set(seedRecords.map((record) => String(record.address || record.property || "").toLowerCase()).filter(Boolean));
    return records.filter((record) => {
      const idMatch = seedIds.has(record.id);
      const emailMatch = seedEmails.has(String(record.email || record.landlordEmail || "").toLowerCase());
      const nameMatch = seedNames.has(String(record.fullName || record.landlord || record.contractor || "").toLowerCase());
      const addressMatch = seedAddresses.has(String(record.address || record.property || "").toLowerCase());
      return !(idMatch || emailMatch || nameMatch || addressMatch);
    });
  };
  return {
    ...workspace,
    tenants: withoutSeedIds(workspace.tenants, seed.tenants),
    properties: withoutSeedIds(workspace.properties, seed.properties),
    teamMembers: withoutSeedIds(workspace.teamMembers, seed.teamMembers),
    rentItems: withoutSeedIds(workspace.rentItems, seed.rentItems),
    notifications: withoutSeedIds(workspace.notifications, seed.notifications),
    tickets: withoutSeedIds(workspace.tickets, seed.tickets),
    documents: withoutSeedIds(workspace.documents, seed.documents),
  };
}

function saveState() {
  try {
    localStorage.setItem(activeStorageKey, JSON.stringify(state));
  } catch (error) {
    showToast("Storage is full. In the real app files would be stored securely in cloud storage.");
  }
}

function storageKeyForUser(user) {
  return `${userStoragePrefix}-${user.id}`;
}

function resetWorkspaceSelection() {
  selectedTicketId = state.tickets[0]?.id || "";
  selectedPropertyId = state.properties[0]?.id || "";
  activeDetailTab = "overview";
  ticketFilter = "all";
  tenantStatusFilter = "all";
  propertySearch = "";
  propertyStatusFilter = "all";
  documentPropertyFilter = "all";
  documentVisibilityFilter = "all";
  documentStatusFilter = "all";
  rentSearch = "";
  rentStatusFilter = "all";
}

function renderWorkspace() {
  applyBranding();
  updateMetrics();
  renderTickets();
  renderDocuments();
  renderTenants();
  renderProperties();
  renderTeamMembers();
  renderAgencyTradespeople();
  renderFinance();
  renderNotifications();
  renderDashboardAttention();
  renderTradesDashboard();
  renderLandlordPortal();
  renderBoroughList();
  selectTicket(selectedTicketId);
  updateTenantPreview();
}

function loadWorkspaceForUser(user) {
  activeStorageKey = storageKeyForUser(user);
  state = migrateKnownDemoAddressesToLondon(stripSeedRecordsFromUserWorkspace(loadState(activeStorageKey, { seedDemo: false })));
  if (state.branding?.primary === "#14745f") state.branding.primary = "#2563eb";
  saveState();
  resetWorkspaceSelection();
  renderWorkspace();
}

function showToast(message) {
  const toast = document.querySelector("#toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3000);
}

function registerPhoneAppServiceWorker() {
  if (!("serviceWorker" in navigator)) return;
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("./sw.js")
      .then((registration) => registration.update())
      .catch(() => {
        console.info("Phone app offline cache is not available on this connection.");
      });
  });
}

function setAuthMessage(message, isError = false) {
  const element = document.querySelector("#authMessage");
  if (!element) return;
  element.textContent = `${message} Build: ${propFlowBuildId}`;
  element.classList.toggle("error", isError);
}

function setAuthScreenVisible(visible) {
  document.body.classList.toggle("auth-required", visible);
}

function showAuthPanel(panelName) {
  document.querySelectorAll("[data-auth-tab]").forEach((item) => item.classList.toggle("active", item.dataset.authTab === panelName));
  document.querySelectorAll("[data-auth-panel]").forEach((panel) => panel.classList.toggle("active", panel.dataset.authPanel === panelName));
}

function showSignupConfirmation(email) {
  pendingConfirmationEmail = email;
  const confirmationEmail = document.querySelector("#confirmationEmail");
  if (confirmationEmail) confirmationEmail.textContent = email;
  showAuthPanel("confirm");
  setAuthMessage(`We've sent a confirmation link to ${email}. Please confirm your email before signing in.`);
}

function hasAuthenticatedRole() {
  return Boolean(propFlowAuth.user && propFlowAuth.profile?.role);
}

function normaliseUserRole(role) {
  const value = String(role || "").trim().toLowerCase();
  if (value === "agency") return "agency";
  if (value === "landlord") return "landlord";
  if (value === "tenant") return "tenant";
  if (value === "tradesperson" || value === "contractor") return value;
  return "";
}

function roleFromAuthUser(user) {
  return normaliseUserRole(user?.user_metadata?.role || user?.app_metadata?.role);
}

function pathForPanel(panelId) {
  return {
    overviewPanel: "/agency/dashboard",
    propertiesPanel: "/agency/properties",
    tenantsPanel: "/agency/tenants",
    ticketsPanel: "/agency/repairs",
    contractorsPanel: "/agency/tradespeople",
    documentsPanel: "/agency/documents",
    financePanel: "/agency/financials",
    notificationsPanel: "/agency/notify",
    councilsPanel: "/agency/councils",
    teamPanel: "/agency/team",
    settingsPanel: "/agency/settings",
    tenantPanel: "/tenant/home",
    tradesPanel: "/trades/jobs",
    landlordPanel: "/landlord/dashboard",
  }[panelId] || "/";
}

function redirectToLogin() {
  if (window.location.pathname !== "/login") {
    window.history.replaceState({}, "", "/login");
  }
  setAuthScreenVisible(true);
  showAuthPanel("login");
}

function redirectToRoleHome() {
  const panel = defaultPanelForPortal(portalForUser(currentUser()));
  const path = pathForPanel(panel);
  if (window.location.pathname !== path) {
    window.history.replaceState({}, "", path);
  }
  showPanel(panel);
}

async function fetchAuthProfile(user) {
  if (!propFlowAuth.client || !user) return null;
  const { data, error } = await propFlowAuth.client
    .from("profiles")
    .select("id,email,role,created_at,updated_at")
    .eq("id", user.id)
    .single();
  if (error) {
    console.warn("Could not fetch user profile", error);
    return null;
  }
  return data;
}

async function upsertAuthProfile(user, role) {
  if (!propFlowAuth.client || !user) return null;
  const profile = { id: user.id, email: user.email, role };
  const { data, error } = await propFlowAuth.client
    .from("profiles")
    .upsert(profile, { onConflict: "id" })
    .select("id,email,role,created_at,updated_at")
    .single();
  if (error) throw error;
  return data;
}

async function applyAuthSession(session) {
  propFlowAuth.user = session?.user || null;
  propFlowAuth.profile = propFlowAuth.user ? await fetchAuthProfile(propFlowAuth.user) : null;
  if (!propFlowAuth.user) {
    redirectToLogin();
    return;
  }
  const metadataRole = roleFromAuthUser(propFlowAuth.user);
  if (!propFlowAuth.profile) {
    propFlowAuth.profile = await upsertAuthProfile(propFlowAuth.user, metadataRole || null);
  } else if (!propFlowAuth.profile.role && metadataRole) {
    propFlowAuth.profile = await upsertAuthProfile(propFlowAuth.user, metadataRole);
  }
  if (!propFlowAuth.profile?.role) {
    setAuthScreenVisible(true);
    showAuthPanel("role");
    setAuthMessage("Choose your role to continue.");
    return;
  }
  setAuthScreenVisible(false);
  loadWorkspaceForUser(propFlowAuth.user);
  renderSession();
  redirectToRoleHome();
}

async function initAuthSession() {
  const isReady = await ensureAuthClientReady();
  if (!isReady) {
    redirectToLogin();
    setAuthMessage(missingSupabaseConfigMessage(), true);
    return;
  }
  const { data, error } = await propFlowAuth.client.auth.getSession();
  if (error) {
    redirectToLogin();
    setAuthMessage(error.message, true);
    return;
  }
  await applyAuthSession(data.session);
  propFlowAuth.client.auth.onAuthStateChange((_event, session) => {
    applyAuthSession(session);
  });
}

async function signupWithRole(email, password, role) {
  const isReady = await ensureAuthClientReady();
  if (!isReady) {
    setAuthMessage(missingSupabaseConfigMessage(), true);
    return;
  }
  const { data, error } = await propFlowAuth.client.auth.signUp({
    email,
    password,
    options: { data: { role } },
  });
  if (error) throw error;
  if (data.session) {
    propFlowAuth.user = data.session.user;
    propFlowAuth.profile = await upsertAuthProfile(data.session.user, role);
    await applyAuthSession(data.session);
  } else {
    showSignupConfirmation(email);
  }
}

async function loginWithPassword(email, password) {
  const isReady = await ensureAuthClientReady();
  if (!isReady) {
    setAuthMessage(missingSupabaseConfigMessage(), true);
    return;
  }
  const { data, error } = await propFlowAuth.client.auth.signInWithPassword({ email, password });
  if (error) {
    if (String(error.message || "").toLowerCase().includes("invalid login credentials")) {
      throw new Error("Invalid login credentials. If you just created this account, confirm the email first. If this email was already used before, the password may be from the first signup.");
    }
    throw error;
  }
  await applyAuthSession(data.session);
}

async function resendSignupConfirmation(email) {
  const isReady = await ensureAuthClientReady();
  if (!isReady) {
    setAuthMessage(missingSupabaseConfigMessage(), true);
    return;
  }
  const redirectTo = `${window.location.origin}/login`;
  const { error } = await propFlowAuth.client.auth.resend({
    type: "signup",
    email,
    options: { emailRedirectTo: redirectTo },
  });
  if (error) throw error;
  setAuthMessage("Confirmation email requested. Check inbox and spam. If it still does not arrive, confirm the user manually in Supabase for testing.");
}

async function sendPasswordReset(email) {
  const isReady = await ensureAuthClientReady();
  if (!isReady) {
    setAuthMessage(missingSupabaseConfigMessage(), true);
    return;
  }
  const redirectTo = `${window.location.origin}/login`;
  const { error } = await propFlowAuth.client.auth.resetPasswordForEmail(email, {
    redirectTo,
  });
  if (error) throw error;
  setAuthMessage("Password reset email requested. Check inbox and spam. If email delivery is not configured, create a fresh test account with a new email.");
}

async function signOutAuthUser() {
  if (propFlowAuth.client) await propFlowAuth.client.auth.signOut();
  propFlowAuth.user = null;
  propFlowAuth.profile = null;
  redirectToLogin();
}

function showPanel(panelId) {
  if (!hasAuthenticatedRole()) {
    redirectToLogin();
    return;
  }
  const allowedPanel = allowedPanelForUser(currentUser(), panelId);
  if (allowedPanel !== panelId) {
    showToast("Access denied for this portal.");
    panelId = allowedPanel;
    const allowedPath = pathForPanel(allowedPanel);
    if (window.location.pathname !== allowedPath) window.history.replaceState({}, "", allowedPath);
  }

  sections.forEach((section) => section.classList.toggle("active", section.id === panelId));
  setActiveNavItem(panelId);
  document.querySelector(`#${panelId}`).scrollIntoView({ behavior: "smooth", block: "start" });
}

function routeToPanel(panelId, params = {}) {
  if (!hasAuthenticatedRole()) {
    redirectToLogin();
    return;
  }
  const allowedPanel = allowedPanelForUser(currentUser(), panelId);
  const query = new URLSearchParams(allowedPanel === panelId ? params : {});
  const path = pathForPanel(allowedPanel);
  const suffix = query.toString() ? `?${query.toString()}` : "";
  window.history.pushState({}, "", `${path}${suffix}`);
  if (allowedPanel === "ticketsPanel" && !params.status && !params.urgency) {
    repairRouteFilter = {};
    ticketFilter = "all";
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item.dataset.filter === "all"));
    renderTickets();
  }
  applyRouteFilters(allowedPanel === panelId ? params : {});
  showPanel(allowedPanel);
}

function applyRouteFilters(params = {}) {
  if (params.status || params.urgency) {
    repairRouteFilter = { status: params.status || "", urgency: params.urgency || "" };
    ticketFilter = params.urgency === "urgent" ? "urgent" : "all";
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item.dataset.filter === ticketFilter));
    renderTickets();
  }
  if (params.filter === "expiring") {
    documentStatusFilter = "due";
    const select = document.querySelector("#documentStatusFilter");
    if (select) select.value = "due";
    renderDocuments();
  }
  if (params.filter === "arrears") {
    rentStatusFilter = "overdue";
    const select = document.querySelector("#rentStatusFilter");
    if (select) select.value = "overdue";
    renderFinance();
  }
  if (params.type === "maintenance") {
    rentStatusFilter = "all";
    const select = document.querySelector("#rentStatusFilter");
    if (select) select.value = "all";
    renderFinance();
  }
}

function applyInitialRoute() {
  const query = new URLSearchParams(window.location.search);
  const panelFromQuery = query.get("panel");
  const path = window.location.pathname.toLowerCase();
  const pathPanel =
    path.includes("/agency/repairs") ? "ticketsPanel" :
    path.includes("/agency/documents") ? "documentsPanel" :
    path.includes("/agency/financial") ? "financePanel" :
    path.includes("/agency/tenants") ? "tenantsPanel" :
    path.includes("/agency/tradespeople") ? "contractorsPanel" :
    path.includes("/agency/notify") ? "notificationsPanel" :
    path.includes("/agency/councils") ? "councilsPanel" :
    path.includes("/agency/team") ? "teamPanel" :
    path.includes("/agency/settings") ? "settingsPanel" :
    path.includes("/agency/properties") ? "propertiesPanel" :
    path.includes("/tenant") ? "tenantPanel" :
    path.includes("/landlord") ? "landlordPanel" :
    path.includes("/tradesperson") || path.includes("/trades") ? "tradesPanel" :
    path.includes("/agency") ? "overviewPanel" :
    "";
  const panel = panelFromQuery || pathPanel;
  const params = Object.fromEntries(query.entries());
  if (!panel) {
    redirectToRoleHome();
    return;
  }
  const allowedPanel = allowedPanelForUser(currentUser(), panel);
  if (allowedPanel !== panel) {
    const allowedPath = pathForPanel(allowedPanel);
    if (window.location.pathname !== allowedPath) window.history.replaceState({}, "", allowedPath);
    showPanel(allowedPanel);
    return;
  }
  applyRouteFilters(params);
  showPanel(panel);
}

function portalForUser(user) {
  if (user.type === "tenant") return "tenant";
  if (user.type === "contractor" || user.type === "tradesperson") return "trades";
  if (user.type === "landlord") return "landlord";
  if (user.type === "agency") return "agency";
  return "denied";
}

function allowedPanelsForPortal(portal) {
  if (portal === "tenant") return ["tenantPanel"];
  if (portal === "trades") return ["tradesPanel"];
  if (portal === "landlord") return ["landlordPanel"];
  if (portal === "agency") return ["overviewPanel", "propertiesPanel", "tenantsPanel", "ticketsPanel", "contractorsPanel", "financePanel", "notificationsPanel", "documentsPanel", "councilsPanel", "teamPanel", "settingsPanel"];
  return [];
}

function defaultPanelForPortal(portal) {
  if (portal === "tenant") return "tenantPanel";
  if (portal === "trades") return "tradesPanel";
  if (portal === "landlord") return "landlordPanel";
  if (portal === "agency") return "overviewPanel";
  return "overviewPanel";
}

function allowedPanelForUser(user, panelId) {
  const portal = portalForUser(user);
  const allowed = allowedPanelsForPortal(portal);
  return allowed.includes(panelId) ? panelId : defaultPanelForPortal(portal);
}

function routeToNavItem(item) {
  const panel = item.panel;
  const params = {};
  const path = item.route || pathForPanel(panel);
  if (path && window.location.pathname !== path) window.history.pushState({}, "", path);
  showPanel(panel);
  if (item.anchor) {
    document.querySelector(`#${item.anchor}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  }
  applyRouteFilters(params);
}

function setActiveNavItem(panelId) {
  const currentPath = window.location.pathname.toLowerCase();
  const routeMatch = navItems.find((item) => item.dataset.route && item.dataset.route.toLowerCase() === currentPath);
  navItems.forEach((item) => {
    item.classList.toggle("active", routeMatch ? item === routeMatch : item.dataset.panel === panelId);
  });
}

function renderRoleNavigation(portal) {
  const config = roleNavConfigs[portal] || [];
  roleNavList.innerHTML = "";
  config.forEach((item, index) => {
    const button = document.createElement("button");
    button.className = `nav-item${index === 0 ? " active" : ""}`;
    button.type = "button";
    button.dataset.panel = item.panel;
    button.dataset.route = item.route || "";
    button.innerHTML = `
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="${navIconPaths[item.icon] || navIconPaths.dashboard}" /></svg>
      ${escapeHtml(item.label)}
    `;
    button.addEventListener("click", () => routeToNavItem(item));
    roleNavList.appendChild(button);
  });
  navItems = [...roleNavList.querySelectorAll(".nav-item")];
}

function setPortalMode(mode) {
  document.body.dataset.portal = mode;
  renderRoleNavigation(mode);
  const portalLabel = mode === "tenant" ? "Tenant portal" : mode === "trades" ? "Tradesperson portal" : mode === "landlord" ? "Landlord portal" : "Agency workspace";
  setText("brandSub", portalLabel);
  setText(
    "modeEyebrow",
    mode === "tenant" ? "Tenant self-service portal" : mode === "trades" ? "Tradesperson job workspace" : mode === "landlord" ? "Landlord owner workspace" : "Agency operations workspace",
  );
  setText(
    "modeTitle",
    mode === "tenant"
      ? "Report repairs, view documents, and track what the agency is doing."
      : mode === "trades"
        ? "View assigned jobs, confirm visits, update progress, and upload invoices."
        : mode === "landlord"
          ? "Owner reports and property relationships will appear here."
          : "One workspace for tenants, repairs, paperwork, and compliance.",
  );
}

function currentUser() {
  if (propFlowAuth.user && propFlowAuth.profile) {
    const role = propFlowAuth.profile.role;
    return {
      id: propFlowAuth.user.id,
      email: propFlowAuth.profile.email || propFlowAuth.user.email,
      role,
      fullName: propFlowAuth.profile.email || propFlowAuth.user.email,
      type: role,
    };
  }
  return { email: "", role: "", fullName: "Signed out", type: "unknown" };
}

function authorisedTenant() {
  const user = currentUser();
  if (user.type !== "tenant") return null;
  return state.tenants.find((tenant) => tenant.email === user.email) || null;
}

function renderSession() {
  if (!hasAuthenticatedRole()) {
    document.body.dataset.userType = "unknown";
    setText("signedInUser", "Signed out");
    setText("accountName", "Signed out");
    setText("accountRole", "Sign in required");
    setText("accountInitials", "SO");
    renderRoleNavigation("denied");
    setAuthScreenVisible(true);
    return;
  }
  const user = currentUser();
  const portal = portalForUser(user);
  const label = user.type === "tenant" ? "Tenant" : user.type === "contractor" ? "Tradesperson" : user.type === "landlord" ? "Landlord" : roleLabel(user.role || "agency_admin");
  document.body.dataset.userType = user.type;
  setText("signedInUser", `${label} - ${user.email}`);
  setText("accountName", user.fullName || user.email || "Signed out");
  setText("accountRole", portal === "tenant" ? "Tenant portal" : portal === "trades" ? "Tradesperson dashboard" : portal === "landlord" ? "Landlord dashboard" : "Agency workspace");
  setText("accountInitials", initials(user.fullName || user.email || "PF"));
  setPortalMode(portal);
  showPanel(defaultPanelForPortal(portal));

  renderTenantAccessSummary();
  renderTenantDocuments();
  renderTradesDashboard();
  renderLandlordPortal();
}

function initials(name) {
  return String(name)
    .split(/[\s@.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0].toUpperCase())
    .join("");
}

function closeAccountMenu() {
  document.querySelector("#accountDropdown").classList.remove("open");
  document.querySelector("#accountButton").setAttribute("aria-expanded", "false");
}

function toggleAccountMenu() {
  const dropdown = document.querySelector("#accountDropdown");
  const isOpen = dropdown.classList.toggle("open");
  document.querySelector("#accountButton").setAttribute("aria-expanded", String(isOpen));
}

function selectedTicket() {
  return state.tickets.find((ticket) => ticket.id === selectedTicketId) || state.tickets[0];
}

function refreshRepairViews(ticketId = selectedTicketId) {
  updateMetrics();
  renderTickets();
  renderProperties();
  renderTradesDashboard();
  renderAgencyTradespeople();
  renderDashboardAttention();
  renderNotifications();
  if (state.tickets.length) selectTicket(ticketId && state.tickets.some((ticket) => ticket.id === ticketId) ? ticketId : state.tickets[0].id);
}

function filteredTickets() {
  return state.tickets.filter((ticket) => {
    const filterMatches = ticketFilter === "all" || ticket.tag === ticketFilter;
    const routeStatusMatches =
      !repairRouteFilter.status ||
      (repairRouteFilter.status === "open" && !["Completed", "Closed", "Cancelled"].includes(ticket.status)) ||
      ticket.status.toLowerCase().includes(repairRouteFilter.status.toLowerCase());
    const routeUrgencyMatches =
      !repairRouteFilter.urgency ||
      ticket.tag === repairRouteFilter.urgency ||
      ticket.priority.toLowerCase() === repairRouteFilter.urgency.toLowerCase();
    const haystack = `${ticket.title} ${ticket.property} ${ticket.tenant} ${ticket.status} ${ticket.trade} ${ticket.contractor}`.toLowerCase();
    const searchMatches = !repairSearch || haystack.includes(repairSearch);
    return filterMatches && routeStatusMatches && routeUrgencyMatches && searchMatches;
  });
}

function statusClass(ticket) {
  if (ticket.tag === "urgent") return "urgent";
  if (ticket.tag === "approval") return "warning";
  return "";
}

function setText(id, value) {
  const element = document.querySelector(`#${id}`);
  if (element) element.textContent = value;
}

function setValue(id, value) {
  const element = document.querySelector(`#${id}`);
  if (element) element.value = value;
}

function firstRepairMedia(ticket) {
  const media = ticket.tenantMedia?.length ? ticket.tenantMedia : ticket.media?.length ? ticket.media : ticket.evidence || [];
  return media[0] || null;
}

function repairPreviewMarkup(ticket) {
  const media = firstRepairMedia(ticket);
  if (!media) return `<div class="repair-preview empty">No image</div>`;
  if (typeof media === "object" && media.dataUrl) {
    const isVideo = media.mime?.startsWith("video") || media.dataUrl.startsWith("data:video/");
    return `
      <div class="repair-preview has-preview">
        ${isVideo ? `<video src="${media.dataUrl}" muted></video>` : `<img alt="${media.name || ticket.title}" src="${media.dataUrl}" />`}
      </div>
    `;
  }
  return `<div class="repair-preview">${media}</div>`;
}

function timelineIcon(type = "") {
  if (type.includes("repair")) return "!";
  if (type.includes("document")) return "D";
  if (type.includes("property")) return "P";
  return "";
}

function timelineItemMarkup(item) {
  return `
    <div class="timeline-item">
      <span class="timeline-dot">${timelineIcon(item.type)}</span>
      <div>
        <strong>${item.label}</strong>
        <small>${item.meta || ""}</small>
      </div>
      <time>${item.time || ""}</time>
    </div>
  `;
}

function renderTimeline(containerId, items) {
  const container = document.querySelector(`#${containerId}`);
  if (!container) return;
  container.innerHTML = items.length ? items.map(timelineItemMarkup).join("") : `<div class="empty-state">No activity yet.</div>`;
}

function dashboardActivityItems() {
  const repairs = state.tickets.slice(0, 3).map((ticket) => ({
    type: "repair",
    label: ticket.status === "Completed" ? "Repair completed" : "Tenant reported repair",
    meta: `${ticket.property} - ${ticket.tenant}`,
    time: ticket.createdAt || "Recently",
  }));
  const docs = state.documents.slice(0, 2).map((documentItem) => ({
    type: "document",
    label: `${documentItem.type} uploaded`,
    meta: documentItem.property,
    time: documentItem.uploadedAt || "Recently",
  }));
  const properties = state.properties.slice(0, 1).map((property) => ({
    type: "property",
    label: "Property record updated",
    meta: `${property.occupancy} - ${property.landlord}`,
    time: "Portfolio",
  }));
  return [...repairs, ...docs, ...properties].slice(0, 6);
}

function renderDashboardModern() {
  renderTimeline("dashboardTimeline", dashboardActivityItems());
  renderDashboardCharts();
  renderDashboardReminders();

  const repairTable = document.querySelector("#dashboardRepairsTable");
  if (repairTable) {
    const repairs = state.tickets.filter((ticket) => ticket.status !== "Completed" && ticket.status !== "Closed").slice(0, 6);
    repairTable.innerHTML = repairs.length
      ? repairs.map((ticket) => `
          <button class="data-row" type="button" data-open-repair="${ticket.id}">
            <span><strong>${ticket.title}</strong><small>${ticket.property}</small></span>
            <span>${ticket.tenant}</span>
            <span><em class="status-chip ${statusClass(ticket)}">${ticket.priority}</em></span>
            <span class="row-action-arrow">Open -></span>
          </button>
        `).join("")
      : `<div class="empty-state">No repairs.</div>`;
    repairTable.querySelectorAll("[data-open-repair]").forEach((button) => {
      button.addEventListener("click", () => openRepairFromAgencyTrades(button.dataset.openRepair));
    });
  }

  const propertyTable = document.querySelector("#dashboardPropertiesTable");
  if (propertyTable) {
    propertyTable.innerHTML = state.properties.length
      ? state.properties.slice(0, 6).map((property) => {
          const financials = propertyFinancials(property);
          const repairs = ticketsForProperty(property).filter((ticket) => ticket.status !== "Completed" && ticket.status !== "Closed").length;
          return `
            <button class="data-row" type="button" data-open-property="${property.id}">
              <span><strong>${property.address}</strong><small>${property.postcode || "No postcode"}</small></span>
              <span>${property.occupancy}</span>
              <span>${money(financials.expected)}</span>
              <span class="row-action-arrow">${repairs} repairs -></span>
            </button>
          `;
        }).join("")
      : `<div class="empty-state">No properties.</div>`;
    propertyTable.querySelectorAll("[data-open-property]").forEach((button) => {
      button.addEventListener("click", () => {
        selectProperty(button.dataset.openProperty);
        showPanel("propertiesPanel");
      });
    });
  }
}

function renderDashboardCharts() {
  const rentBarChart = document.querySelector("#rentBarChart");
  if (rentBarChart) {
    const monthly = [
      ["Jan", 1250], ["Feb", 1650], ["Mar", 1325], ["Apr", 2400], ["May", state.rentItems.filter((item) => item.status === "paid").reduce((sum, item) => sum + Number(item.amount || 0), 0)],
      ["Jun", 0], ["Jul", 0],
    ];
    const max = Math.max(...monthly.map((item) => item[1]), 1);
    rentBarChart.innerHTML = `
      <svg class="active-bar-chart" viewBox="0 0 700 230" role="img" aria-label="Rent collected bar chart">
        <defs>
          <linearGradient id="rentBarGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#2563eb" />
            <stop offset="100%" stop-color="#14b8a6" />
          </linearGradient>
        </defs>
        ${monthly.map(([label, value], index) => {
          const barHeight = Math.max(18, Math.round((value / max) * 150));
          const x = 42 + index * 92;
          const y = 170 - barHeight;
          return `
            <g class="chart-bar" tabindex="0">
              <rect class="bar-track" x="${x}" y="20" width="42" height="150" rx="21"></rect>
              <rect class="bar-value" x="${x}" y="${y + 20}" width="42" height="${barHeight}" rx="21"></rect>
              <text class="bar-value-label" x="${x + 21}" y="${Math.max(22, y + 10)}" text-anchor="middle">${Math.round(value / 100) / 10}k</text>
              <text x="${x + 21}" y="205" text-anchor="middle">${label}</text>
              <title>${label}: ${money(value)}</title>
            </g>
          `;
        }).join("")}
      </svg>
      <div class="chart-summary"><strong>${money(monthly[4][1])}</strong><span>collected this month</span></div>
    `;
  }

  const open = state.tickets.filter((ticket) => !["Completed", "Closed", "Cancelled"].includes(ticket.status)).length;
  const inProgress = state.tickets.filter((ticket) => ["Assigned to tradesperson", "Appointment proposed", "Appointment confirmed", "In progress", "Reviewed"].includes(ticket.status)).length;
  const complete = state.tickets.filter((ticket) => ["Completed", "Closed"].includes(ticket.status)).length;
  const urgent = state.tickets.filter((ticket) => ticket.tag === "urgent").length;
  const total = Math.max(urgent + inProgress + complete, 1);
  const urgentPercent = Math.round((urgent / total) * 100);
  const progressPercent = Math.round((inProgress / total) * 100);
  const completePercent = Math.round((complete / total) * 100);
  const donut = document.querySelector("#repairsDonutChart");
  if (donut) {
    donut.innerHTML = `
      <svg class="active-donut-chart" viewBox="0 0 180 180" role="img" aria-label="Repairs breakdown donut chart">
        <circle class="donut-track" cx="90" cy="90" r="68" pathLength="100"></circle>
        <circle class="donut-segment urgent-segment" cx="90" cy="90" r="68" pathLength="100" style="stroke-dasharray:${urgentPercent} ${100 - urgentPercent}; stroke-dashoffset:0;"></circle>
        <circle class="donut-segment progress-segment" cx="90" cy="90" r="68" pathLength="100" style="stroke-dasharray:${progressPercent} ${100 - progressPercent}; stroke-dashoffset:${-urgentPercent};"></circle>
        <circle class="donut-segment complete-segment" cx="90" cy="90" r="68" pathLength="100" style="stroke-dasharray:${completePercent} ${100 - completePercent}; stroke-dashoffset:${-(urgentPercent + progressPercent)};"></circle>
        <text x="90" y="84" text-anchor="middle" class="donut-number">${open}</text>
        <text x="90" y="108" text-anchor="middle" class="donut-label">open repairs</text>
      </svg>
    `;
  }
  const legend = document.querySelector("#repairsChartLegend");
  if (legend) {
    legend.innerHTML = `
      <span><b class="legend-red"></b>${urgent} urgent</span>
      <span><b class="legend-orange"></b>${inProgress} in progress</span>
      <span><b class="legend-green"></b>${completePercent}% complete</span>
    `;
  }

  const occupancy = document.querySelector("#occupancyChart");
  if (occupancy) {
    const occupied = state.properties.filter((property) => property.occupancy === "occupied").length;
    const vacant = Math.max(state.properties.length - occupied, 0);
    const occupiedPercent = Math.round((occupied / Math.max(state.properties.length, 1)) * 100);
    occupancy.innerHTML = `
      <div class="active-progress-row">
        <span>Occupied</span>
        <strong>${occupied} properties</strong>
        <div class="active-progress"><i style="width:${occupiedPercent}%"></i></div>
      </div>
      <div class="active-progress-row">
        <span>Vacant</span>
        <strong>${vacant} properties</strong>
        <div class="active-progress muted-progress"><i style="width:${100 - occupiedPercent}%"></i></div>
      </div>
    `;
  }
}

function renderDashboardReminders() {
  const container = document.querySelector("#dashboardRemindersTable");
  if (!container) return;
  const overdue = state.rentItems.filter((item) => item.status === "overdue").slice(0, 2).map((item) => {
    const tenant = state.tenants.find((tenantItem) => tenantItem.id === item.tenantId);
    return { title: "Rent arrears", detail: `${tenant?.fullName || "Tenant"} - ${money(item.amount)}`, badge: "Overdue", className: "urgent", panel: "financePanel", params: { filter: "arrears" } };
  });
  const expiring = state.documents.filter((documentItem) => ["Expired", "Due soon"].includes(documentStatus(documentItem).label)).slice(0, 2).map((documentItem) => ({
    title: documentItem.type,
    detail: `${documentItem.property} - ${documentItem.expiry ? formatDate(documentItem.expiry) : "missing expiry"}`,
    badge: documentStatus(documentItem).label,
    className: documentStatus(documentItem).className,
    panel: "documentsPanel",
    params: { filter: "expiring" },
  }));
  const urgentRepairs = state.tickets.filter((ticket) => ticket.tag === "urgent").slice(0, 2).map((ticket) => ({
    title: ticket.title,
    detail: `${ticket.property} - ${ticket.tenant}`,
    badge: ticket.priority,
    className: "urgent",
    panel: "ticketsPanel",
    params: { urgency: "urgent" },
  }));
  const reminders = [...overdue, ...expiring, ...urgentRepairs].slice(0, 6);
  container.innerHTML = reminders.length ? reminders.map((item, index) => `
    <button class="data-row reminder-row" type="button" data-reminder-index="${index}">
      <span><strong>${item.title}</strong><small>${item.detail}</small></span>
      <span><em class="status-chip ${item.className}">${item.badge}</em></span>
      <span class="status-chip planned">Planned</span>
      <span class="row-action-arrow">Open -></span>
    </button>
  `).join("") : `<div class="empty-state">No reminders.</div>`;
  container.querySelectorAll("[data-reminder-index]").forEach((button) => {
    button.addEventListener("click", () => {
      const item = reminders[Number(button.dataset.reminderIndex)];
      routeToPanel(item.panel, item.params);
    });
  });
}

function repairTimelineItems(ticket) {
  const items = [
    { type: "repair", label: "Repair reported", meta: `${ticket.tenant} submitted ${ticket.title}`, time: ticket.createdAt || "Recently" },
    { type: "repair", label: `Status: ${ticket.status}`, meta: ticket.contractor ? `Assigned to ${ticket.contractor}` : "Not assigned yet", time: "Current" },
  ];
  if (ticket.appointment?.proposedStart) {
    items.push({ type: "repair", label: "Appointment proposed", meta: ticket.appointment.proposedStart, time: ticket.appointment.status || "Proposed" });
  }
  if (ticket.appointment?.confirmedStart) {
    items.push({ type: "repair", label: "Appointment confirmed", meta: ticket.appointment.confirmedStart, time: "Confirmed" });
  }
  if (ticket.closedAt) {
    items.push({ type: "repair", label: "Repair closed", meta: ticket.closedAt, time: "Closed" });
  }
  return items;
}

function renderTickets() {
  ticketList.innerHTML = "";
  const visibleTickets = filteredTickets();
  if (!visibleTickets.length) {
    ticketList.innerHTML = `<div class="empty-state">No repairs.</div>`;
    return;
  }

  visibleTickets.forEach((ticket) => {
    const card = document.createElement("article");
    card.className = `ticket-card repair-card${ticket.id === selectedTicketId ? " active" : ""}`;
    card.innerHTML = `
      ${repairPreviewMarkup(ticket)}
      <div>
        <strong>${ticket.title}</strong>
        <span>${ticket.property}</span>
        <span>${ticket.status} - ${ticket.trade} - ${ticket.contractor || "Unassigned"}</span>
      </div>
      <div class="repair-card-meta">
        <span class="status-chip ${statusClass(ticket)}">${ticket.priority}</span>
        <div class="row-actions repair-card-actions">
          <button type="button" data-view-repair="${ticket.id}">View</button>
          <button type="button" data-assign-repair="${ticket.id}">Assign</button>
          <button type="button" data-complete-repair="${ticket.id}">Mark complete</button>
        </div>
      </div>
    `;
    card.addEventListener("click", () => selectTicket(ticket.id));
    card.querySelectorAll("button").forEach((button) => {
      button.addEventListener("click", (event) => event.stopPropagation());
    });
    card.querySelector("[data-view-repair]").addEventListener("click", () => selectTicket(ticket.id));
    card.querySelector("[data-assign-repair]").addEventListener("click", () => {
      selectTicket(ticket.id);
      document.querySelector("#assignBtn").click();
    });
    card.querySelector("[data-complete-repair]").addEventListener("click", () => {
      ticket.status = "Completed";
      ticket.completion = ticket.completion || {};
      ticket.completion.tenantConfirmed = false;
      saveState();
      refreshRepairViews(ticket.id);
      showToast(`${ticket.title} marked complete.`);
    });
    ticketList.appendChild(card);
  });
}

function renderEvidence(ticket) {
  const evidenceGrid = document.querySelector("#evidenceGrid");
  evidenceGrid.innerHTML = "";
  const evidence = ticket.tenantMedia?.length ? ticket.tenantMedia.slice(0, 6) : ticket.media?.length ? ticket.media.slice(0, 6) : ticket.evidence?.length ? ticket.evidence.slice(0, 3) : [];
  if (!evidence.length) {
    evidenceGrid.innerHTML = `<div class="empty-state">No tenant images uploaded for this repair.</div>`;
    return;
  }
  evidence.forEach((item) => {
    const tile = document.createElement("div");
    tile.className = "evidence-tile";
    if (typeof item === "object" && item.dataUrl) {
      const mime = item.mime || (item.dataUrl.startsWith("data:image/") ? "image" : item.dataUrl.startsWith("data:video/") ? "video" : "");
      tile.classList.add("has-preview");
      if (mime.startsWith("image")) {
        tile.innerHTML = `<img alt="${item.name}" src="${item.dataUrl}" /><span>${item.name}</span>`;
      } else if (mime.startsWith("video")) {
        tile.innerHTML = `<video controls src="${item.dataUrl}"></video><span>${item.name}</span>`;
      } else {
        tile.textContent = item.name;
      }
    } else {
      tile.textContent = item;
    }
    evidenceGrid.appendChild(tile);
  });
}

function selectTicket(id) {
  selectedTicketId = id;
  const ticket = selectedTicket();
  if (!ticket) {
    document.querySelector("#ticketTitle").textContent = "No repair selected";
    document.querySelector("#ticketAddress").textContent = "No open repair record";
    document.querySelector("#evidenceGrid").innerHTML = `<div class="empty-state">No repair selected.</div>`;
    return;
  }
  document.querySelector("#ticketTitle").textContent = ticket.title;
  document.querySelector("#ticketAddress").textContent = ticket.property;
  document.querySelector("#ticketPriority").textContent = ticket.priority;
  document.querySelector("#ticketPriority").className = `status-chip ${statusClass(ticket)}`;
  document.querySelector("#ticketTenant").textContent = ticket.tenant;
  document.querySelector("#ticketApproval").textContent = ticket.approval;
  document.querySelector("#ticketTrade").textContent = ticket.trade;
  document.querySelector("#ticketSla").textContent = ticket.sla;
  contractorSelect.value = ticket.contractor;
  document.querySelector("#jobStatusSelect").value = ticket.status;
  document.querySelector("#appointmentProposal").value = ticket.appointment?.confirmedStart || ticket.appointment?.proposedStart || "";
  document.querySelector("#estimatedCost").value = ticket.estimatedCost || "";
  document.querySelector("#actualCost").value = ticket.actualCost || "";
  renderTicketAvailability(ticket);
  renderEvidence(ticket);
  renderTimeline("repairTimeline", repairTimelineItems(ticket));
  renderTickets();
}

function renderTicketAvailability(ticket) {
  const list = document.querySelector("#ticketAvailabilityList");
  list.innerHTML = "";
  const windows = ticket.availabilityWindows?.length ? ticket.availabilityWindows : ["No availability added"];
  windows.forEach((item) => {
    const tag = document.createElement("span");
    tag.textContent = item;
    list.appendChild(tag);
  });
  document.querySelector("#ticketAccessNotes").textContent = ticket.accessNotes || "No access notes.";
  document.querySelector("#ticketPermission").textContent = ticket.permissionToEnter ? "Permission to enter if absent" : "Tenant must be present";
}

function updateMetrics() {
  const openTickets = state.tickets.filter((ticket) => ticket.status !== "Completed");
  const urgentTickets = state.tickets.filter((ticket) => ticket.tag === "urgent");
  const assignedTickets = state.tickets.filter((ticket) => ticket.status === "Assigned");
  const newTickets = state.tickets.filter((ticket) => ticket.status === "New");
  const scheduledTickets = state.tickets.filter((ticket) => ticket.status === "Scheduled");
  const completedTickets = state.tickets.filter((ticket) => ticket.status === "Completed");
  const rentCollected = state.rentItems.filter((item) => item.status === "paid").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const maintenanceSpend = state.tickets.reduce((sum, ticket) => sum + Number(ticket.actualCost || ticket.estimatedCost || 0), 0);
  const netPosition = state.properties.reduce((sum, property) => sum + propertyFinancials(property).net, 0);
  const expiringCertificates = state.documents.filter((documentItem) => ["Expired", "Due soon"].includes(documentStatus(documentItem).label)).length;
  setText("dashboardTotalProperties", state.properties.length);
  setText("openRepairs", openTickets.length);
  setText("newCount", newTickets.length);
  setText("assignedCount", assignedTickets.length);
  setText("scheduledCount", scheduledTickets.length);
  setText("completedCount", completedTickets.length || 0);
  setText("dashboardRentCollected", kpiCurrencyDisplay(rentCollected));
  setText("dashboardMaintenanceSpend", kpiCurrencyDisplay(maintenanceSpend));
  setText("dashboardProfit", kpiCurrencyDisplay(netPosition));
  setKpiTone("dashboardRentCollected", rentCollected);
  setKpiTone("dashboardMaintenanceSpend", maintenanceSpend);
  setKpiTone("dashboardProfit", netPosition);
  setText("dashboardExpiringCertificates", expiringCertificates);
  const openRepairMeta = document.querySelector("#openRepairs")?.nextElementSibling;
  if (openRepairMeta) openRepairMeta.textContent = `${urgentTickets.length} urgent, ${assignedTickets.length} assigned to contractor`;
  updateDocumentMetrics();
  renderAgencyEmptyState();
  renderDashboardModern();
}

function renderAgencyEmptyState() {
  const emptyState = document.querySelector("#agencyEmptyState");
  if (!emptyState) return;
  const isAgency = portalForUser(currentUser()) === "agency";
  const hasWorkspaceData = state.properties.length || state.tenants.length || state.tickets.length || state.documents.length || state.rentItems.length;
  emptyState.hidden = !(isAgency && !hasWorkspaceData);
}

function updateDocumentMetrics() {
  const tenantVisible = state.documents.filter((documentItem) => documentItem.visibility === "tenant").length;
  const privateDocs = state.documents.filter((documentItem) => documentItem.visibility === "private").length;
  const dueSoon = state.documents.filter((documentItem) => documentStatus(documentItem).label === "Due soon").length;

  setText("documentTotal", state.documents.length);
  setText("documentMeta", `${tenantVisible} tenant-visible`);
  setText("documentsPageTotal", state.documents.length);
  setText("documentsTenantVisible", tenantVisible);
  setText("documentsDueSoon", dueSoon);
  setText("documentsPrivate", privateDocs);
}

function tenantsForProperty(property) {
  return state.tenants.filter((tenant) => tenant.address === property.address && tenant.status === "active");
}

function ticketsForProperty(property) {
  return state.tickets.filter((ticket) => ticket.property === property.address);
}

function documentsForProperty(property) {
  return state.documents.filter((documentItem) => documentItem.property === property.address);
}

function rentItemsForProperty(property) {
  const tenantIds = tenantsForProperty(property).map((tenant) => tenant.id);
  return state.rentItems.filter((item) => tenantIds.includes(item.tenantId));
}

function maintenanceSpendForProperty(property) {
  return ticketsForProperty(property).reduce((sum, ticket) => {
    if (ticket.priority === "Emergency") return sum + 420;
    if (ticket.priority === "Urgent") return sum + 260;
    return sum + 140;
  }, 0);
}

function propertyFinancials(property) {
  const rentItems = rentItemsForProperty(property);
  const expected = property.monthlyRent || rentItems.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const collected = rentItems.filter((item) => item.status === "paid").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const arrears = rentItems.filter((item) => item.status === "overdue").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const maintenance = maintenanceSpendForProperty(property);
  const agencyFee = Math.round(collected * Number(property.agencyFeePercent || 0) / 100);
  const otherExpenses = Number(property.otherExpenses || 0);
  return {
    expected,
    collected,
    arrears,
    maintenance,
    agencyFee,
    otherExpenses,
    net: collected - maintenance - otherExpenses - agencyFee,
  };
}

function missingRequiredDocuments(property) {
  const docs = documentsForProperty(property);
  const required = ["Tenancy agreement", "Electrical safety certificate / EICR", "Gas safety certificate", "EPC"];
  return required.filter((type) => !docs.some((documentItem) => documentItem.type === type || documentItem.type.includes(type)));
}

function propertyNeedsAttention(property) {
  const docs = documentsForProperty(property);
  const hasCertificateAlert = docs.some((documentItem) => ["Expired", "Due soon"].includes(documentStatus(documentItem).label));
  return hasCertificateAlert || missingRequiredDocuments(property).length > 0 || rentItemsForProperty(property).some((item) => item.status === "overdue");
}

function filteredProperties() {
  return state.properties.filter((property) => {
    const tenants = tenantsForProperty(property);
    const haystack = `${property.address} ${property.postcode} ${property.type} ${property.landlord} ${property.landlordEmail || ""} ${property.landlordPhone || ""} ${tenants.map((tenant) => tenant.fullName).join(" ")}`.toLowerCase();
    const searchMatches = !propertySearch || haystack.includes(propertySearch);
    const statusMatches =
      propertyStatusFilter === "all" ||
      property.occupancy === propertyStatusFilter ||
      (propertyStatusFilter === "attention" && propertyNeedsAttention(property));
    return searchMatches && statusMatches;
  });
}

function ensurePropertyRecord(address, postcode = "") {
  if (!address || state.properties.some((property) => property.address === address)) return;
  state.properties.unshift({
    id: `PROP-${Math.floor(2000 + Math.random() * 7000)}`,
    address,
    postcode,
    type: "Managed property",
    bedrooms: 0,
    bathrooms: 0,
    landlord: "Unassigned landlord",
    landlordEmail: "",
    landlordPhone: "",
    occupancy: "occupied",
    monthlyRent: 0,
    agencyFeePercent: 10,
    otherExpenses: 0,
  });
}

function renderPropertyOptions() {
  const selects = [
    document.querySelector("#documentProperty"),
    document.querySelector("#tenantAccessPropertySelect"),
    document.querySelector("#documentPropertyFilter"),
  ];

  selects.forEach((select) => {
    if (!select) return;
    const current = select.value;
    const includeAll = select.id === "documentPropertyFilter";
    select.innerHTML = includeAll ? `<option value="all">All properties</option>` : "";
    state.properties.forEach((property) => {
      const option = document.createElement("option");
      option.value = property.address;
      option.textContent = property.address;
      select.appendChild(option);
    });
    if ([...select.options].some((option) => option.value === current)) {
      select.value = current;
    }
  });
}

function renderPropertyMetrics() {
  const occupied = state.properties.filter((property) => property.occupancy === "occupied").length;
  const certificateAlerts = state.properties.filter(propertyNeedsAttention).length;
  const totalNet = state.properties.reduce((sum, property) => sum + propertyFinancials(property).net, 0);
  document.querySelector("#propertyCount").textContent = state.properties.length;
  document.querySelector("#occupiedPropertyCount").textContent = occupied;
  document.querySelector("#propertyCertificateAlerts").textContent = certificateAlerts;
  const propertyNetTotal = document.querySelector("#propertyNetTotal");
  propertyNetTotal.textContent = kpiCurrencyDisplay(totalNet);
  propertyNetTotal.classList.toggle("negative-value", totalNet < 0);
  propertyNetTotal.classList.toggle("positive-value", totalNet > 0);
}

function splitAddressForDisplay(property) {
  const address = String(property.address || "").trim();
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);
  if (parts.length <= 1) return { addressLine: address, town: "", postcode: property.postcode || "" };
  const last = cleanAddressPartForPostcode(parts[parts.length - 1], property.postcode);
  return {
    addressLine: parts.slice(0, -1).join(", "),
    town: last,
    postcode: property.postcode || "",
  };
}

function cleanAddressPartForPostcode(value, postcode = "") {
  const text = String(value || "").trim();
  const normalised = PostcodeLookup.normaliseUkPostcode(postcode);
  if (!normalised.valid) return text.replace(/\b[A-Z]{1,2}\d[A-Z\d]?\b$/i, "").trim();
  const outwardCode = normalised.postcode.split(" ")[0];
  return text
    .replace(new RegExp(`\\b${outwardCode.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b$`, "i"), "")
    .trim()
    .replace(/,\s*$/, "");
}

function fullAddressForMap(property) {
  const parts = String(property.address || "").split(",").map((part) => cleanAddressPartForPostcode(part, property.postcode)).filter(Boolean);
  if (property.postcode) {
    const insertAt = parts.length > 1 ? parts.length - 1 : parts.length;
    parts.splice(insertAt, 0, property.postcode);
  }
  if (!parts.some((part) => /^(uk|united kingdom|england)$/i.test(part))) parts.push("United Kingdom");
  return [...new Set(parts)].join(", ");
}

function councilNameForProperty(property) {
  return property.manualCouncilName || property.detectedCouncilName || property.councilName || "";
}

function normaliseCouncilName(value) {
  return String(value || "")
    .toLowerCase()
    .replace(/^london borough of\s+/, "")
    .replace(/^royal borough of\s+/, "")
    .replace(/^city of westminster$/, "westminster")
    .replace(/\bcouncil\b/g, "")
    .replace(/&/g, "and")
    .replace(/\s+/g, " ")
    .trim();
}

function londonCouncilForName(value) {
  const normalised = normaliseCouncilName(value);
  return londonCouncilDirectory.find((council) => normaliseCouncilName(council.name) === normalised) || null;
}

function enrichCouncilLookup(lookup) {
  const directoryMatch = londonCouncilForName(lookup.councilName || lookup.adminDistrict);
  return {
    ...lookup,
    councilWebsite: lookup.councilWebsite || directoryMatch?.website || "",
    councilDirectorySource: directoryMatch ? "london_council_directory" : "",
  };
}

function councilSourceLabel(property) {
  if (property.manualCouncilName) return "manual override";
  if (property.councilSource === "postcodes_io") return "Postcodes.io";
  if (property.councilSource === "govuk") return "GOV.UK";
  return property.councilSource || "not checked";
}

function councilWebsiteUrl(property) {
  const council = councilNameForProperty(property);
  return property.councilWebsite || londonCouncilForName(council)?.website || "https://www.gov.uk/find-local-council";
}

function applyCouncilLookupToProperty(property, lookup) {
  const enrichedLookup = enrichCouncilLookup(lookup);
  property.postcode = lookup.postcode || property.postcode;
  property.detectedCouncilName = enrichedLookup.councilName || "";
  property.councilName = property.manualCouncilName || enrichedLookup.councilName || "";
  property.councilCode = enrichedLookup.councilCode || "";
  property.adminDistrict = enrichedLookup.adminDistrict || "";
  property.adminCounty = enrichedLookup.county || "";
  property.adminCountyCode = enrichedLookup.countyCode || "";
  property.parish = enrichedLookup.parish || "";
  property.region = enrichedLookup.region || "";
  property.country = enrichedLookup.country || "";
  property.longitude = enrichedLookup.longitude;
  property.latitude = enrichedLookup.latitude;
  property.councilWebsite = enrichedLookup.councilWebsite || "";
  property.councilDirectorySource = enrichedLookup.councilDirectorySource || "";
  property.councilSource = property.manualCouncilName ? "manual" : lookup.source;
  property.lastCouncilCheckedAt = enrichedLookup.lastCheckedAt;
}

function renderPropertyCouncilStatus(property = null, message = "") {
  const detected = document.querySelector("#propertyCouncilDetected");
  const meta = document.querySelector("#propertyCouncilMeta");
  const manualField = document.querySelector("#manualCouncilField");
  const manualInput = document.querySelector("#propertyManualCouncil");
  if (!detected || !meta) return;
  if (!property) {
    detected.textContent = "Enter postcode to lookup";
    meta.textContent = message || "Uses postcode lookup, not address text.";
    manualField.classList.remove("open");
    manualInput.value = "";
    return;
  }
  const councilName = councilNameForProperty(property);
  detected.textContent = councilName || "Not checked yet";
  meta.textContent = message || `${property.postcode || "No postcode"} - source: ${councilSourceLabel(property)}${property.lastCouncilCheckedAt ? ` - checked ${new Date(property.lastCouncilCheckedAt).toLocaleString("en-GB")}` : ""}`;
  manualInput.value = property.manualCouncilName || "";
  manualField.classList.toggle("open", Boolean(property.manualCouncilName || property.councilLookupFailed));
}

async function lookupCouncilForProperty(property, { force = false, persist = true } = {}) {
  const normalised = PostcodeLookup.normaliseUkPostcode(property.postcode);
  if (!normalised.valid) {
    property.councilLookupFailed = true;
    renderPropertyCouncilStatus(property, normalised.error);
    showToast(normalised.error);
    return null;
  }
  property.postcode = normalised.postcode;
  document.querySelector("#propertyPostcode").value = normalised.postcode;
  renderPropertyCouncilStatus(property, "Checking council...");
  const response = await postcodeLookupService.lookup(normalised.postcode, { force });
  if (!response.ok) {
    property.councilLookupFailed = true;
    property.councilSource = "manual";
    renderPropertyCouncilStatus(property, response.error);
    showToast(response.error);
    return null;
  }
  property.councilLookupFailed = false;
  response.result = enrichCouncilLookup(response.result);
  state.postcodeLookups[normalised.postcode] = response.result;
  applyCouncilLookupToProperty(property, response.result);
  if (persist) saveState();
  renderPropertyCouncilStatus(property);
  if (persist) renderProperties();
  renderBoroughList();
  showToast(`${property.postcode} detected as ${response.result.councilName}.`);
  return response.result;
}

function clearPropertyForm() {
  document.querySelector("#propertyForm").reset();
  document.querySelector("#propertyId").value = "";
  document.querySelector("#propertyBedrooms").value = 2;
  document.querySelector("#propertyBathrooms").value = 1;
  document.querySelector("#propertyAgencyFee").value = 10;
  document.querySelector("#propertyOtherExpenses").value = 0;
  renderPropertyCouncilStatus(null);
}

function fillPropertyForm(id) {
  const property = state.properties.find((item) => item.id === id);
  if (!property) return;
  document.querySelector("#propertyId").value = property.id;
  document.querySelector("#propertyAddress").value = property.address || "";
  document.querySelector("#propertyPostcode").value = property.postcode || "";
  document.querySelector("#propertyType").value = property.type || "";
  document.querySelector("#propertyBedrooms").value = property.bedrooms ?? 0;
  document.querySelector("#propertyBathrooms").value = property.bathrooms ?? 0;
  document.querySelector("#propertyLandlord").value = property.landlord || "";
  document.querySelector("#propertyLandlordEmail").value = property.landlordEmail || "";
  document.querySelector("#propertyLandlordPhone").value = property.landlordPhone || "";
  document.querySelector("#propertyMonthlyRent").value = property.monthlyRent || 0;
  document.querySelector("#propertyOccupancy").value = property.occupancy || "occupied";
  document.querySelector("#propertyAgencyFee").value = property.agencyFeePercent ?? 10;
  document.querySelector("#propertyOtherExpenses").value = property.otherExpenses || 0;
  renderPropertyCouncilStatus(property);
}

async function savePropertyFromForm() {
  const address = document.querySelector("#propertyAddress").value.trim();
  if (!address) {
    showToast("Add the property address first.");
    return;
  }

  const id = document.querySelector("#propertyId").value;
  const existing = state.properties.find((property) => property.id === id);
  const duplicate = state.properties.find((property) => property.address.toLowerCase() === address.toLowerCase() && property.id !== id);
  if (duplicate) {
    showToast("That property already exists in the agency portfolio.");
    return;
  }

  const property = existing || { id: `PROP-${Math.floor(2000 + Math.random() * 7000)}` };
  const previousAddress = property.address;
  property.address = address;
  const postcodeValue = document.querySelector("#propertyPostcode").value.trim();
  const normalisedPostcode = postcodeValue ? PostcodeLookup.normaliseUkPostcode(postcodeValue) : { valid: true, postcode: "" };
  if (!normalisedPostcode.valid) {
    property.councilLookupFailed = true;
    renderPropertyCouncilStatus(property, normalisedPostcode.error);
    showToast(normalisedPostcode.error);
    return;
  }
  const previousPostcode = property.postcode;
  property.postcode = normalisedPostcode.postcode;
  property.type = document.querySelector("#propertyType").value.trim() || "Managed property";
  property.bedrooms = Number(document.querySelector("#propertyBedrooms").value || 0);
  property.bathrooms = Number(document.querySelector("#propertyBathrooms").value || 0);
  property.landlord = document.querySelector("#propertyLandlord").value.trim() || "Unassigned landlord";
  property.landlordEmail = document.querySelector("#propertyLandlordEmail").value.trim();
  property.landlordPhone = document.querySelector("#propertyLandlordPhone").value.trim();
  property.monthlyRent = Number(document.querySelector("#propertyMonthlyRent").value || 0);
  property.occupancy = document.querySelector("#propertyOccupancy").value;
  property.agencyFeePercent = Number(document.querySelector("#propertyAgencyFee").value || 0);
  property.otherExpenses = Number(document.querySelector("#propertyOtherExpenses").value || 0);
  property.manualCouncilName = document.querySelector("#propertyManualCouncil").value.trim();
  if (property.manualCouncilName) {
    property.councilName = property.manualCouncilName;
    property.councilSource = "manual";
  }
  if (!property.manualCouncilName && pendingPropertyCouncilLookup?.postcode === property.postcode) {
    applyCouncilLookupToProperty(property, pendingPropertyCouncilLookup);
    pendingPropertyCouncilLookup = null;
  }

  if (existing && previousAddress && previousAddress !== property.address) {
    state.tenants.forEach((tenant) => {
      if (tenant.address === previousAddress) tenant.address = property.address;
    });
    state.tickets.forEach((ticket) => {
      if (ticket.property === previousAddress) ticket.property = property.address;
    });
    state.documents.forEach((documentItem) => {
      if (documentItem.property === previousAddress) documentItem.property = property.address;
    });
  }

  if (!existing) state.properties.unshift(property);
  selectedPropertyId = property.id;
  activeDetailTab = "overview";
  if (property.postcode && property.postcode !== previousPostcode && !property.manualCouncilName) {
    await lookupCouncilForProperty(property, { force: true });
  }
  saveState();
  renderProperties();
  renderTenants();
  renderTickets();
  renderDocuments();
  renderFinance();
  renderDashboardAttention();
  renderTenantAccessSummary();
  showToast(`${property.address} saved to the property dashboard.`);
}

function removeProperty(id) {
  const property = state.properties.find((item) => item.id === id);
  if (!property) return;
  const linkedTenants = tenantsForProperty(property).length;
  const linkedTickets = ticketsForProperty(property).length;
  const linkedDocs = documentsForProperty(property).length;
  if (linkedTenants || linkedTickets || linkedDocs) {
    showToast("This property has tenants, repairs, or documents attached. Reassign or clear them before removing it.");
    return;
  }

  state.properties = state.properties.filter((item) => item.id !== id);
  selectedPropertyId = "";
  activeDetailTab = "overview";
  saveState();
  clearPropertyForm();
  renderProperties();
  showToast(`${property.address} removed from the agency portfolio.`);
}

function togglePropertyOccupancy(id) {
  const property = state.properties.find((item) => item.id === id);
  if (!property) return;
  property.occupancy = property.occupancy === "vacant" ? "occupied" : "vacant";
  saveState();
  renderProperties();
  fillPropertyForm(property.id);
  showToast(`${property.address} marked as ${property.occupancy}.`);
}

function renderProperties() {
  renderPropertyOptions();
  renderPropertyMetrics();
  propertyList.innerHTML = "";
  const properties = filteredProperties();
  if (!properties.length) {
    propertyList.innerHTML = `<div class="empty-state">No properties match this search.</div>`;
  } else {
    properties.forEach((property) => {
      const tickets = ticketsForProperty(property).filter((ticket) => ticket.status !== "Completed");
      const financials = propertyFinancials(property);
      const displayAddress = splitAddressForDisplay(property);
      const row = document.createElement("div");
      row.className = `tenant-row property-row${property.id === selectedPropertyId ? " selected" : ""}`;
      row.innerHTML = `
        ${propertyThumbnailMarkup(property, displayAddress)}
        <div class="property-row-body">
          <div class="property-row-heading">
            <div>
              <strong>${displayAddress.addressLine || property.address}</strong>
              <small>${[displayAddress.postcode, displayAddress.town].filter(Boolean).join(" - ") || "Postcode not added"}</small>
            </div>
          </div>
          <div class="property-row-chips">
            <span class="status-chip ${property.occupancy === "occupied" ? "good" : ""}">${property.occupancy}</span>
            <span>${money(property.monthlyRent || financials.expected)} rent</span>
            <span>${tickets.length} open repairs</span>
          </div>
        </div>
        <span class="property-card-arrow" aria-hidden="true">-&gt;</span>
      `;
      row.addEventListener("click", (event) => {
        if (event.target.closest("button, summary, details")) return;
        selectProperty(property.id);
      });
      propertyList.appendChild(row);
    });
  }
  renderPropertyDetail();
  if (selectedPropertyId) fillPropertyForm(selectedPropertyId);
}

function propertyThumbnailLabel(property, displayAddress) {
  const address = displayAddress.addressLine || property.address || "";
  const flatMatch = address.match(/\b(flat|apartment|apt)\s*(\d+[a-z]?)/i);
  if (flatMatch) return `F${flatMatch[2].toUpperCase()}`;
  const firstNumber = address.match(/\b(\d+[a-z]?)\b/i)?.[1];
  const firstWord = address.match(/[A-Za-z]+/)?.[0]?.[0] || "P";
  return `${firstWord}${firstNumber || ""}`.slice(0, 3).toUpperCase();
}

function propertyThumbnailMarkup(property, displayAddress) {
  const imageUrl = property.imageUrl || property.image || property.thumbnailUrl || "";
  if (imageUrl) {
    return `<div class="property-thumb has-image"><img alt="" src="${imageUrl}" /></div>`;
  }
  return `<div class="property-thumb" aria-hidden="true"><span>${propertyThumbnailLabel(property, displayAddress)}</span></div>`;
}

function openPropertyMap(property) {
  const fullAddress = fullAddressForMap(property);
  const query = encodeURIComponent(fullAddress);
  if (!fullAddress.trim()) {
    showToast("Add the full property address and postcode first.");
    return;
  }
  window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank", "noopener");
}

function selectProperty(id) {
  selectedPropertyId = id;
  activeDetailTab = "overview";
  renderProperties();
  fillPropertyForm(id);
}

function selectedProperty() {
  return state.properties.find((property) => property.id === selectedPropertyId) || null;
}

function renderPropertyDetail() {
  const property = selectedProperty();
  if (!property) {
    propertyDetail.innerHTML = `<div class="empty-state">Select a property from the list to see landlord, tenants, finance, document, and repair details here.</div>`;
    return;
  }

  const validTabs = ["overview", "tenants", "repairs", "documents", "financials"];
  if (!validTabs.includes(activeDetailTab)) activeDetailTab = "overview";

  const tenants = tenantsForProperty(property);
  const tickets = ticketsForProperty(property);
  const docs = documentsForProperty(property);
  const financials = propertyFinancials(property);
  const displayAddress = splitAddressForDisplay(property);
  const councilName = councilNameForProperty(property);
  const openRepairCount = tickets.filter((ticket) => !["Completed", "Closed", "Cancelled"].includes(ticket.status)).length;

  propertyDetail.innerHTML = `
    <div class="property-detail-stack">
      <div class="property-hero">
        <div class="property-hero-main">
          <span>Selected property</span>
          <h3>${displayAddress.addressLine || property.address}</h3>
          <p>${[property.postcode, displayAddress.town].filter(Boolean).join(" - ") || "Postcode not added"}</p>
          <div class="property-hero-meta">
            <span>Landlord: <b>${property.landlord || "Not added"}</b></span>
            <span>Council: <b>${councilName || "Not checked"}</b></span>
            <span>${property.type || "Property"} - ${property.bedrooms || 0} bed - ${property.bathrooms || 0} bath</span>
          </div>
        </div>
      </div>
      <div class="property-summary-strip">
        <div><span>Status</span><strong>${property.occupancy}</strong></div>
        <div><span>Tenants</span><strong>${tenants.length}</strong></div>
        <div><span>Rent</span><strong>${money(property.monthlyRent || financials.expected)}</strong></div>
        <div><span>Repairs</span><strong>${openRepairCount}</strong></div>
      </div>
      <div class="property-tabs" role="tablist" aria-label="Property sections">
        ${validTabs.map((tab) => `<button class="${activeDetailTab === tab ? "active" : ""}" type="button" data-property-tab="${tab}">${tab[0].toUpperCase()}${tab.slice(1)}</button>`).join("")}
      </div>
      <div class="property-tab-panels">${renderActivePropertyDetailTab({
        property,
        tenants,
        tickets,
        docs,
        financials,
        displayAddress,
        councilName,
        openRepairCount,
      })}</div>
    </div>
  `;

  document.querySelectorAll("[data-property-tab]").forEach((button) => {
    button.addEventListener("click", () => {
      activeDetailTab = button.dataset.propertyTab;
      renderPropertyDetail();
    });
  });

  document.querySelector("#propertyDetailMapBtn")?.addEventListener("click", () => openPropertyMap(property));
  document.querySelector("#propertyDetailLookupCouncilBtn")?.addEventListener("click", async () => {
    fillPropertyForm(property.id);
    await lookupCouncilForProperty(property, { force: true });
  });
  document.querySelector("#addTenantToPropertyBtn")?.addEventListener("click", () => prepareTenantFormForProperty(property));
  document.querySelectorAll("[data-open-property-repair]").forEach((button) => {
    button.addEventListener("click", () => openRepairFromAgencyTrades(button.dataset.openPropertyRepair));
  });
  document.querySelectorAll("[data-edit-property-tenant]").forEach((button) => {
    button.addEventListener("click", () => {
      fillTenantForm(button.dataset.editPropertyTenant);
      showPanel("tenantsPanel");
    });
  });
  document.querySelectorAll("[data-toggle-property-tenant]").forEach((button) => {
    button.addEventListener("click", () => toggleTenancy(button.dataset.togglePropertyTenant));
  });
  document.querySelector("#propertyDetailEditBtn")?.addEventListener("click", () => {
    fillPropertyForm(property.id);
    document.querySelector("#propertyFormPanel").open = true;
    document.querySelector("#propertyFormPanel").scrollIntoView({ behavior: "smooth", block: "center" });
  });
  document.querySelector("#propertyDetailOccupancyBtn")?.addEventListener("click", () => togglePropertyOccupancy(property.id));
  document.querySelector("#propertyDetailUploadBtn")?.addEventListener("click", () => {
    document.querySelector("#propertyUploadPanel").open = true;
    const uploadInput = document.querySelector("#propertyLayoutFile");
    uploadInput.scrollIntoView({ behavior: "smooth", block: "center" });
    uploadInput.click();
  });
  document.querySelector("#propertyDetailRemoveBtn")?.addEventListener("click", () => removeProperty(property.id));
}

function renderActivePropertyDetailTab(context) {
  if (activeDetailTab === "tenants") return renderPropertyTenantsTab(context);
  if (activeDetailTab === "repairs") return renderPropertyRepairsTab(context);
  if (activeDetailTab === "documents") return renderPropertyDocumentsTab(context);
  if (activeDetailTab === "financials") return renderPropertyFinancialsTab(context);
  return renderPropertyOverviewTab(context);
}

function renderPropertyOverviewTab({ property, displayAddress, councilName }) {
  return `
    <section class="property-tab-panel active" data-property-panel="overview">
      <div class="property-mini-section">
        <div class="section-heading compact-heading">
          <div>
            <h3>Overview</h3>
            <p>Core property record and local authority details.</p>
          </div>
          <div class="row-actions">
            <button type="button" id="propertyDetailEditBtn">Edit details</button>
            <button type="button" id="propertyDetailMapBtn">Map</button>
            <button type="button" id="propertyDetailOccupancyBtn">${property.occupancy === "vacant" ? "Mark occupied" : "Mark vacant"}</button>
            <button type="button" id="propertyDetailRemoveBtn">Remove</button>
          </div>
        </div>
        <div class="detail-grid">
          <div><span>Address</span><strong>${displayAddress.addressLine || property.address}</strong></div>
          <div><span>Postcode / town</span><strong>${[property.postcode, displayAddress.town].filter(Boolean).join(" - ") || "Not added"}</strong></div>
          <div><span>Property type</span><strong>${property.type || "Not added"}</strong></div>
          <div><span>Occupancy</span><strong>${property.occupancy}</strong></div>
          <div><span>Landlord</span><strong>${property.landlord || "Not added"}</strong></div>
          <div><span>Council</span><strong>${councilName || "Not checked yet"}</strong></div>
        </div>
      </div>
      <div class="property-mini-section">
        <div class="section-heading compact-heading">
          <div>
            <h3>Council / local authority</h3>
          </div>
          <div class="row-actions council-action-row">
            <button class="secondary-inline council-action-button council-action-primary" type="button" id="propertyDetailLookupCouncilBtn">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 21l-4.3-4.3M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4ZM12 7v4l2.5 1.5" /></svg>
              Detect council
            </button>
            <a class="secondary-inline external-link council-action-button council-action-secondary" href="${councilWebsiteUrl(property)}" target="_blank" rel="noopener">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 3h7v7M21 3l-9 9M11 5H5a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-6" /></svg>
              Council website
            </a>
          </div>
        </div>
        <details class="property-subdetails">
          <summary>Lookup details</summary>
          <div class="detail-grid">
            <div><span>Source</span><strong>${councilSourceLabel(property)}</strong></div>
            <div><span>Website</span><strong>${councilWebsiteUrl(property) === "https://www.gov.uk/find-local-council" ? "Use GOV.UK checker" : councilWebsiteUrl(property).replace("https://", "")}</strong></div>
            <div><span>Last checked</span><strong>${property.lastCouncilCheckedAt ? new Date(property.lastCouncilCheckedAt).toLocaleString("en-GB") : "Not checked"}</strong></div>
            <div><span>Detected value</span><strong>${property.detectedCouncilName || "None"}</strong></div>
          </div>
        </details>
      </div>
    </section>
  `;
}

function renderPropertyTenantsTab({ tenants }) {
  return `
    <section class="property-tab-panel active" data-property-panel="tenants">
      <div class="property-mini-section">
        <div class="section-heading compact-heading">
          <div>
            <h3>Tenants</h3>
            <p>People currently connected to this property.</p>
          </div>
          <button class="secondary-inline" type="button" id="addTenantToPropertyBtn">Add tenant</button>
        </div>
        ${
          tenants.length
            ? tenants.map((tenant) => {
                const rent = rentForTenant(tenant.id);
                return `
                  <div class="property-tenant-card">
                    <div>
                      <strong>${tenant.fullName}</strong>
                      <span><a href="${phoneHref(tenant.phone)}">Phone: ${tenant.phone}</a></span>
                      <span><a href="mailto:${tenant.email}">Email: ${tenant.email}</a></span>
                      <span>${tenant.postcode} - started ${formatDate(tenant.tenancyStart)}${tenant.tenancyEnd ? ` - ends ${formatDate(tenant.tenancyEnd)}` : ""}</span>
                      <span>${rent ? `${money(rent.amount)} due ${formatDate(rent.dueDate)} - ${rent.status}` : "No rent schedule yet"}</span>
                    </div>
                    <div class="row-actions">
                      <button type="button" data-edit-property-tenant="${tenant.id}">Edit</button>
                      <button type="button" data-toggle-property-tenant="${tenant.id}">${tenant.status === "active" ? "End tenancy" : "Reactivate"}</button>
                    </div>
                  </div>
                `;
              }).join("")
            : `<div class="empty-state">No tenants.</div>`
        }
      </div>
    </section>
  `;
}

function renderPropertyRepairsTab({ tickets }) {
  return `
    <section class="property-tab-panel active" data-property-panel="repairs">
      <div class="property-mini-section">
        <div class="section-heading compact-heading">
          <div>
            <h3>Repairs</h3>
            <p>Maintenance requests linked to this property.</p>
          </div>
        </div>
        ${tickets.length ? tickets.map((ticket) => `
          <button class="data-row" type="button" data-open-property-repair="${ticket.id}">
            <span><strong>${ticket.title}</strong><small>${ticket.status} - ${ticket.contractor}</small></span>
            <span>${ticket.priority}</span>
            <span>${ticket.trade}</span>
            <span>Open</span>
          </button>
        `).join("") : `<div class="empty-state">No repairs.</div>`}
      </div>
    </section>
  `;
}

function renderPropertyDocumentsTab({ property, docs }) {
  const layoutDocs = docs.filter((documentItem) => ["Layout plan", "Floor plan"].includes(documentItem.type));
  const missing = missingRequiredDocuments(property);
  const certificateAlerts = docs.filter((documentItem) => ["Expired", "Due soon"].includes(documentStatus(documentItem).label));
  return `
    <section class="property-tab-panel active" data-property-panel="documents">
      <div class="property-mini-section">
        <div class="section-heading compact-heading">
          <div>
            <h3>Documents</h3>
            <p>Certificates, layout plans, and property-level files.</p>
          </div>
          <button type="button" id="propertyDetailUploadBtn">Upload layout / plan</button>
        </div>
        ${docs.length ? docs.map((documentItem) => {
          const status = documentStatus(documentItem);
          return `<div class="document-row compact-document-row"><span class="doc-icon">${documentInitial(documentItem.type)}</span><div><strong>${documentItem.type}</strong><small>${documentItem.fileName} - ${documentItem.visibility === "tenant" ? "tenant-visible" : "agency only"}</small></div><span class="status-chip ${status.className}">${status.label}</span></div>`;
        }).join("") : `<div class="empty-state">No documents.</div>`}
        ${layoutDocs.length ? "" : `<div class="empty-state">No layout plan uploaded yet.</div>`}
        ${certificateAlerts.length ? `<p><strong>Certificate alerts:</strong> ${certificateAlerts.map((documentItem) => documentItem.type).join(", ")}</p>` : ""}
        ${missing.length ? `<p><strong>Missing:</strong> ${missing.join(", ")}</p>` : ""}
      </div>
    </section>
  `;
}

function renderPropertyFinancialsTab({ financials }) {
  return `
    <section class="property-tab-panel active" data-property-panel="financials">
      <div class="property-mini-section">
        <div class="section-heading compact-heading">
          <div>
            <h3>Financials</h3>
            <p>Gross rent collected - maintenance spend - other expenses - agency fees = estimated net position.</p>
          </div>
        </div>
        <div class="detail-grid">
          <div><span>Expected</span><strong>${money(financials.expected)}</strong></div>
          <div><span>Collected</span><strong>${money(financials.collected)}</strong></div>
          <div><span>Arrears</span><strong>${money(financials.arrears)}</strong></div>
          <div><span>Net</span><strong>${money(financials.net)}</strong></div>
        </div>
      </div>
    </section>
  `;
}

function syncInlinePropertyFieldsToMainForm() {
  const fields = [
    ["propertyAddress", "inlinePropertyAddress"],
    ["propertyPostcode", "inlinePropertyPostcode"],
    ["propertyType", "inlinePropertyType"],
    ["propertyOccupancy", "inlinePropertyOccupancy"],
    ["propertyLandlord", "inlinePropertyLandlord"],
    ["propertyMonthlyRent", "inlinePropertyRent"],
  ];
  fields.forEach(([targetId, sourceId]) => {
    const target = document.querySelector(`#${targetId}`);
    const source = document.querySelector(`#${sourceId}`);
    if (target && source) target.value = source.value;
  });
}

async function saveInlinePropertyDetails(propertyId, { lookupCouncil = false } = {}) {
  const property = state.properties.find((item) => item.id === propertyId);
  if (!property) return;
  fillPropertyForm(propertyId);
  syncInlinePropertyFieldsToMainForm();
  await savePropertyFromForm();
  const updated = state.properties.find((item) => item.id === propertyId);
  if (lookupCouncil && updated) await lookupCouncilForProperty(updated, { force: true });
}

function prepareTenantFormForProperty(property) {
  document.querySelector("#tenantFullName").value = "";
  document.querySelector("#tenantPhone").value = "";
  document.querySelector("#tenantEmail").value = "";
  document.querySelector("#tenantAddress").value = property.address;
  document.querySelector("#tenantPostcode").value = property.postcode || "";
  document.querySelector("#tenantStartDate").value = new Date().toISOString().slice(0, 10);
  document.querySelector("#tenantAccessPropertySelect").value = property.address;
  document.querySelector("#tenantCanViewDocs").checked = true;
  showPanel("tenantsPanel");
  showToast(`New tenant form ready for ${property.address}.`);
}

async function uploadPropertyLayout() {
  const property = selectedProperty();
  const file = document.querySelector("#propertyLayoutFile").files[0];
  if (!property) {
    showToast("Click a property first, then upload the layout or plan.");
    return;
  }
  if (!file) {
    showToast("Choose a PDF or image to upload.");
    return;
  }
  const isAllowed = file.type === "application/pdf" || file.type.startsWith("image/");
  if (!isAllowed) {
    showToast("Please upload a PDF or image file.");
    return;
  }

  const type = document.querySelector("#propertyLayoutType").value;
  const fileDataUrl = await readFileAsDataUrl(file);
  const newDocument = {
    id: `DOC-${Math.floor(3000 + Math.random() * 6000)}`,
    type,
    property: property.address,
    fileName: file.name,
    issueDate: "",
    validityYears: "",
    expiry: "",
    visibility: document.querySelector("#propertyLayoutVisibility").value,
    notes: "Property-level upload from the Properties dashboard.",
    uploadedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    fileDataUrl,
    fileMime: file.type || "application/pdf",
  };
  state.documents.unshift(newDocument);
  saveState();
  document.querySelector("#propertyLayoutFile").value = "";
  renderProperties();
  renderDocuments();
  renderDashboardAttention();
  showToast(`${type} uploaded for ${property.address}.`);
}

function filteredDocuments() {
  return state.documents.filter((documentItem) => {
    const propertyMatches = documentPropertyFilter === "all" || documentItem.property === documentPropertyFilter;
    const visibilityMatches = documentVisibilityFilter === "all" || documentItem.visibility === documentVisibilityFilter;
    const status = documentStatus(documentItem).label.toLowerCase();
    const statusMatches =
      documentStatusFilter === "all" ||
      (documentStatusFilter === "due" && status === "due soon") ||
      (documentStatusFilter === "stored" && status === "stored") ||
      status === documentStatusFilter;
    const haystack = `${documentItem.type} ${documentItem.property} ${documentItem.fileName} ${documentItem.notes}`.toLowerCase();
    const searchMatches = !documentSearch || haystack.includes(documentSearch);
    return propertyMatches && visibilityMatches && statusMatches && searchMatches;
  });
}

function documentStatus(documentItem) {
  if (!documentItem.expiry) return { label: "Stored", className: "good" };
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const expiry = new Date(`${documentItem.expiry}T00:00:00`);
  const daysUntilExpiry = Math.ceil((expiry - today) / 86400000);
  if (daysUntilExpiry < 0) return { label: "Expired", className: "urgent" };
  if (daysUntilExpiry <= 30) return { label: "Due soon", className: "warning" };
  return { label: "Valid", className: "good" };
}

function documentInitial(type) {
  if (type.includes("Gas")) return "G";
  if (type.includes("Electrical") || type.includes("EICR")) return "E";
  if (type.includes("Tenancy")) return "T";
  if (type.includes("Deposit")) return "D";
  if (type.includes("Inventory")) return "I";
  if (type.includes("EPC")) return "P";
  return "F";
}

function documentRow(documentItem, tenantView = false) {
  const status = documentStatus(documentItem);
  const row = document.createElement("div");
  row.className = "document-row";
  row.innerHTML = `
    <span class="doc-icon">${documentInitial(documentItem.type)}</span>
    <div>
      <strong>${documentItem.type}</strong>
      <small>${documentItem.property}</small>
      <small>${documentItem.fileName} - ${documentItem.visibility === "tenant" ? "tenant-visible" : "agency only"}</small>
      <small>${documentItem.expiry ? `expires ${formatDate(documentItem.expiry)}` : "no expiry date"}${documentItem.notes ? ` - ${documentItem.notes}` : ""}</small>
    </div>
    <span class="status-chip ${status.className}">${status.label}</span>
    <button class="document-action" type="button">View</button>
  `;
  row.querySelector("button").addEventListener("click", () => openDocument(documentItem, tenantView));
  return row;
}

function renderDocuments() {
  documentList.innerHTML = "";
  const documents = filteredDocuments();
  if (!documents.length) {
    documentList.innerHTML = `<div class="empty-state">No documents match this filter.</div>`;
  } else {
    documents.forEach((documentItem) => documentList.appendChild(documentRow(documentItem)));
  }
  renderTenantDocuments();
  updateDocumentMetrics();
}

function renderTenantDocuments() {
  tenantDocumentList.innerHTML = "";
  const user = currentUser();
  const tenant = authorisedTenant();
  if (user.type === "tenant" && !tenant) {
    tenantDocumentList.innerHTML = `<div class="empty-state">No property assigned yet. Contact your agency.</div>`;
    return;
  }
  const tenantVisibleDocs = state.documents.filter((documentItem) => {
    if (documentItem.visibility !== "tenant") return false;
    if (user.type !== "tenant") return true;
    if (tenant.canViewDocs === false) return false;
    return documentItem.property === tenant.address;
  });
  if (!tenantVisibleDocs.length) {
    tenantDocumentList.innerHTML = `<div class="empty-state">No tenant-visible documents yet.</div>`;
    return;
  }
  tenantVisibleDocs.forEach((documentItem) => {
    const status = documentStatus(documentItem);
    const row = document.createElement("button");
    row.className = "tenant-list-card";
    row.type = "button";
    row.innerHTML = `
      <span class="tenant-list-icon">${documentInitial(documentItem.type)}</span>
      <span>
        <strong>${documentItem.type}</strong>
        <small>${documentItem.fileName || "Document"}${documentItem.expiry ? ` - expires ${formatDate(documentItem.expiry)}` : ""}</small>
      </span>
      <em class="status-chip ${status.className}">${status.label}</em>
    `;
    row.addEventListener("click", () => openDocument(documentItem, true));
    tenantDocumentList.appendChild(row);
  });
}

function renderTenantAccessSummary() {
  const tenant = authorisedTenant();
  const tenantDocs = state.documents.filter((documentItem) => documentItem.visibility === "tenant" && documentItem.property === tenant?.address);
  const tenantRepairs = state.tickets.filter((ticket) => ticket.property === tenant?.address && !["Completed", "Closed", "Cancelled"].includes(ticket.status));
  const rent = rentForTenant(tenant?.id);
  const property = state.properties.find((item) => item.address === tenant?.address);
  const agencyContact = property?.landlord ? `Agency / ${property.landlord}` : "Agency";
  setText("tenantAccessName", tenant?.fullName || "No tenant profile assigned");
  setText("tenantAccessEmail", tenant?.email || "-");
  setText("tenantAccessProperty", tenant?.address || "No property assigned yet. Contact your agency.");
  setText("tenantAccessStatus", tenant ? (tenant.status === "active" ? "Active tenancy" : "Tenancy ended") : "No property assigned yet. Contact your agency.");
  setText("tenantPropertyAddress", tenant?.address || "No property assigned yet. Contact your agency.");
  setText("tenantPropertyPostcode", tenant?.postcode || "No postcode added");
  setText("tenantRentAmount", rent ? kpiCurrencyDisplay(rent.amount) : "No schedule");
  setText("tenantRentDueDate", rent ? formatDate(rent.dueDate) : "No schedule");
  setText("tenantAgencyContact", agencyContact);
  setText("tenantRentStatus", rent ? rent.status : "No schedule");
  setText("tenantRentSummary", rent ? kpiCurrencyDisplay(rent.amount) : "No schedule");
  setText("tenantRentMeta", rent ? `Due ${formatDate(rent.dueDate)}` : "No rent due date added yet.");
  setValue("tenantResolvedProperty", tenant?.address || "No property assigned yet");
  setValue("tenantName", tenant?.fullName || "");
  if (!tenant) {
    setValue("issueDescription", "");
    setValue("accessNotes", "");
    setValue("availabilityWindow", "");
  }
  if (!tenant) {
    pendingAvailabilityWindows = [];
    renderAvailabilityDraft();
    const preview = document.querySelector("#photoPreview");
    if (preview) preview.innerHTML = `<div>No files selected</div>`;
  }
  const repairSubmit = document.querySelector("#repairForm button[type='submit']");
  if (repairSubmit) {
    repairSubmit.disabled = !tenant;
    repairSubmit.classList.toggle("disabled-button", !tenant);
  }
  document.querySelectorAll("[data-tenant-report-focus]").forEach((button) => {
    button.disabled = !tenant;
    button.classList.toggle("disabled-button", !tenant);
  });
  setText("tenantCardProperty", tenant?.postcode || "Active tenancy");
  setText("tenantCardDocuments", `${tenantDocs.length} available`);
  setText("tenantCardRepairs", `${tenantRepairs.length} open`);
  setText("tenantCardPayments", rent ? `${money(rent.amount)} ${rent.status}` : "No schedule");
  renderTenantRepairCards(tenantRepairs);
  renderTenantUpdates(tenant);
}

function renderTenantRepairCards(repairs) {
  const list = document.querySelector("#tenantRepairList");
  if (!list) return;
  if (!repairs.length) {
    list.innerHTML = `<div class="empty-state">No open repairs for your home.</div>`;
    return;
  }
  list.innerHTML = repairs.map((ticket) => `
    <article class="tenant-list-card">
      <span class="tenant-list-icon">R</span>
      <span>
        <strong>${ticket.title}</strong>
        <small>${ticket.priority} - reported ${ticket.createdAt || "recently"}</small>
        <small>${ticket.appointment?.confirmedStart ? `Next visit: ${ticket.appointment.confirmedStart}` : ticket.appointment?.proposedStart ? `Proposed visit: ${ticket.appointment.proposedStart}` : "Next update from agency"}</small>
      </span>
      <em class="status-chip ${statusClass(ticket)}">${ticket.status}</em>
    </article>
  `).join("");
}

function renderTenantUpdates(tenant) {
  const list = document.querySelector("#tenantUpdatesList");
  if (!list) return;
  if (currentUser().type === "tenant" && !tenant) {
    list.innerHTML = `<div class="empty-state">No property assigned yet. Contact your agency.</div>`;
    return;
  }
  const updates = state.notifications
    .filter((notification) => notification.tenantId === tenant?.id)
    .slice(0, 4);
  if (!updates.length) {
    list.innerHTML = `<div class="empty-state">No messages yet.</div>`;
    return;
  }
  list.innerHTML = updates.map((notification) => `
    <article class="tenant-list-card">
      <span class="tenant-list-icon">M</span>
      <span>
        <strong>${notification.subject}</strong>
        <small>${notification.message}</small>
        <small>${notification.createdAt || "Recently"}</small>
      </span>
      <em class="status-chip ${notification.priority === "urgent" ? "urgent" : ""}">${notification.status || "update"}</em>
    </article>
  `).join("");
}

function landlordPropertiesForCurrentUser() {
  const user = currentUser();
  if (user.type !== "landlord") return [];
  const email = String(user.email || "").trim().toLowerCase();
  const name = String(user.fullName || "").trim().toLowerCase();
  return state.properties.filter((property) => {
    const landlordEmail = String(property.landlordEmail || "").trim().toLowerCase();
    const landlordName = String(property.landlord || "").trim().toLowerCase();
    return Boolean((email && landlordEmail === email) || (name && landlordName === name));
  });
}

function landlordScopedTenants(properties) {
  const propertyAddresses = new Set(properties.map((property) => property.address));
  return state.tenants.filter((tenant) => propertyAddresses.has(tenant.address));
}

function landlordScopedTickets(properties) {
  const propertyAddresses = new Set(properties.map((property) => property.address));
  return state.tickets.filter((ticket) => propertyAddresses.has(ticket.property));
}

function landlordScopedDocuments(properties) {
  const propertyAddresses = new Set(properties.map((property) => property.address));
  return state.documents.filter((documentItem) => propertyAddresses.has(documentItem.property));
}

function landlordScopedRentItems(properties) {
  const tenantIds = new Set(landlordScopedTenants(properties).map((tenant) => tenant.id));
  return state.rentItems.filter((item) => tenantIds.has(item.tenantId));
}

function setListOrEmpty(id, items, emptyMessage, rowMarkup) {
  const list = document.querySelector(`#${id}`);
  if (!list) return;
  list.innerHTML = items.length ? items.map(rowMarkup).join("") : `<div class="empty-state">${emptyMessage}</div>`;
}

function renderLandlordPortal() {
  const properties = landlordPropertiesForCurrentUser();
  const repairs = landlordScopedTickets(properties);
  const documents = landlordScopedDocuments(properties);
  const rentItems = landlordScopedRentItems(properties);
  const invoices = repairs.filter((ticket) => ticket.invoiceFile);
  const contractors = repairs.filter((ticket) => ticket.contractor || ticket.contractorEmail);
  const messages = state.notifications.filter((notification) => {
    const tenant = state.tenants.find((item) => item.id === notification.tenantId);
    return tenant && properties.some((property) => property.address === tenant.address);
  });
  const expectedRent = properties.reduce((sum, property) => sum + Number(property.monthlyRent || 0), 0);
  const collectedRent = rentItems.filter((item) => item.status === "paid").reduce((sum, item) => sum + Number(item.amount || 0), 0);

  const emptyState = document.querySelector("#landlordEmptyState");
  if (emptyState) emptyState.hidden = properties.length > 0;
  const summary = document.querySelector("#landlordSummaryGrid");
  if (summary) {
    summary.innerHTML = properties.length ? `
      <div><span>Assigned properties</span><strong>${properties.length}</strong></div>
      <div><span>Open repairs</span><strong>${repairs.filter((ticket) => !["Closed", "Cancelled", "Completed"].includes(ticket.status)).length}</strong></div>
      <div><span>Expected rent</span><strong>${money(expectedRent)}</strong></div>
      <div><span>Collected rent</span><strong>${money(collectedRent)}</strong></div>
    ` : "";
  }

  setListOrEmpty("landlordPropertyList", properties, "No properties assigned yet.", (property) => {
    const financials = propertyFinancials(property);
    return `
      <div class="tenant-row">
        <div>
          <strong>${escapeHtml(property.address)}</strong>
          <small>${escapeHtml(property.postcode || "No postcode")} - ${escapeHtml(property.occupancy || "unknown")}</small>
          <small>${escapeHtml(property.type || "Property")} - net ${money(financials.net)}</small>
        </div>
        <span class="status-chip ${property.occupancy === "occupied" ? "good" : "warning"}">${escapeHtml(property.occupancy || "unknown")}</span>
      </div>
    `;
  });
  setListOrEmpty("landlordRepairList", repairs, "No repairs assigned yet.", (ticket) => `
    <div class="tenant-row">
      <div><strong>${escapeHtml(ticket.title)}</strong><small>${escapeHtml(ticket.property)}</small><small>${escapeHtml(ticket.status)} - ${escapeHtml(ticket.contractor || "Unassigned")}</small></div>
      <span class="status-chip ${statusClass(ticket)}">${escapeHtml(ticket.priority)}</span>
    </div>
  `);
  setListOrEmpty("landlordDocumentList", documents, "No landlord property documents yet.", (documentItem) => {
    const status = documentStatus(documentItem);
    return `
      <div class="tenant-row">
        <div><strong>${escapeHtml(documentItem.type)}</strong><small>${escapeHtml(documentItem.property)}</small><small>${escapeHtml(documentItem.fileName || "Document")}</small></div>
        <span class="status-chip ${status.className}">${status.label}</span>
      </div>
    `;
  });
  setListOrEmpty("landlordFinancialList", rentItems, "No financial records assigned yet.", (item) => {
    const tenant = state.tenants.find((tenantItem) => tenantItem.id === item.tenantId);
    return `
      <div class="tenant-row">
        <div><strong>${escapeHtml(tenant?.fullName || "Tenant")}</strong><small>${escapeHtml(tenant?.address || "")}</small><small>${money(item.amount)} due ${formatDate(item.dueDate)}</small></div>
        <span class="status-chip ${rentStatusClass(item.status)}">${escapeHtml(item.status)}</span>
      </div>
    `;
  });
  setListOrEmpty("landlordInvoiceList", invoices, "No invoices assigned yet.", (ticket) => `
    <div class="tenant-row">
      <div><strong>${escapeHtml(ticket.invoiceFile)}</strong><small>${escapeHtml(ticket.title)} - ${escapeHtml(ticket.property)}</small><small>${money(ticket.actualCost || ticket.estimatedCost || 0)}</small></div>
      <span class="status-chip">${escapeHtml(ticket.status)}</span>
    </div>
  `);
  setListOrEmpty("landlordTradesList", contractors, "No contractor updates yet.", (ticket) => `
    <div class="tenant-row">
      <div><strong>${escapeHtml(ticket.contractor || "Contractor")}</strong><small>${escapeHtml(ticket.title)} - ${escapeHtml(ticket.property)}</small><small>${escapeHtml(ticket.status)}</small></div>
      <span class="status-chip ${statusClass(ticket)}">${escapeHtml(ticket.priority)}</span>
    </div>
  `);
  setListOrEmpty("landlordMessageList", messages, "No messages yet.", (notification) => `
    <div class="tenant-row">
      <div><strong>${escapeHtml(notification.subject)}</strong><small>${escapeHtml(notification.message)}</small><small>${escapeHtml(notification.createdAt || "Recently")}</small></div>
      <span class="status-chip ${notification.priority === "urgent" ? "urgent" : ""}">${escapeHtml(notification.priority || "normal")}</span>
    </div>
  `);
  setListOrEmpty("landlordSettingsList", [currentUser()], "No settings available yet.", (user) => `
    <div class="tenant-row">
      <div><strong>${escapeHtml(user.email || "Landlord account")}</strong><small>Role: landlord</small><small>Property relationships are managed by the agency.</small></div>
      <span class="status-chip good">active</span>
    </div>
  `);
}

function openDocument(documentItem, tenantView = false) {
  const modal = document.querySelector("#documentModal");
  const preview = document.querySelector("#documentPreviewBox");
  document.querySelector("#documentModalTitle").textContent = documentItem.type;
  document.querySelector("#documentModalMeta").textContent =
    `${documentItem.property} - ${tenantView ? "tenant view" : "agency view"} - ${documentItem.fileName}`;

  if (documentItem.fileDataUrl && documentItem.fileMime?.startsWith("image/")) {
    preview.innerHTML = `<img alt="${documentItem.type}" src="${documentItem.fileDataUrl}" />`;
  } else if (documentItem.fileDataUrl && documentItem.fileMime === "application/pdf") {
    preview.innerHTML = `<iframe title="${documentItem.type}" src="${documentItem.fileDataUrl}"></iframe>`;
  } else {
    preview.innerHTML = `
      <div class="preview-placeholder">
        <div>
          <strong>${documentItem.fileName}</strong>
          <p>This prototype has the document record. Upload a PDF or image now to preview the actual file in this browser.</p>
        </div>
      </div>
    `;
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
}

function closeDocumentModal() {
  const modal = document.querySelector("#documentModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
}

function formatDate(value) {
  if (!value) return "";
  return new Date(`${value}T00:00:00`).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

function calculateExpiry(issueDate, validityYears) {
  if (!issueDate || !validityYears) return "";
  const expiry = new Date(`${issueDate}T00:00:00`);
  expiry.setFullYear(expiry.getFullYear() + Number(validityYears));
  return expiry.toISOString().slice(0, 10);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve) => {
    if (!file) {
      resolve("");
      return;
    }
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result || ""));
    reader.onerror = () => resolve("");
    reader.readAsDataURL(file);
  });
}

async function readImageAsCompressedDataUrl(file) {
  if (!file?.type?.startsWith("image/") || file.type === "image/svg+xml") return readFileAsDataUrl(file);
  const originalDataUrl = await readFileAsDataUrl(file);
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => {
      const maxSide = 760;
      const scale = Math.min(1, maxSide / Math.max(image.width, image.height));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(image.width * scale));
      canvas.height = Math.max(1, Math.round(image.height * scale));
      const context = canvas.getContext("2d");
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      resolve(canvas.toDataURL("image/jpeg", 0.68));
    };
    image.onerror = () => resolve(originalDataUrl);
    image.src = originalDataUrl;
  });
}

async function mediaFromTenantFile(file) {
  const isImage = file.type?.startsWith("image/");
  return {
    name: file.name,
    mime: isImage ? "image/jpeg" : file.type,
    dataUrl: isImage ? await readImageAsCompressedDataUrl(file) : await readFileAsDataUrl(file),
  };
}

function renderAvailabilityDraft() {
  const list = document.querySelector("#availabilityList");
  if (!list) return;
  list.innerHTML = "";
  pendingAvailabilityWindows.forEach((item) => {
    const tag = document.createElement("span");
    tag.textContent = item;
    list.appendChild(tag);
  });
}

function addAvailabilityWindow() {
  const input = document.querySelector("#availabilityWindow");
  const value = input.value.trim();
  if (!value) {
    showToast("Add an availability window first.");
    return;
  }
  pendingAvailabilityWindows.push(value);
  input.value = "";
  renderAvailabilityDraft();
  showToast("Availability window added.");
}

function activeTenantOrWarn() {
  const tenant = authorisedTenant();
  if (!tenant) {
    showToast("No active tenancy found for this account yet.");
    return null;
  }
  return tenant;
}

async function makeDocumentFromForm() {
  const file = document.querySelector("#documentFile").files[0];
  const type = document.querySelector("#documentType").value;
  const issueDate = document.querySelector("#documentIssueDate").value;
  const validityYears = document.querySelector("#documentValidityYears").value;
  const calculatedExpiry = calculateExpiry(issueDate, validityYears);
  const fileDataUrl = await readFileAsDataUrl(file);
  return {
    id: `DOC-${Math.floor(3000 + Math.random() * 6000)}`,
    type,
    property: document.querySelector("#documentProperty").value,
    fileName: file?.name || `${type.toLowerCase().replaceAll(" ", "-")}.pdf`,
    issueDate,
    validityYears,
    expiry: document.querySelector("#documentExpiry").value || calculatedExpiry,
    visibility: document.querySelector("#documentVisibility").value,
    notes: document.querySelector("#documentNotes").value.trim() || (calculatedExpiry ? `Expiry auto-calculated from issue date plus ${validityYears} years.` : ""),
    uploadedAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    fileDataUrl,
    fileMime: file?.type || "application/pdf",
  };
}

function updateTenantPreview() {
  const issue = document.querySelector("#issueType")?.value || "Repair";
  const urgency = document.querySelector("#urgency")?.value || "Routine";
  const property = authorisedTenant()?.address || "No active tenancy found";
  setText("tenantIssueTitle", issue);
  setText("tenantIssueMeta", `${urgency} - ${property.split(",").slice(0, 2).join(",")}`);
}

async function makeTicketFromForm() {
  const title = document.querySelector("#issueType").value;
  const rule = tradeRules[title];
  const priority = document.querySelector("#urgency").value;
  const files = [...document.querySelector("#photoUpload").files].slice(0, 3);
  const media = files.length
    ? await Promise.all(files.map(mediaFromTenantFile))
    : ["Tenant note", "Photo pending"];
  const evidence = media.map((item) => (typeof item === "object" ? item.name : item));
  const tenant = activeTenantOrWarn();
  if (!tenant) return null;
  return {
    id: `RF-${Math.floor(1100 + Math.random() * 8000)}`,
    title,
    property: tenant?.address || "",
    tenant: tenant?.fullName || document.querySelector("#tenantName").value.trim() || "Tenant",
    tenantId: tenant?.id || "",
    priority,
    status: "Reported",
    trade: rule.trade,
    approval: rule.approval,
    sla: priority === "Routine" ? "3 working days" : rule.sla,
    contractor: rule.contractor,
    contractorEmail: contractorEmailForName(rule.contractor),
    tag: priority === "Routine" ? "all" : "urgent",
    description: document.querySelector("#issueDescription").value.trim(),
    evidence,
    media,
    tenantMedia: media,
    availabilityWindows: [...pendingAvailabilityWindows],
    accessNotes: document.querySelector("#accessNotes").value.trim(),
    preferredContact: document.querySelector("#preferredContact").value,
    permissionToEnter: document.querySelector("#permissionToEnter").checked,
    appointment: { status: "proposed", proposedBy: "tenant", proposedStart: "", proposedEnd: "", confirmedStart: "", confirmedEnd: "", notes: "" },
    estimatedCost: "",
    actualCost: "",
    invoiceFile: "",
    tradesNotes: "",
    completion: { tenantConfirmed: false, comment: "" },
    createdAt: new Date().toLocaleString([], { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }),
  };
}

function addAgencyNotification({ tenantId, subject, message, priority = "normal", channel = "in_app", status = "new", relatedTicketId = "" }) {
  const notification = {
    id: `NOT-${Math.floor(2000 + Math.random() * 7000)}`,
    tenantId,
    subject,
    message,
    channel,
    priority,
    status,
    relatedTicketId,
    direction: "tenant_to_agency",
    createdAt: new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }),
  };
  state.notifications.unshift(notification);
  return notification;
}

function addAgencyNotificationForRepair(ticket) {
  addAgencyNotification({
    tenantId: ticket.tenantId,
    subject: `New repair reported: ${ticket.title}`,
    message: `${ticket.tenant} reported ${ticket.title} at ${ticket.property}. Urgency: ${ticket.priority}. ${ticket.description}`,
    priority: ticket.priority === "Routine" ? "normal" : "urgent",
    status: "new",
    relatedTicketId: ticket.id,
  });
}

function sendTenantMessageToAgency() {
  const tenant = activeTenantOrWarn();
  const message = document.querySelector("#tenantAgencyMessage").value.trim();
  if (!tenant) return;
  if (!message) {
    showToast("Write a message to the agency first.");
    return;
  }
  addAgencyNotification({
    tenantId: tenant.id,
    subject: "Message from tenant",
    message: `${tenant.fullName} at ${tenant.address}: ${message}`,
    priority: "normal",
    status: "new",
  });
  saveState();
  renderNotifications();
  document.querySelector("#tenantAgencyMessage").value = "";
  showToast("Message sent to the agency inbox.");
}

function contractorEmailForName(name) {
  const member = state.teamMembers.find((item) => item.fullName === name || item.email.includes(String(name || "").toLowerCase().split(" ")[0]));
  if (member?.role === "contractor") return member.email;
  if (name.includes("BrightSpark")) return "jobs@brightspark.example";
  if (name.includes("Heatwise")) return "jobs@heatwise.example";
  if (name.includes("DryHome")) return "jobs@dryhome.example";
  return "jobs@northline.example";
}

function filteredTenants() {
  return state.tenants.filter((tenant) => {
    const statusMatches = tenantStatusFilter === "all" || tenant.status === tenantStatusFilter;
    const rent = rentForTenant(tenant.id);
    const haystack = `${tenant.fullName} ${tenant.email} ${tenant.phone} ${tenant.address} ${tenant.postcode} ${rent?.status || ""}`.toLowerCase();
    const searchMatches = !tenantSearch || haystack.includes(tenantSearch);
    return statusMatches && searchMatches;
  });
}

function rentForTenant(tenantId) {
  return state.rentItems.find((item) => item.tenantId === tenantId) || null;
}

function money(value) {
  const amount = Number(value || 0);
  const hasPence = !Number.isInteger(amount);
  return `GBP ${amount.toLocaleString("en-GB", {
    minimumFractionDigits: hasPence ? 2 : 0,
    maximumFractionDigits: 2,
  })}`;
}

function kpiCurrency(value) {
  const amount = Number(value || 0);
  const abs = Math.abs(amount).toLocaleString("en-GB", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${amount < 0 ? "-" : ""}£${abs}`;
}

function kpiCurrencyDisplay(value) {
  const amount = Number(value || 0);
  const abs = Math.abs(amount).toLocaleString("en-GB", {
    minimumFractionDigits: Number.isInteger(amount) ? 0 : 2,
    maximumFractionDigits: 2,
  });
  return `${amount < 0 ? "-" : ""}\u00a3${abs}`;
}

function setKpiTone(id, value) {
  const element = document.querySelector(`#${id}`);
  if (!element) return;
  element.classList.toggle("negative-value", Number(value) < 0);
  element.classList.toggle("positive-value", Number(value) > 0 && id === "dashboardProfit");
}

function phoneHref(value) {
  const cleaned = String(value || "").replace(/[^\d+]/g, "");
  return cleaned ? `tel:${cleaned}` : "#";
}

function renderTenants() {
  tenantList.innerHTML = "";
  const tenants = filteredTenants();
  if (!tenants.length) {
    tenantList.innerHTML = `<div class="empty-state">No tenants match this filter.</div>`;
    return;
  }

  tenants.forEach((tenant) => {
    const rent = rentForTenant(tenant.id);
    const row = document.createElement("div");
    row.className = "tenant-row";
    row.innerHTML = `
      <div class="tenant-contact-card">
        <strong>${tenant.fullName}</strong>
        <div class="contact-lines">
          <span><b>Address:</b> ${tenant.address} - ${tenant.postcode}</span>
          <span><b>Phone:</b> <a href="${phoneHref(tenant.phone)}">${tenant.phone || "Not added"}</a></span>
          <span><b>Email:</b> <a href="mailto:${tenant.email}">${tenant.email || "Not added"}</a></span>
          <span><b>Tenancy:</b> ${tenant.status === "active" ? `Started ${formatDate(tenant.tenancyStart)}` : `Ended ${formatDate(tenant.tenancyEnd)}`}</span>
          <span><b>Rent:</b> ${rent ? `${money(rent.amount)} due ${formatDate(rent.dueDate)} - ${rent.status}` : "No rent schedule yet"}</span>
          <span><b>Documents:</b> ${tenant.canViewDocs === false ? "blocked" : "visible"}</span>
        </div>
      </div>
      <div class="row-actions">
        <span class="status-chip ${tenant.status === "active" ? "good" : ""}">${tenant.status}</span>
        <button type="button" data-open-property="${tenant.id}">Open property</button>
        <button type="button" data-edit="${tenant.id}">Edit</button>
        <button type="button" data-end="${tenant.id}">${tenant.status === "active" ? "End tenancy" : "Reactivate"}</button>
        <button class="danger-button" type="button" data-remove="${tenant.id}">Remove</button>
      </div>
    `;
    row.querySelector("[data-open-property]").addEventListener("click", () => openTenantProperty(tenant.id));
    row.querySelector("[data-edit]").addEventListener("click", () => fillTenantForm(tenant.id));
    row.querySelector("[data-end]").addEventListener("click", () => toggleTenancy(tenant.id));
    row.querySelector("[data-remove]").addEventListener("click", () => removeTenant(tenant.id));
    tenantList.appendChild(row);
  });
}

function renderRentTenantOptions() {
  const select = document.querySelector("#rentTenant");
  select.innerHTML = "";
  state.tenants.forEach((tenant) => {
    const option = document.createElement("option");
    option.value = tenant.id;
    option.textContent = `${tenant.fullName} - ${tenant.address}`;
    select.appendChild(option);
  });
}

function renderNotificationTenantOptions() {
  const select = document.querySelector("#notificationTenant");
  select.innerHTML = "";
  state.tenants.forEach((tenant) => {
    const option = document.createElement("option");
    option.value = tenant.id;
    option.textContent = `${tenant.fullName} - ${tenant.email}`;
    select.appendChild(option);
  });
}

function rentStatusClass(status) {
  if (status === "paid") return "good";
  if (status === "overdue") return "urgent";
  return "warning";
}

function renderFinance() {
  const rentList = document.querySelector("#rentList");
  rentList.innerHTML = "";

  const dueTotal = state.rentItems.filter((item) => item.status !== "paid").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const overdueTotal = state.rentItems.filter((item) => item.status === "overdue").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const collectedTotal = state.rentItems.filter((item) => item.status === "paid").reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const next14 = new Date(today);
  next14.setDate(next14.getDate() + 14);
  const upcoming = state.rentItems.filter((item) => {
    const dueDate = new Date(`${item.dueDate}T00:00:00`);
    return item.status !== "paid" && dueDate >= today && dueDate <= next14;
  });

  document.querySelector("#rentDueTotal").textContent = money(dueTotal);
  document.querySelector("#rentDueMeta").textContent = `${state.tenants.filter((tenant) => tenant.status === "active").length} active tenancies`;
  document.querySelector("#overdueTotal").textContent = money(overdueTotal);
  document.querySelector("#overdueMeta").textContent = `${state.rentItems.filter((item) => item.status === "overdue").length} overdue payments`;
  document.querySelector("#collectedTotal").textContent = money(collectedTotal);
  document.querySelector("#deadlineCount").textContent = upcoming.length;

  filteredRentItems().forEach((item) => {
    const tenant = state.tenants.find((tenantItem) => tenantItem.id === item.tenantId);
    const row = document.createElement("div");
    row.className = "tenant-row";
    row.innerHTML = `
      <div>
        <strong>${tenant?.fullName || "Unknown tenant"}</strong>
        <small>${tenant?.address || "No address"}</small>
        <small>${money(item.amount)} due ${formatDate(item.dueDate)}</small>
      </div>
      <div class="row-actions">
        <span class="status-chip ${rentStatusClass(item.status)}">${item.status}</span>
        <button type="button" data-paid="${item.id}">Mark paid</button>
        <button type="button" data-overdue="${item.id}">Overdue</button>
      </div>
    `;
    row.querySelector("[data-paid]").addEventListener("click", () => updateRentStatus(item.id, "paid"));
    row.querySelector("[data-overdue]").addEventListener("click", () => updateRentStatus(item.id, "overdue"));
    rentList.appendChild(row);
  });

  renderRentTenantOptions();
  if (!document.querySelector("#rentDueDate").value) {
    document.querySelector("#rentDueDate").value = new Date().toISOString().slice(0, 10);
  }
}

function filteredRentItems() {
  return state.rentItems.filter((item) => {
    const tenant = state.tenants.find((tenantItem) => tenantItem.id === item.tenantId);
    const statusMatches = rentStatusFilter === "all" || item.status === rentStatusFilter;
    const haystack = `${tenant?.fullName || ""} ${tenant?.address || ""} ${tenant?.postcode || ""} ${item.status} ${item.amount} ${item.dueDate}`.toLowerCase();
    const searchMatches = !rentSearch || haystack.includes(rentSearch);
    return statusMatches && searchMatches;
  });
}

function searchRecords(query) {
  const text = query.trim().toLowerCase();
  if (!text) return [];
  const results = [];

  state.tenants.forEach((tenant) => {
    const haystack = `${tenant.fullName} ${tenant.email} ${tenant.phone} ${tenant.address} ${tenant.postcode}`.toLowerCase();
    if (haystack.includes(text)) {
      results.push({ type: "Tenant", title: tenant.fullName, meta: `${tenant.address} - ${tenant.email}`, panel: "tenantsPanel" });
    }
  });

  state.tickets.forEach((ticket) => {
    const haystack = `${ticket.title} ${ticket.property} ${ticket.tenant} ${ticket.status} ${ticket.trade}`.toLowerCase();
    if (haystack.includes(text)) {
      results.push({ type: "Repair", title: ticket.title, meta: `${ticket.property} - ${ticket.status}`, panel: "ticketsPanel", ticketId: ticket.id });
    }
  });

  state.documents.forEach((documentItem) => {
    const haystack = `${documentItem.type} ${documentItem.property} ${documentItem.fileName} ${documentItem.notes}`.toLowerCase();
    if (haystack.includes(text)) {
      results.push({ type: "Document", title: documentItem.type, meta: `${documentItem.property} - ${documentItem.fileName}`, panel: "documentsPanel" });
    }
  });

  state.properties.forEach((property) => {
    const tenants = tenantsForProperty(property);
    const haystack = `${property.address} ${property.postcode} ${property.type} ${property.landlord} ${tenants.map((tenant) => tenant.fullName).join(" ")}`.toLowerCase();
    if (haystack.includes(text)) {
      results.push({ type: "Property", title: property.address, meta: `${property.type} - ${property.occupancy}`, panel: "propertiesPanel" });
    }
  });

  state.rentItems.forEach((rent) => {
    const tenant = state.tenants.find((item) => item.id === rent.tenantId);
    const haystack = `${tenant?.fullName} ${tenant?.address} ${rent.status} ${rent.amount} ${rent.dueDate}`.toLowerCase();
    if (haystack.includes(text)) {
      results.push({ type: "Finance", title: `${tenant?.fullName || "Tenant"} rent`, meta: `${money(rent.amount)} due ${formatDate(rent.dueDate)} - ${rent.status}`, panel: "financePanel" });
    }
  });

  return results.slice(0, 8);
}

function renderSearchResults(query) {
  const box = document.querySelector("#searchResults");
  const results = searchRecords(query);
  box.innerHTML = "";

  if (!query.trim()) {
    box.classList.remove("open");
    return;
  }

  if (!results.length) {
    box.innerHTML = `<div class="empty-state">No matches found.</div>`;
    box.classList.add("open");
    return;
  }

  results.forEach((result) => {
    const row = document.createElement("button");
    row.type = "button";
    row.className = "search-result";
    row.innerHTML = `
      <div>
        <strong>${result.title}</strong>
        <small>${result.type} - ${result.meta}</small>
      </div>
      <span class="status-chip">${result.type}</span>
    `;
    row.addEventListener("click", () => {
      if (result.ticketId) selectTicket(result.ticketId);
      showPanel(result.panel);
      document.querySelector("#globalSearch").value = "";
      box.classList.remove("open");
    });
    box.appendChild(row);
  });

  box.classList.add("open");
}

function updateRentStatus(id, status) {
  const item = state.rentItems.find((rentItem) => rentItem.id === id);
  if (!item) return;
  item.status = status;
  saveState();
  renderFinance();
  renderTenants();
  renderProperties();
  renderDashboardAttention();
}

function saveRentItem() {
  const tenantId = document.querySelector("#rentTenant").value;
  const existing = state.rentItems.find((item) => item.tenantId === tenantId);
  const item = existing || { id: `RENT-${Math.floor(2000 + Math.random() * 7000)}`, tenantId };
  item.amount = Number(document.querySelector("#rentAmount").value || 0);
  item.dueDate = document.querySelector("#rentDueDate").value;
  item.status = document.querySelector("#rentStatus").value;
  if (!existing) state.rentItems.unshift(item);
  saveState();
  renderFinance();
  renderTenants();
  renderProperties();
  renderDashboardAttention();
  showToast("Rent schedule updated.");
}

function renderNotifications() {
  const list = document.querySelector("#notificationList");
  list.innerHTML = "";

  if (!state.notifications.length) {
    list.innerHTML = `<div class="empty-state">No tenant notifications prepared yet.</div>`;
    return;
  }

  state.notifications.forEach((notification) => {
    const tenant = state.tenants.find((item) => item.id === notification.tenantId);
    const row = document.createElement("div");
    row.className = "tenant-row";
    const directionLabel = notification.direction === "tenant_to_agency" ? "Tenant alert" : "Agency notice";
    row.innerHTML = `
      <div>
        <strong>${notification.subject}</strong>
        <small>${tenant?.fullName || "Unknown tenant"} - ${tenant?.email || "No email"}</small>
        <small>${notification.message}</small>
        <small>${notification.direction === "tenant_to_agency" ? "tenant to agency" : "agency to tenant"} - ${notification.channel} - ${notification.createdAt}${notification.relatedTicketId ? ` - ${notification.relatedTicketId}` : ""}</small>
      </div>
      <div class="row-actions">
        <span class="status-chip ${notification.direction === "tenant_to_agency" ? "warning" : ""}">${directionLabel}</span>
        <span class="status-chip ${notification.priority === "urgent" ? "urgent" : ""}">${notification.priority}</span>
        <span class="status-chip">${notification.status}</span>
      </div>
    `;
    list.appendChild(row);
  });

  renderNotificationTenantOptions();
}

function notificationTemplateText(template) {
  if (template === "rent_overdue") {
    return {
      subject: "Rent payment reminder",
      message: "Your rent payment is overdue. Please contact the agency if you have already made payment or need support.",
      priority: "urgent",
    };
  }
  if (template === "rent_due") {
    return {
      subject: "Upcoming rent due",
      message: "This is a reminder that your rent is due soon.",
      priority: "normal",
    };
  }
  if (template === "document_request") {
    return {
      subject: "Document action required",
      message: "Please review the document request in your tenant portal and contact the agency if you need help.",
      priority: "normal",
    };
  }
  if (template === "repair_update") {
    return {
      subject: "Repair update",
      message: "There has been an update on your repair request. Please check your tenant portal.",
      priority: "normal",
    };
  }
  return {
    subject: "Message from your agency",
    message: "Please check your tenant portal for an update from the agency.",
    priority: "normal",
  };
}

function applyNotificationTemplate() {
  const template = notificationTemplateText(document.querySelector("#notificationTemplate").value);
  document.querySelector("#notificationSubject").value = template.subject;
  document.querySelector("#notificationMessage").value = template.message;
  document.querySelector("#notificationPriority").value = template.priority;
}

function saveNotification() {
  const notification = {
    id: `NOT-${Math.floor(2000 + Math.random() * 7000)}`,
    tenantId: document.querySelector("#notificationTenant").value,
    subject: document.querySelector("#notificationSubject").value.trim(),
    message: document.querySelector("#notificationMessage").value.trim(),
    channel: document.querySelector("#notificationChannel").value,
    priority: document.querySelector("#notificationPriority").value,
    status: "prepared",
    createdAt: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
  };
  state.notifications.unshift(notification);
  saveState();
  renderNotifications();
  showToast("Notification prepared in the tenant message log.");
}

function saveCoordination() {
  const ticket = selectedTicket();
  if (!ticket) return;
  ticket.status = document.querySelector("#jobStatusSelect").value;
  ticket.estimatedCost = Number(document.querySelector("#estimatedCost").value || 0);
  ticket.actualCost = Number(document.querySelector("#actualCost").value || 0);
  const proposal = document.querySelector("#appointmentProposal").value.trim();
  if (proposal) {
    ticket.appointment = ticket.appointment || {};
    ticket.appointment.proposedBy = "agency";
    ticket.appointment.proposedStart = proposal;
    ticket.appointment.status = ticket.status === "Appointment confirmed" ? "confirmed" : "proposed";
    if (ticket.status === "Appointment confirmed") ticket.appointment.confirmedStart = proposal;
  }
  const invoice = document.querySelector("#invoiceUpload").files[0];
  if (invoice) ticket.invoiceFile = invoice.name;
  saveState();
  refreshRepairViews(ticket.id);
  showToast("Maintenance coordination saved.");
}

function closeSelectedRepair() {
  const ticket = selectedTicket();
  if (!ticket) return;
  ticket.status = "Closed";
  ticket.tag = "all";
  ticket.closedAt = new Date().toLocaleString("en-GB", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" });
  saveState();
  refreshRepairViews(ticket.id);
  showToast(`${ticket.title} closed.`);
}

function deleteSelectedRepair() {
  const ticket = selectedTicket();
  if (!ticket) return;
  const confirmed = window.confirm(`Delete repair ${ticket.id}? This removes it from the agency repair list.`);
  if (!confirmed) return;
  state.tickets = state.tickets.filter((item) => item.id !== ticket.id);
  state.notifications = state.notifications.filter((item) => item.relatedTicketId !== ticket.id);
  selectedTicketId = state.tickets[0]?.id || "";
  saveState();
  refreshRepairViews(selectedTicketId);
  showToast(`${ticket.title} deleted.`);
}

function updateTradesJob(status, message = "") {
  const ticket = state.tickets.find((item) => item.id === selectedTradesJobId);
  if (!ticket) {
    showToast("Select a job first.");
    return;
  }
  ticket.status = status;
  if (status === "Appointment proposed") {
    ticket.appointment = ticket.appointment || {};
    ticket.appointment.status = "proposed";
    ticket.appointment.proposedBy = "contractor";
    ticket.appointment.proposedStart = document.querySelector("#tradesProposedTime").value.trim();
  }
  if (status === "Completed") {
    ticket.appointment = ticket.appointment || {};
    ticket.appointment.status = "completed";
    ticket.status = "Tenant confirmation pending";
  }
  ticket.tradesNotes = document.querySelector("#tradesWorkNotes").value.trim() || ticket.tradesNotes || message;
  const invoice = document.querySelector("#tradesInvoiceFile").files[0];
  if (invoice) ticket.invoiceFile = invoice.name;
  saveState();
  renderTradesDashboard();
  renderTickets();
  renderAgencyTradespeople();
  showToast(message || `${ticket.title} updated.`);
}

function tradesVisibleJobs() {
  const user = currentUser();
  if (!["contractor", "tradesperson"].includes(user.type)) return [];
  return state.tickets.filter((ticket) => ticket.contractorEmail === user.email || ticket.openPool === true);
}

function renderTradesDashboard() {
  const list = document.querySelector("#tradesJobList");
  const detail = document.querySelector("#tradesJobDetail");
  if (!list || !detail) return;
  const jobs = tradesVisibleJobs();
  document.querySelector("#tradesAssignedCount").textContent = jobs.length;
  document.querySelector("#tradesUpcomingCount").textContent = jobs.filter((job) => ["Appointment proposed", "Appointment confirmed", "Assigned to tradesperson"].includes(job.status)).length;
  document.querySelector("#tradesCompletedCount").textContent = jobs.filter((job) => ["Completed", "Tenant confirmation pending", "Closed"].includes(job.status)).length;
  document.querySelector("#tradesInvoiceCount").textContent = jobs.filter((job) => job.invoiceFile).length;
  list.innerHTML = "";
  if (!jobs.length) {
    list.innerHTML = `<div class="empty-state">No jobs assigned to this tradesperson.</div>`;
  } else {
    jobs.forEach((job) => {
      const card = document.createElement("div");
      card.className = `tenant-row property-row${job.id === selectedTradesJobId ? " selected" : ""}`;
      card.innerHTML = `
        <div class="property-row-body">
          <strong>${job.title}</strong>
          <small>${job.property} - ${job.priority}</small>
          <small>${job.status} - ${job.createdAt}</small>
        </div>
        <div class="row-actions">
          <span class="status-chip ${statusClass(job)}">${job.priority}</span>
          <button type="button">Open</button>
        </div>
      `;
      card.addEventListener("click", () => {
        selectedTradesJobId = job.id;
        renderTradesDashboard();
      });
      list.appendChild(card);
    });
  }

  const selected = jobs.find((job) => job.id === selectedTradesJobId) || jobs[0];
  if (!selected) {
    detail.innerHTML = `<div class="empty-state">Select a job to manage it.</div>`;
    return;
  }
  selectedTradesJobId = selected.id;
  document.querySelector("#tradesProposedTime").value = selected.appointment?.proposedStart || selected.appointment?.confirmedStart || "";
  document.querySelector("#tradesWorkNotes").value = selected.tradesNotes || "";
  detail.innerHTML = `
    <div class="property-mini-section">
      <h3>${selected.title}</h3>
      <p>${selected.description}</p>
      <div class="detail-grid">
        <div><span>Address summary</span><strong>${selected.property}</strong></div>
        <div><span>Status</span><strong>${selected.status}</strong></div>
        <div><span>Agency contact</span><strong>Harbour & Co Lettings</strong></div>
        <div><span>Estimated cost</span><strong>${selected.estimatedCost ? money(selected.estimatedCost) : "Not set"}</strong></div>
      </div>
    </div>
    <div class="property-mini-section">
      <h3>Tenant photos and availability</h3>
      <div class="tag-list">${(selected.media || selected.evidence || []).map((item) => `<span>${item}</span>`).join("")}</div>
      <div class="tag-list">${(selected.availabilityWindows || []).map((item) => `<span>${item}</span>`).join("")}</div>
      <p><strong>Access notes:</strong> ${selected.accessNotes || "No notes"}</p>
      <p><strong>Appointment:</strong> ${selected.appointment?.confirmedStart || selected.appointment?.proposedStart || "Not proposed yet"}</p>
      <p><strong>Invoice:</strong> ${selected.invoiceFile || "Not uploaded"}</p>
    </div>
  `;
}

function renderDashboardAttention() {
  const rentBox = document.querySelector("#dashboardRentList");
  const complianceBox = document.querySelector("#dashboardComplianceList");
  if (!rentBox || !complianceBox) return;
  rentBox.innerHTML = "";
  complianceBox.innerHTML = "";

  const attentionRent = state.rentItems
    .filter((item) => item.status !== "paid")
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 4);

  if (!attentionRent.length) {
    rentBox.innerHTML = `<div class="empty-state">No rent items need attention.</div>`;
  } else {
    attentionRent.forEach((item) => {
      const tenant = state.tenants.find((tenantItem) => tenantItem.id === item.tenantId);
      const row = document.createElement("div");
      row.className = "tenant-row";
      row.innerHTML = `
        <div>
          <strong>${tenant?.fullName || "Unknown tenant"}</strong>
          <small>${tenant?.address || "No address"}</small>
          <small>${money(item.amount)} due ${formatDate(item.dueDate)}</small>
        </div>
        <div class="row-actions">
          <span class="status-chip ${rentStatusClass(item.status)}">${item.status}</span>
        </div>
      `;
      rentBox.appendChild(row);
    });
  }

  const properties = [...new Set(state.tenants.map((tenant) => tenant.address))];
  const complianceItems = state.documents
    .filter((documentItem) => ["Expired", "Due soon"].includes(documentStatus(documentItem).label))
    .slice(0, 4);

  properties.forEach((property) => {
    const hasEicr = state.documents.some((documentItem) => documentItem.property === property && documentItem.type.includes("EICR"));
    if (!hasEicr && complianceItems.length < 6) {
      complianceItems.push({
        type: "Missing EICR",
        property,
        fileName: "No certificate uploaded",
        expiry: "",
        visibility: "private",
        notes: "Agency should upload or request certificate.",
        missing: true,
      });
    }
  });

  if (!complianceItems.length) {
    complianceBox.innerHTML = `<div class="empty-state">No compliance items need attention.</div>`;
  } else {
    complianceItems.forEach((documentItem) => {
      const status = documentItem.missing ? { label: "Missing", className: "urgent" } : documentStatus(documentItem);
      const row = document.createElement("div");
      row.className = "tenant-row";
      row.innerHTML = `
        <div>
          <strong>${documentItem.type}</strong>
          <small>${documentItem.property}</small>
          <small>${documentItem.expiry ? `expires ${formatDate(documentItem.expiry)}` : documentItem.notes}</small>
        </div>
        <div class="row-actions">
          <span class="status-chip ${status.className}">${status.label}</span>
        </div>
      `;
      complianceBox.appendChild(row);
    });
  }
}

function roleLabel(role) {
  return role
    .split("_")
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ");
}

function renderTeamMembers() {
  teamList.innerHTML = "";
  if (!state.teamMembers.length) {
    teamList.innerHTML = `<div class="empty-state">No team members yet.</div>`;
    return;
  }

  state.teamMembers.forEach((member) => {
    const row = document.createElement("div");
    row.className = "tenant-row";
    row.innerHTML = `
      <div>
        <strong>${member.fullName}</strong>
        <small>${member.email}</small>
        <small>${roleLabel(member.role)} - ${member.branch}</small>
      </div>
      <div class="row-actions">
        <span class="status-chip ${member.status === "active" ? "good" : ""}">${member.status}</span>
        <button type="button" data-toggle="${member.id}">${member.status === "disabled" ? "Enable" : "Disable"}</button>
      </div>
    `;
    row.querySelector("[data-toggle]").addEventListener("click", () => toggleTeamMember(member.id));
    teamList.appendChild(row);
  });
}

function agencyTradespeople() {
  const members = state.teamMembers
    .filter((member) => member.role === "contractor")
    .map((member) => ({ ...member, trade: "Approved contractor" }));
  const knownByEmail = new Set(members.map((member) => member.email));
  state.tickets.forEach((ticket) => {
    if (ticket.contractorEmail && knownByEmail.has(ticket.contractorEmail)) return;
    if (!ticket.contractor) return;
    knownByEmail.add(ticket.contractorEmail || ticket.contractor);
    members.push({
      id: `TRADE-${ticket.contractor.replaceAll(" ", "-").toLowerCase()}`,
      fullName: ticket.contractor,
      email: ticket.contractorEmail || "No email added",
      role: "contractor",
      branch: ticket.trade || "Repairs",
      status: "active",
      trade: ticket.trade || "Contractor",
    });
  });
  return members;
}

function jobsForTradesperson(member) {
  return state.tickets.filter((ticket) => ticket.contractorEmail === member.email || ticket.contractor === member.fullName);
}

function openRepairFromAgencyTrades(ticketId) {
  selectedTicketId = ticketId;
  showPanel("ticketsPanel");
  selectTicket(ticketId);
}

function renderAgencyTradespeople() {
  const list = document.querySelector("#agencyTradesList");
  const jobsList = document.querySelector("#agencyTradesJobs");
  if (!list || !jobsList) return;

  const tradespeople = agencyTradespeople();
  const assignedJobs = state.tickets.filter((ticket) => ticket.contractor || ticket.contractorEmail);
  const completedJobs = assignedJobs.filter((ticket) => ["Completed", "Tenant confirmation pending", "Closed"].includes(ticket.status));
  document.querySelector("#agencyTradesCount").textContent = tradespeople.length;
  document.querySelector("#agencyTradesAssigned").textContent = assignedJobs.filter((ticket) => !["Closed", "Cancelled"].includes(ticket.status)).length;
  document.querySelector("#agencyTradesCompleted").textContent = completedJobs.length;
  document.querySelector("#agencyTradesInvoices").textContent = assignedJobs.filter((ticket) => ticket.invoiceFile).length;

  const search = contractorSearch.trim().toLowerCase();
  const visibleTradespeople = tradespeople.filter((member) => {
    const haystack = `${member.fullName} ${member.email} ${member.branch} ${member.trade} ${member.status}`.toLowerCase();
    return !search || haystack.includes(search);
  });

  list.innerHTML = "";
  if (!visibleTradespeople.length) {
    list.innerHTML = `<div class="empty-state">No tradespeople match this search.</div>`;
  } else {
    visibleTradespeople.forEach((member) => {
      const jobs = jobsForTradesperson(member);
      const openJobs = jobs.filter((job) => !["Closed", "Cancelled"].includes(job.status));
      const row = document.createElement("div");
      row.className = "tenant-row";
      row.innerHTML = `
        <div>
          <strong>${member.fullName}</strong>
          <small>${member.email}</small>
          <small>${member.trade || roleLabel(member.role)} - ${member.branch} - ${openJobs.length} open jobs</small>
        </div>
        <div class="row-actions">
          <span class="status-chip ${member.status === "active" ? "good" : ""}">${member.status}</span>
          <button type="button" data-open-trade-jobs="${member.id}">View jobs</button>
        </div>
      `;
      row.querySelector("[data-open-trade-jobs]").addEventListener("click", () => {
        if (jobs[0]) openRepairFromAgencyTrades(jobs[0].id);
        else showToast("No jobs assigned to this tradesperson yet.");
      });
      list.appendChild(row);
    });
  }

  jobsList.innerHTML = "";
  if (!assignedJobs.length) {
    jobsList.innerHTML = `<div class="empty-state">No repairs are assigned to tradespeople yet.</div>`;
  } else {
    assignedJobs.slice(0, 8).forEach((ticket) => {
      const row = document.createElement("div");
      row.className = "tenant-row";
      row.innerHTML = `
        <div>
          <strong>${ticket.title}</strong>
          <small>${ticket.property}</small>
          <small>${ticket.contractor || "Unassigned"} - ${ticket.status} - ${money(ticket.estimatedCost || ticket.actualCost || 0)}</small>
        </div>
        <div class="row-actions">
          <span class="status-chip ${statusClass(ticket)}">${ticket.priority}</span>
          <button type="button" data-open-trade-repair="${ticket.id}">Open</button>
        </div>
      `;
      row.querySelector("[data-open-trade-repair]").addEventListener("click", () => openRepairFromAgencyTrades(ticket.id));
      jobsList.appendChild(row);
    });
  }
}

async function renderCouncilLookup() {
  const result = document.querySelector("#councilLookupResult");
  const postcodeInput = document.querySelector("#councilPostcodeSearch").value.trim();
  const normalised = PostcodeLookup.normaliseUkPostcode(postcodeInput);
  if (!normalised.valid) {
    result.innerHTML = `<div class="empty-state">${escapeHtml(normalised.error)}</div>`;
    return;
  }
  document.querySelector("#councilPostcodeSearch").value = normalised.postcode;
  result.innerHTML = `<div class="empty-state">Checking ${escapeHtml(normalised.postcode)}...</div>`;
  const response = await postcodeLookupService.lookup(normalised.postcode);
  if (!response.ok) {
    result.innerHTML = `
      <div class="empty-state">
        ${escapeHtml(response.error)} Manual council entry is available on the property form.
      </div>
    `;
    return;
  }

  const lookup = enrichCouncilLookup(response.result);
  state.postcodeLookups[lookup.postcode] = lookup;
  saveState();
  renderBoroughList();
  result.innerHTML = `
    <div class="property-mini-section">
      <h3>${lookup.councilName}</h3>
      <p>${escapeHtml(lookup.postcode)} was detected from postcode data. This result uses ${lookup.source === "postcodes_io" ? "Postcodes.io" : "GOV.UK"} and is cached for repeat checks.</p>
      <div class="detail-grid">
        <div><span>Council</span><strong>${lookup.councilName}</strong></div>
        <div><span>Website</span><strong>${lookup.councilWebsite ? lookup.councilWebsite.replace("https://", "") : "Use GOV.UK checker"}</strong></div>
        <div><span>Admin district code</span><strong>${lookup.councilCode || "Not supplied"}</strong></div>
        <div><span>County</span><strong>${lookup.county || "Not supplied"}</strong></div>
        <div><span>Region</span><strong>${lookup.region || "Not supplied"}</strong></div>
        <div><span>Country</span><strong>${lookup.country || "Not supplied"}</strong></div>
        <div><span>Last checked</span><strong>${new Date(lookup.lastCheckedAt).toLocaleString("en-GB")}</strong></div>
      </div>
      <div class="row-actions property-form-actions">
        <a class="secondary-inline external-link" href="${lookup.councilWebsite || "https://www.gov.uk/find-local-council"}" target="_blank" rel="noopener">Open council website</a>
        <a class="secondary-inline external-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lookup.postcode)}" target="_blank" rel="noopener">Open postcode map</a>
      </div>
    </div>
  `;
}

function renderBoroughList() {
  const list = document.querySelector("#boroughList");
  if (!list) return;
  const search = boroughSearch.trim().toLowerCase();
  const lookups = Object.values(state.postcodeLookups || {}).sort((a, b) => String(b.lastCheckedAt).localeCompare(String(a.lastCheckedAt)));
  const visible = lookups.filter((lookup) => {
    const haystack = `${lookup.postcode} ${lookup.councilName} ${lookup.councilCode} ${lookup.councilWebsite || ""} ${lookup.source}`.toLowerCase();
    return !search || haystack.includes(search);
  });
  list.innerHTML = "";
  visible.forEach((lookup) => {
    const row = document.createElement("div");
    row.className = "tenant-row";
    row.innerHTML = `
      <div>
        <strong>${lookup.postcode}</strong>
        <small>${lookup.councilName}</small>
        <small>${lookup.councilWebsite ? lookup.councilWebsite.replace("https://", "") : "No stored website"} - ${lookup.source} - ${lookup.lastCheckedAt ? new Date(lookup.lastCheckedAt).toLocaleString("en-GB") : "not checked"}</small>
      </div>
      <div class="row-actions">
        <a class="secondary-inline external-link" href="${lookup.councilWebsite || "https://www.gov.uk/find-local-council"}" target="_blank" rel="noopener">Website</a>
        <a class="secondary-inline external-link" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(lookup.postcode)}" target="_blank" rel="noopener">Map</a>
      </div>
    `;
    list.appendChild(row);
  });
  if (!visible.length) list.innerHTML = `<div class="empty-state">No cached postcode lookups yet.</div>`;
}

function toggleTeamMember(id) {
  const member = state.teamMembers.find((item) => item.id === id);
  if (!member) return;
  member.status = member.status === "disabled" ? "active" : "disabled";
  saveState();
  renderTeamMembers();
  renderAgencyTradespeople();
  showToast(`${member.fullName} is now ${member.status}.`);
}

function inviteTeamMember() {
  const fullName = document.querySelector("#teamFullName").value.trim() || "New team member";
  const email = document.querySelector("#teamEmail").value.trim();
  const existing = state.teamMembers.find((member) => member.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    existing.fullName = fullName;
    existing.role = document.querySelector("#teamRole").value;
    existing.branch = document.querySelector("#teamBranch").value;
    existing.status = "invited";
  } else {
    state.teamMembers.unshift({
      id: `USR-${Math.floor(2000 + Math.random() * 7000)}`,
      fullName,
      email,
      role: document.querySelector("#teamRole").value,
      branch: document.querySelector("#teamBranch").value,
      status: "invited",
    });
  }
  saveState();
  renderTeamMembers();
  renderAgencyTradespeople();
  renderSession();
  showToast(`Invite prepared for ${fullName}.`);
}

function fillTenantForm(id) {
  const tenant = state.tenants.find((item) => item.id === id);
  if (!tenant) return;
  document.querySelector("#tenantId").value = tenant.id;
  document.querySelector("#tenantFullName").value = tenant.fullName;
  document.querySelector("#tenantPhone").value = tenant.phone;
  document.querySelector("#tenantEmail").value = tenant.email;
  document.querySelector("#tenantAddress").value = tenant.address;
  document.querySelector("#tenantPostcode").value = tenant.postcode;
  document.querySelector("#tenantStartDate").value = tenant.tenancyStart;
  document.querySelector("#tenantAccessPropertySelect").value = tenant.address;
  document.querySelector("#tenantCanViewDocs").checked = tenant.canViewDocs !== false;
  showToast(`${tenant.fullName} loaded into the tenant form.`);
}

function clearTenantForm() {
  document.querySelector("#tenantId").value = "";
  document.querySelector("#tenantFullName").value = "";
  document.querySelector("#tenantPhone").value = "";
  document.querySelector("#tenantEmail").value = "";
  document.querySelector("#tenantAddress").value = "";
  document.querySelector("#tenantPostcode").value = "";
  document.querySelector("#tenantStartDate").value = new Date().toISOString().slice(0, 10);
  document.querySelector("#tenantCanViewDocs").checked = true;
  showToast("Tenant form is ready for a new tenant.");
}

function removeTenant(id) {
  const tenant = state.tenants.find((item) => item.id === id);
  if (!tenant) return;
  const confirmed = window.confirm(`Remove ${tenant.fullName} from the tenant register? Rent items and tenant notifications for this tenant will also be removed.`);
  if (!confirmed) return;
  state.tenants = state.tenants.filter((item) => item.id !== id);
  state.rentItems = state.rentItems.filter((item) => item.tenantId !== id);
  state.notifications = state.notifications.filter((item) => item.tenantId !== id);
  state.tickets = state.tickets.map((ticket) => ticket.tenantId === id ? { ...ticket, tenantId: "", tenant: tenant.fullName } : ticket);
  saveState();
  clearTenantForm();
  renderTenants();
  renderProperties();
  renderFinance();
  renderNotifications();
  renderSession();
  showToast(`${tenant.fullName} removed from the tenant register.`);
}

function openTenantProperty(id) {
  const tenant = state.tenants.find((item) => item.id === id);
  if (!tenant) return;
  let property = state.properties.find((item) => item.address === tenant.address);
  if (!property && tenant.address) {
    ensurePropertyRecord(tenant.address, tenant.postcode);
    property = state.properties.find((item) => item.address === tenant.address);
  }
  if (!property) {
    showToast("Add an address for this tenant first.");
    return;
  }
  routeToPanel("propertiesPanel");
  selectProperty(property.id);
}

function useTenantAccessPropertyInForm() {
  const selectedAddress = document.querySelector("#tenantAccessPropertySelect").value;
  const property = state.properties.find((item) => item.address === selectedAddress);
  if (!property) {
    showToast("No property selected yet.");
    return;
  }
  document.querySelector("#tenantAddress").value = property.address;
  document.querySelector("#tenantPostcode").value = property.postcode || "";
  showToast("Selected property copied into the tenant form.");
}

function addTenantPropertyFromForm() {
  const address = document.querySelector("#tenantAddress").value.trim();
  const postcode = document.querySelector("#tenantPostcode").value.trim();
  if (!address) {
    showToast("Add a tenant property address first.");
    return;
  }
  ensurePropertyRecord(address, postcode);
  renderProperties();
  renderPropertyOptions();
  const select = document.querySelector("#tenantAccessPropertySelect");
  if (select) select.value = address;
  showToast("Property is now available for tenant assignment.");
}

function toggleTenancy(id) {
  const tenant = state.tenants.find((item) => item.id === id);
  if (!tenant) return;
  if (tenant.status === "active") {
    tenant.status = "ended";
    tenant.tenancyEnd = new Date().toISOString().slice(0, 10);
  } else {
    tenant.status = "active";
    tenant.tenancyEnd = "";
  }
  saveState();
  renderTenants();
  renderProperties();
  renderTenantAccessSummary();
}

function saveTenantFromForm() {
  const id = document.querySelector("#tenantId").value;
  const fullName = document.querySelector("#tenantFullName").value.trim();
  const address = document.querySelector("#tenantAddress").value.trim();
  const existing = state.tenants.find((tenant) => tenant.id === id) || state.tenants.find((tenant) => tenant.fullName === fullName && tenant.address === address);
  const tenant = existing || { id: `TEN-${Math.floor(2000 + Math.random() * 7000)}`, status: "active", tenancyEnd: "" };
  tenant.fullName = fullName || "New tenant";
  tenant.phone = document.querySelector("#tenantPhone").value.trim();
  tenant.email = document.querySelector("#tenantEmail").value.trim();
  tenant.address = address;
  tenant.postcode = document.querySelector("#tenantPostcode").value.trim();
  tenant.tenancyStart = document.querySelector("#tenantStartDate").value;
  tenant.canViewDocs = document.querySelector("#tenantCanViewDocs").checked;
  ensurePropertyRecord(tenant.address, tenant.postcode);
  document.querySelector("#tenantId").value = tenant.id;
  if (!existing) state.tenants.unshift(tenant);
  saveState();
  renderTenants();
  renderProperties();
  renderSession();
  showToast(`${tenant.fullName} saved to the tenant register.`);
}

function saveTenantAccess() {
  const fullName = document.querySelector("#tenantFullName").value.trim();
  const email = document.querySelector("#tenantEmail").value.trim();
  const tenant = state.tenants.find((item) => item.email === email) || state.tenants.find((item) => item.fullName === fullName);
  if (!tenant) {
    showToast("Save the tenant first, then set access.");
    return;
  }
  tenant.address = document.querySelector("#tenantAccessPropertySelect").value;
  tenant.canViewDocs = document.querySelector("#tenantCanViewDocs").checked;
  saveState();
  renderTenants();
  renderProperties();
  renderSession();
  showToast(`${tenant.fullName}'s app access has been updated.`);
}

function csvEscape(value) {
  const text = String(value ?? "");
  return /[",\n]/.test(text) ? `"${text.replaceAll('"', '""')}"` : text;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function exportTenantsCsv() {
  const headers = ["tenant_id", "full_name", "phone", "email", "address", "postcode", "tenancy_start", "tenancy_end", "status"];
  const rows = state.tenants.map((tenant) => [
    tenant.id,
    tenant.fullName,
    tenant.phone,
    tenant.email,
    tenant.address,
    tenant.postcode,
    tenant.tenancyStart,
    tenant.tenancyEnd,
    tenant.status,
  ]);
  downloadCsv("propflow-tenants-export.csv", [headers, ...rows]);
}

const propertyDataHeaders = [
  "property_id",
  "address",
  "postcode",
  "property_type",
  "bedrooms",
  "bathrooms",
  "landlord_name",
  "landlord_email",
  "landlord_phone",
  "occupancy",
  "monthly_rent",
  "agency_fee_percent",
  "other_expenses",
  "detected_council_name",
  "manual_council_name",
  "council_source",
  "last_council_checked_at",
  "current_tenants",
  "tenant_emails",
  "open_repairs",
  "missing_documents",
  "net_position",
];

function propertyDataRows() {
  return filteredProperties().map((property) => {
    const tenants = tenantsForProperty(property);
    const openRepairs = ticketsForProperty(property).filter((ticket) => ticket.status !== "Completed").length;
    const missing = missingRequiredDocuments(property).join("; ");
    const financials = propertyFinancials(property);
    return [
      property.id,
      property.address,
      property.postcode,
      property.type,
      property.bedrooms,
      property.bathrooms,
      property.landlord,
      property.landlordEmail,
      property.landlordPhone,
      property.occupancy,
      property.monthlyRent,
      property.agencyFeePercent,
      property.otherExpenses,
      property.detectedCouncilName || "",
      property.manualCouncilName || "",
      councilSourceLabel(property),
      property.lastCouncilCheckedAt || "",
      tenants.map((tenant) => tenant.fullName).join("; "),
      tenants.map((tenant) => tenant.email).join("; "),
      openRepairs,
      missing,
      financials.net,
    ];
  });
}

function exportPropertiesCsv() {
  downloadCsv("propflow-properties-export.csv", [propertyDataHeaders, ...propertyDataRows()]);
}

function propertyExportTableHtml(title = "PropFlow property export") {
  const rows = [propertyDataHeaders, ...propertyDataRows()];
  const tableRows = rows
    .map((row, rowIndex) => {
      const cellTag = rowIndex === 0 ? "th" : "td";
      return `<tr>${row.map((cell) => `<${cellTag}>${escapeHtml(cell)}</${cellTag}>`).join("")}</tr>`;
    })
    .join("");
  return `
    <!doctype html>
    <html>
      <head>
        <meta charset="UTF-8">
        <title>${escapeHtml(title)}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #17212b; }
          h1 { font-size: 22px; }
          table { width: 100%; border-collapse: collapse; }
          th, td { border: 1px solid #dfe6ea; padding: 8px; text-align: left; vertical-align: top; }
          th { background: #e0f2eb; }
        </style>
      </head>
      <body>
        <h1>${escapeHtml(title)}</h1>
        <table>${tableRows}</table>
      </body>
    </html>
  `;
}

function downloadBlob(filename, content, type) {
  const url = URL.createObjectURL(new Blob([content], { type }));
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function exportPropertiesExcel() {
  downloadBlob("propflow-properties-export.xls", propertyExportTableHtml("PropFlow property Excel export"), "application/vnd.ms-excel");
}

function exportPropertiesPdf() {
  const html = propertyExportTableHtml("PropFlow property PDF export");
  const printWindow = window.open("", "_blank");
  if (!printWindow) {
    downloadBlob("propflow-properties-print.html", html, "text/html");
    showToast("PDF preview was blocked. A printable HTML file has been downloaded instead.");
    return;
  }
  printWindow.document.write(html);
  printWindow.document.close();
  printWindow.focus();
  window.setTimeout(() => printWindow.print(), 300);
}

function downloadCsv(filename, rows) {
  const csv = rows.map((row) => row.map(csvEscape).join(",")).join("\n");
  downloadBlob(filename, csv, "text/csv");
}

function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    const next = text[index + 1];
    if (char === '"' && quoted && next === '"') {
      cell += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      row.push(cell);
      cell = "";
    } else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && next === "\n") index += 1;
      row.push(cell);
      if (row.some(Boolean)) rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += char;
    }
  }
  row.push(cell);
  if (row.some(Boolean)) rows.push(row);
  return rows;
}

function parseHtmlTable(text) {
  const documentFragment = new DOMParser().parseFromString(text, "text/html");
  return [...documentFragment.querySelectorAll("tr")]
    .map((row) => [...row.children].map((cell) => cell.textContent.trim()))
    .filter((row) => row.some(Boolean));
}

function rowsFromPropertyImport(text) {
  return /<table[\s>]/i.test(text) ? parseHtmlTable(text) : parseCsv(text);
}

function normaliseImportRecord(record) {
  return Object.fromEntries(
    Object.entries(record).map(([key, value]) => [
      key.trim().toLowerCase().replaceAll(" ", "_").replaceAll("-", "_"),
      String(value ?? "").trim(),
    ]),
  );
}

function importPropertiesFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const rows = rowsFromPropertyImport(String(reader.result || ""));
    const headers = rows.shift()?.map((header) => header.trim()) || [];
    let added = 0;
    let updated = 0;
    let skipped = 0;

    rows.forEach((row) => {
      const record = normaliseImportRecord(Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));
      const address = record.address;
      if (!address) {
        skipped += 1;
        return;
      }

      const existing = state.properties.find((property) => property.id === record.property_id)
        || state.properties.find((property) => property.address.toLowerCase() === address.toLowerCase());
      const property = existing || { id: record.property_id || `PROP-${Math.floor(2000 + Math.random() * 7000)}` };
      const previousAddress = property.address;

      property.address = address;
      const importedPostcode = PostcodeLookup.normaliseUkPostcode(record.postcode || "");
      property.postcode = importedPostcode.valid ? importedPostcode.postcode : (record.postcode || "");
      property.type = record.property_type || record.type || "Managed property";
      property.bedrooms = Number(record.bedrooms || 0);
      property.bathrooms = Number(record.bathrooms || 0);
      property.landlord = record.landlord_name || record.landlord || "Unassigned landlord";
      property.landlordEmail = record.landlord_email || "";
      property.landlordPhone = record.landlord_phone || "";
      property.occupancy = ["occupied", "vacant"].includes(record.occupancy?.toLowerCase()) ? record.occupancy.toLowerCase() : "occupied";
      property.monthlyRent = Number(record.monthly_rent || record.rent || 0);
      property.agencyFeePercent = Number(record.agency_fee_percent || 0);
      property.otherExpenses = Number(record.other_expenses || 0);
      property.detectedCouncilName = record.detected_council_name || property.detectedCouncilName || "";
      property.manualCouncilName = record.manual_council_name || "";
      property.councilName = property.manualCouncilName || property.detectedCouncilName || "";
      property.councilSource = property.manualCouncilName ? "manual" : (record.council_source || property.councilSource || "");
      property.lastCouncilCheckedAt = record.last_council_checked_at || property.lastCouncilCheckedAt || "";

      if (existing && previousAddress && previousAddress !== property.address) {
        state.tenants.forEach((tenant) => {
          if (tenant.address === previousAddress) tenant.address = property.address;
        });
        state.tickets.forEach((ticket) => {
          if (ticket.property === previousAddress) ticket.property = property.address;
        });
        state.documents.forEach((documentItem) => {
          if (documentItem.property === previousAddress) documentItem.property = property.address;
        });
      }

      if (existing) {
        updated += 1;
      } else {
        state.properties.unshift(property);
        added += 1;
      }
    });

    saveState();
    renderProperties();
    renderTenants();
    renderTickets();
    renderDocuments();
    renderFinance();
    renderDashboardAttention();
    renderTenantAccessSummary();
    showToast(`${updated} properties updated, ${added} added${skipped ? `, ${skipped} skipped` : ""}.`);
  };
  reader.readAsText(file);
}

function importTenantsCsv(file) {
  const reader = new FileReader();
  reader.onload = () => {
    const rows = parseCsv(String(reader.result || ""));
    const headers = rows.shift()?.map((header) => header.trim()) || [];
    const imported = rows.map((row) => Object.fromEntries(headers.map((header, index) => [header, row[index] || ""])));
    imported.forEach((record) => {
      const tenant = {
        id: record.tenant_id || `TEN-${Math.floor(2000 + Math.random() * 7000)}`,
        fullName: record.full_name || record.name || "Imported tenant",
        phone: record.phone || "",
        email: record.email || "",
        address: record.address || "",
        postcode: record.postcode || "",
        tenancyStart: record.tenancy_start || "",
        tenancyEnd: record.tenancy_end || "",
    status: record.status || "active",
        canViewDocs: record.can_view_docs !== "false",
      };
      const existingIndex = state.tenants.findIndex((item) => item.id === tenant.id);
      if (existingIndex >= 0) state.tenants[existingIndex] = tenant;
      else state.tenants.unshift(tenant);
    });
    saveState();
    renderTenants();
    renderProperties();
    showToast(`${imported.length} tenant rows imported.`);
  };
  reader.readAsText(file);
}

function applyBranding() {
  const { name, subtitle, primary } = state.branding;
  document.querySelector("#brandName").textContent = name;
  document.querySelector("#brandSub").textContent = subtitle;
  document.querySelector("#agencyName").value = name === "PropFlow" ? "Harbour & Co Lettings" : name;
  document.querySelector("#agencySubtitle").value = subtitle === "Agency workspace" ? "Tenant and landlord services" : subtitle;
  document.querySelector("#primaryColour").value = primary;
  document.documentElement.style.setProperty("--primary", primary);
  document.documentElement.style.setProperty("--primary-soft", `${primary}22`);
}

navItems.forEach((item) => item.addEventListener("click", () => showPanel(item.dataset.panel)));
document.querySelectorAll("[data-panel-target]").forEach((shortcut) => {
  shortcut.addEventListener("click", () => {
    const route = shortcut.dataset.routeFilter;
    if (route === "repairs-open") return routeToPanel("ticketsPanel", { status: "open" });
    if (route === "repairs-urgent") return routeToPanel("ticketsPanel", { urgency: "urgent" });
    if (route === "documents-expiring") return routeToPanel("documentsPanel", { filter: "expiring" });
    if (route === "rent-arrears") return routeToPanel("financePanel", { filter: "arrears" });
    if (route === "maintenance-spend") return routeToPanel("financePanel", { type: "maintenance" });
    if (route === "properties") return routeToPanel("propertiesPanel");
    routeToPanel(shortcut.dataset.panelTarget);
  });
  shortcut.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      shortcut.click();
    }
  });
});
document.querySelectorAll("[data-filter]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll("[data-filter]").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    ticketFilter = button.dataset.filter;
    renderTickets();
  });
});

document.querySelectorAll("[data-auth-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    showAuthPanel(button.dataset.authTab);
  });
});

document.querySelector("#authSignupForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#authSignupEmail").value.trim().toLowerCase();
  const password = document.querySelector("#authSignupPassword").value;
  const confirmPassword = document.querySelector("#authSignupConfirmPassword").value;
  const role = document.querySelector("input[name='signupRole']:checked")?.value;
  if (password !== confirmPassword) {
    setAuthMessage("Passwords do not match.", true);
    return;
  }
  try {
    setAuthMessage("Creating account...");
    await signupWithRole(email, password, role);
  } catch (error) {
    setAuthMessage(error.message || "Could not create account.", true);
  }
});

document.querySelector("#authLoginForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const email = document.querySelector("#authLoginEmail").value.trim().toLowerCase();
  const password = document.querySelector("#authLoginPassword").value;
  try {
    setAuthMessage("Logging in...");
    await loginWithPassword(email, password);
  } catch (error) {
    setAuthMessage(error.message || "Could not log in.", true);
  }
});

document.querySelector("#resendConfirmationBtn").addEventListener("click", async () => {
  const email = document.querySelector("#authLoginEmail").value.trim().toLowerCase();
  if (!email) {
    setAuthMessage("Enter your email first, then request a confirmation email.", true);
    return;
  }
  try {
    setAuthMessage("Requesting confirmation email...");
    await resendSignupConfirmation(email);
  } catch (error) {
    setAuthMessage(error.message || "Could not request confirmation email.", true);
  }
});

document.querySelector("#resetPasswordBtn").addEventListener("click", async () => {
  const email = document.querySelector("#authLoginEmail").value.trim().toLowerCase();
  if (!email) {
    setAuthMessage("Enter your email first, then request a password reset.", true);
    return;
  }
  try {
    setAuthMessage("Requesting password reset...");
    await sendPasswordReset(email);
  } catch (error) {
    setAuthMessage(error.message || "Could not request password reset.", true);
  }
});

document.querySelector("#goToLoginBtn").addEventListener("click", () => {
  showAuthPanel("login");
  setAuthMessage("Use your confirmed email and password to sign in.");
});

document.querySelector("#resendSignupConfirmationBtn").addEventListener("click", async () => {
  if (!pendingConfirmationEmail) {
    showAuthPanel("signup");
    setAuthMessage("Create an account first, then request another confirmation email.", true);
    return;
  }
  try {
    setAuthMessage("Requesting confirmation email...");
    await resendSignupConfirmation(pendingConfirmationEmail);
  } catch (error) {
    setAuthMessage(error.message || "Could not request confirmation email.", true);
  }
});

document.querySelector("#authRoleForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const role = document.querySelector("input[name='profileRole']:checked")?.value;
  try {
    setAuthMessage("Saving role...");
    propFlowAuth.profile = await upsertAuthProfile(propFlowAuth.user, role);
    await applyAuthSession({ user: propFlowAuth.user });
  } catch (error) {
    setAuthMessage(error.message || "Could not save role.", true);
  }
});

document.querySelector("#authSignOutBtn").addEventListener("click", async () => {
  await signOutAuthUser();
  closeAccountMenu();
  showToast("Signed out.");
});

document.querySelector("#accountButton").addEventListener("click", toggleAccountMenu);

document.addEventListener("click", (event) => {
  if (!event.target.closest(".account-menu")) closeAccountMenu();
});

document.querySelector("#globalSearch").addEventListener("input", (event) => {
  renderSearchResults(event.target.value);
});

document.querySelector("#addAvailabilityBtn").addEventListener("click", addAvailabilityWindow);

document.querySelector("#repairForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  updateTenantPreview();
  const newTicket = await makeTicketFromForm();
  if (!newTicket) return;
  state.tickets.unshift(newTicket);
  addAgencyNotificationForRepair(newTicket);
  selectedTicketId = newTicket.id;
  ticketFilter = "all";
  saveState();
  updateMetrics();
  renderTickets();
  renderProperties();
  renderTradesDashboard();
  renderNotifications();
  selectTicket(newTicket.id);
  document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("active", item.dataset.filter === "all"));
  showToast(`${newTicket.title} submitted and saved as ${newTicket.id}.`);
  showPanel("ticketsPanel");
});

document.querySelector("#tenantMessageForm").addEventListener("submit", (event) => {
  event.preventDefault();
  sendTenantMessageToAgency();
});

document.querySelector("#issueType").addEventListener("change", updateTenantPreview);
document.querySelector("#urgency").addEventListener("change", updateTenantPreview);
document.querySelector("#photoUpload").addEventListener("change", (event) => {
  const preview = document.querySelector("#photoPreview");
  const files = [...event.target.files].slice(0, 3);
  if (!files.length) return;
  preview.innerHTML = "";
  files.forEach((file) => {
    const item = document.createElement("div");
    if (file.type?.startsWith("image/")) {
      const url = URL.createObjectURL(file);
      item.className = "has-preview";
      item.innerHTML = `<img alt="${file.name}" src="${url}" /><span>${file.name}</span>`;
      item.querySelector("img").addEventListener("load", () => URL.revokeObjectURL(url), { once: true });
    } else {
      item.textContent = file.name;
    }
    preview.appendChild(item);
  });
});

document.querySelector("#assignBtn").addEventListener("click", () => {
  const ticket = selectedTicket();
  if (!ticket) return;
  ticket.contractor = contractorSelect.value;
  ticket.contractorEmail = contractorEmailForName(contractorSelect.value);
  ticket.status = "Assigned to tradesperson";
  saveState();
  refreshRepairViews(ticket.id);
  showToast(`${ticket.title} assigned to ${ticket.contractor}.`);
});

document.querySelector("#saveCoordinationBtn").addEventListener("click", saveCoordination);
document.querySelector("#closeRepairBtn").addEventListener("click", closeSelectedRepair);
document.querySelector("#deleteRepairBtn").addEventListener("click", deleteSelectedRepair);

document.querySelector("#brandForm").addEventListener("submit", (event) => {
  event.preventDefault();
  state.branding = {
    name: document.querySelector("#agencyName").value.trim() || "PropFlow",
    subtitle: document.querySelector("#agencySubtitle").value.trim() || "Agency workspace",
    primary: document.querySelector("#primaryColour").value,
  };
  saveState();
  applyBranding();
  showToast("Agency branding saved.");
});

document.querySelector("#documentIssueDate").addEventListener("change", () => {
  const expiry = calculateExpiry(document.querySelector("#documentIssueDate").value, document.querySelector("#documentValidityYears").value);
  if (expiry) document.querySelector("#documentExpiry").value = expiry;
});

document.querySelector("#documentValidityYears").addEventListener("change", () => {
  const expiry = calculateExpiry(document.querySelector("#documentIssueDate").value, document.querySelector("#documentValidityYears").value);
  if (expiry) document.querySelector("#documentExpiry").value = expiry;
});

document.querySelector("#documentForm").addEventListener("submit", async (event) => {
  event.preventDefault();
  const newDocument = await makeDocumentFromForm();
  state.documents.unshift(newDocument);
  saveState();
  renderDocuments();
  renderProperties();
  renderDashboardAttention();
  document.querySelector("#documentForm").reset();
  showToast(`${newDocument.type} added to the property document register.`);
});

document.querySelector("#documentPropertyFilter").addEventListener("change", (event) => {
  documentPropertyFilter = event.target.value;
  renderDocuments();
});

document.querySelector("#documentVisibilityFilter").addEventListener("change", (event) => {
  documentVisibilityFilter = event.target.value;
  renderDocuments();
  renderDashboardAttention();
});

document.querySelector("#documentStatusFilter").addEventListener("change", (event) => {
  documentStatusFilter = event.target.value;
  renderDocuments();
});

document.querySelector("#documentSearch").addEventListener("input", (event) => {
  documentSearch = event.target.value.trim().toLowerCase();
  renderDocuments();
});

document.querySelector("#propertySearch").addEventListener("input", (event) => {
  propertySearch = event.target.value.trim().toLowerCase();
  renderProperties();
});

document.querySelector("#propertyStatusFilter").addEventListener("change", (event) => {
  propertyStatusFilter = event.target.value;
  renderProperties();
});

document.querySelector("#propertyForm").addEventListener("submit", (event) => {
  event.preventDefault();
  savePropertyFromForm();
});

document.querySelector("#newPropertyBtn").addEventListener("click", () => {
  clearPropertyForm();
  selectedPropertyId = "";
  activeDetailTab = "overview";
  renderPropertyDetail();
  showToast("Blank property form ready.");
});

document.querySelector("#propertyLayoutUploadBtn").addEventListener("click", uploadPropertyLayout);
document.querySelector("#exportPropertiesCsvBtn").addEventListener("click", exportPropertiesCsv);
document.querySelector("#exportPropertiesExcelBtn").addEventListener("click", exportPropertiesExcel);
document.querySelector("#exportPropertiesPdfBtn").addEventListener("click", exportPropertiesPdf);
document.querySelector("#propertyDataImport").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) importPropertiesFile(file);
  event.target.value = "";
});

document.querySelector("#propertyPostcode").addEventListener("blur", async (event) => {
  const normalised = PostcodeLookup.normaliseUkPostcode(event.target.value);
  if (!event.target.value.trim()) return;
  if (!normalised.valid) {
    renderPropertyCouncilStatus(selectedProperty(), normalised.error);
    return;
  }
  event.target.value = normalised.postcode;
  const property = selectedProperty() || { postcode: normalised.postcode };
  property.postcode = normalised.postcode;
  const lookup = await lookupCouncilForProperty(property, { persist: Boolean(selectedProperty()) });
  if (!selectedProperty() && lookup) pendingPropertyCouncilLookup = lookup;
});

document.querySelector("#lookupPropertyCouncilBtn").addEventListener("click", async () => {
  const postcode = document.querySelector("#propertyPostcode").value.trim();
  const property = selectedProperty() || { postcode };
  property.postcode = postcode;
  const lookup = await lookupCouncilForProperty(property, { force: true, persist: Boolean(selectedProperty()) });
  if (!selectedProperty() && lookup) pendingPropertyCouncilLookup = lookup;
});

document.querySelector("#overridePropertyCouncilBtn").addEventListener("click", () => {
  document.querySelector("#manualCouncilField").classList.add("open");
  document.querySelector("#propertyManualCouncil").focus();
});

document.querySelector("#contractorSearch").addEventListener("input", (event) => {
  contractorSearch = event.target.value.trim().toLowerCase();
  renderAgencyTradespeople();
});

document.querySelector("#lookupCouncilBtn").addEventListener("click", renderCouncilLookup);
document.querySelector("#councilPostcodeSearch").addEventListener("keydown", (event) => {
  if (event.key === "Enter") renderCouncilLookup();
});
document.querySelector("#boroughSearch").addEventListener("input", (event) => {
  boroughSearch = event.target.value.trim().toLowerCase();
  renderBoroughList();
});

document.querySelector("#tradesAcceptBtn").addEventListener("click", () => updateTradesJob("Assigned to tradesperson", "Job accepted. Agency has been notified."));
document.querySelector("#tradesDeclineBtn").addEventListener("click", () => updateTradesJob("Cancelled", "Job declined with note for agency review."));
document.querySelector("#tradesEnRouteBtn").addEventListener("click", () => updateTradesJob("In progress", "Marked en route."));
document.querySelector("#tradesArrivedBtn").addEventListener("click", () => updateTradesJob("In progress", "Marked arrived."));
document.querySelector("#tradesCompleteBtn").addEventListener("click", () => updateTradesJob("Completed", "Job marked complete. Tenant confirmation requested."));
document.querySelector("#tradesSaveBtn").addEventListener("click", () => updateTradesJob(document.querySelector("#tradesProposedTime").value.trim() ? "Appointment proposed" : "In progress", "Tradesperson notes saved."));

document.querySelector("#tenantForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveTenantFromForm();
});

document.querySelector("#newTenantBtn").addEventListener("click", clearTenantForm);
document.querySelector("#clearTenantFormBtn").addEventListener("click", clearTenantForm);
document.querySelector("#useTenantAccessPropertyBtn").addEventListener("click", useTenantAccessPropertyInForm);
document.querySelector("#addTenantPropertyBtn").addEventListener("click", addTenantPropertyFromForm);
document.querySelector("#saveTenantAccessBtn").addEventListener("click", saveTenantAccess);

document.querySelector("#teamForm").addEventListener("submit", (event) => {
  event.preventDefault();
  inviteTeamMember();
});

document.querySelector("#rentForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveRentItem();
});

document.querySelector("#notificationTemplate").addEventListener("change", applyNotificationTemplate);

document.querySelector("#notificationForm").addEventListener("submit", (event) => {
  event.preventDefault();
  saveNotification();
});

document.querySelector("#tenantStatusFilter").addEventListener("change", (event) => {
  tenantStatusFilter = event.target.value;
  renderTenants();
});

document.querySelector("#tenantSearch").addEventListener("input", (event) => {
  tenantSearch = event.target.value.trim().toLowerCase();
  renderTenants();
});

document.querySelector("#repairSearch").addEventListener("input", (event) => {
  repairSearch = event.target.value.trim().toLowerCase();
  renderTickets();
});

document.querySelector("#rentSearch").addEventListener("input", (event) => {
  rentSearch = event.target.value.trim().toLowerCase();
  renderFinance();
});

document.querySelector("#rentStatusFilter").addEventListener("change", (event) => {
  rentStatusFilter = event.target.value;
  renderFinance();
});

document.querySelector("#tenantCsvImport").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (file) importTenantsCsv(file);
});

document.querySelector("#exportTenantsBtn").addEventListener("click", exportTenantsCsv);
document.querySelector("#closeDocumentModal").addEventListener("click", closeDocumentModal);
document.querySelector("#documentModal").addEventListener("click", (event) => {
  if (event.target.id === "documentModal") closeDocumentModal();
});

document.querySelector("#resetDataBtn").addEventListener("click", () => {
  localStorage.removeItem(activeStorageKey);
  state = loadState(activeStorageKey, { seedDemo: activeStorageKey === storageKey });
  resetWorkspaceSelection();
  renderWorkspace();
  renderSession();
  showToast(activeStorageKey === storageKey ? "Demo data reset." : "Workspace data reset.");
});

document.querySelector("#refreshOverview").addEventListener("click", () => {
  updateMetrics();
  showToast("Overview refreshed with latest repairs and compliance tasks.");
});

document.querySelector("#agencyStartPropertyBtn")?.addEventListener("click", () => {
  routeToPanel("propertiesPanel");
});

[
  ["#rentChartCard", "financePanel", {}],
  ["#repairsChartCard", "ticketsPanel", {}],
  ["#occupancyChartCard", "propertiesPanel", {}],
].forEach(([selector, panel, params]) => {
  const card = document.querySelector(selector);
  if (!card) return;
  card.addEventListener("click", () => routeToPanel(panel, params));
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      routeToPanel(panel, params);
    }
  });
});

document.querySelectorAll("[data-tenant-report-focus]").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelector("#issueType").scrollIntoView({ behavior: "smooth", block: "center" });
    document.querySelector("#issueType").focus();
  });
});

async function bootstrapApp() {
  applyBranding();
  setAuthScreenVisible(true);
  updateMetrics();
  renderTickets();
  renderDocuments();
  renderTenants();
  renderProperties();
  renderTeamMembers();
  renderAgencyTradespeople();
  renderFinance();
  renderNotifications();
  renderDashboardAttention();
  renderTradesDashboard();
  renderBoroughList();
  registerPhoneAppServiceWorker();
  selectTicket(selectedTicketId);
  updateTenantPreview();
  await initAuthSession();
  if (!document.body.classList.contains("auth-required")) {
    const requestedPanel = window.location.hash.replace("#", "");
    if (requestedPanel && document.querySelector(`#${requestedPanel}`)) {
      showPanel(requestedPanel);
    }
    applyInitialRoute();
  }
}

bootstrapApp();

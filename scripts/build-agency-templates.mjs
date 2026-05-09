import fs from "node:fs/promises";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const outputDir = new URL("../outputs/", import.meta.url);
await fs.mkdir(outputDir, { recursive: true });

const workbook = Workbook.create();

const sheets = {
  dashboard: workbook.worksheets.add("Dashboard"),
  tenants: workbook.worksheets.add("Tenants"),
  properties: workbook.worksheets.add("Properties"),
  contractors: workbook.worksheets.add("Contractors"),
  documents: workbook.worksheets.add("Documents"),
  repairs: workbook.worksheets.add("Repairs"),
  dictionary: workbook.worksheets.add("Data Dictionary"),
};

function writeSheet(sheet, title, subtitle, headers, rows) {
  sheet.showGridLines = false;
  sheet.getRange("A1:H1").merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A2:H2").merge();
  sheet.getRange("A2").values = [[subtitle]];
  sheet.getRange("A4").write([headers]);
  if (rows.length) sheet.getRangeByIndexes(4, 0, rows.length, headers.length).values = rows;

  sheet.getRange("A1").format = {
    font: { bold: true, color: "#17212B", size: 18 },
  };
  sheet.getRange("A2").format = {
    font: { color: "#657282", size: 11 },
  };
  sheet.getRangeByIndexes(3, 0, 1, headers.length).format = {
    fill: "#14745F",
    font: { bold: true, color: "#FFFFFF" },
  };
  sheet.getRangeByIndexes(3, 0, Math.max(rows.length + 1, 2), headers.length).format.wrapText = true;
  sheet.getRangeByIndexes(0, 0, 1, headers.length).format.columnWidthPx = 150;
  sheet.freezePanes.freezeRows(4);
}

writeSheet(
  sheets.tenants,
  "Tenants Import Template",
  "Use this tab to add, update, end, or reactivate tenants. Export from Google Sheets as CSV and import into PropFlow.",
  ["tenant_id", "full_name", "phone", "email", "address", "postcode", "tenancy_start", "tenancy_end", "status"],
  [
    ["TEN-1001", "Maya Collins", "07123 456789", "maya@example.com", "Flat 4, 18 Albion Road, London N1", "N1 8AB", "2026-04-01", "", "active"],
    ["TEN-1002", "Owen Rees", "07234 567890", "owen@example.com", "7 Mason Street, Manchester M4", "M4 6HH", "2026-03-15", "", "active"],
  ],
);

writeSheet(
  sheets.properties,
  "Properties Import Template",
  "Core managed property records. Property ID becomes the link between tenants, documents, repairs, and landlords.",
  ["property_id", "address", "postcode", "property_type", "branch", "landlord_name", "landlord_email", "status"],
  [
    ["PROP-001", "Flat 4, 18 Albion Road, London N1", "N1 8AB", "Flat", "London", "Sarah Ford", "sarah@example.com", "managed"],
    ["PROP-002", "7 Mason Street, Manchester M4", "M4 6HH", "House", "Manchester", "Daniel Hart", "daniel@example.com", "managed"],
  ],
);

writeSheet(
  sheets.contractors,
  "Contractors Import Template",
  "Approved tradespeople and companies used for repair routing.",
  ["contractor_id", "company_name", "trade", "contact_name", "phone", "email", "coverage_area", "status"],
  [
    ["CON-001", "Northline Plumbing Ltd", "Plumber", "Amir North", "07111 222333", "jobs@northline.example", "London", "approved"],
    ["CON-002", "BrightSpark Electrical", "Electrician", "Rosa Patel", "07222 333444", "ops@brightspark.example", "London, Manchester", "approved"],
  ],
);

writeSheet(
  sheets.documents,
  "Documents Import Template",
  "Document metadata for certificates, agreements, inventories, and compliance reminders.",
  ["document_id", "property_id", "property_address", "document_type", "file_name", "issue_date", "validity_years", "expiry_date", "visibility", "notes"],
  [
    ["DOC-2107", "PROP-003", "21 Park View, Birmingham B13", "Electrical safety certificate / EICR", "eicr-park-view.pdf", "2021-05-15", 5, "=IF(AND(F5<>\"\",G5<>\"\"),EDATE(F5,G5*12),\"\")", "tenant", "Expiry is formula-driven from issue date plus validity years"],
    ["DOC-2108", "PROP-003", "21 Park View, Birmingham B13", "Gas safety certificate", "gas-safety-park-view.pdf", "2025-05-18", 1, "=IF(AND(F6<>\"\",G6<>\"\"),EDATE(F6,G6*12),\"\")", "tenant", "Annual renewal"],
  ],
);

writeSheet(
  sheets.repairs,
  "Repairs Import Template",
  "Repair tickets can be bulk-created or exported for reporting.",
  ["repair_id", "property_id", "tenant_id", "issue_type", "priority", "status", "trade", "contractor_id", "created_at", "notes"],
  [
    ["RF-1042", "PROP-001", "TEN-1001", "Water leak", "Urgent", "New", "Plumber", "CON-001", "2026-05-03 09:18", "Photos attached"],
    ["RF-1041", "PROP-002", "TEN-1002", "Electrical problem", "Emergency", "Awaiting contractor", "Electrician", "CON-002", "2026-05-03 08:42", "Breaker trips repeatedly"],
  ],
);

sheets.dashboard.showGridLines = false;
sheets.dashboard.getRange("A1:F1").merge();
sheets.dashboard.getRange("A1").values = [["PropFlow Agency Data Templates"]];
sheets.dashboard.getRange("A2:F2").merge();
sheets.dashboard.getRange("A2").values = [["Use these tabs as Google Sheets templates. The app can import/export the same column names as CSV."]];
sheets.dashboard.getRange("A4:C9").values = [
  ["Area", "Current tab", "Purpose"],
  ["Tenants", "Tenants", "Move-ins, move-outs, contact details"],
  ["Properties", "Properties", "Managed portfolio data"],
  ["Contractors", "Contractors", "Approved tradespeople routing"],
  ["Documents", "Documents", "Compliance and paperwork metadata"],
  ["Repairs", "Repairs", "Maintenance workflow import/export"],
];
sheets.dashboard.getRange("A1").format = { font: { bold: true, size: 20, color: "#17212B" } };
sheets.dashboard.getRange("A4:C4").format = { fill: "#14745F", font: { bold: true, color: "#FFFFFF" } };
sheets.dashboard.getRange("A4:C9").format.columnWidthPx = 190;

writeSheet(
  sheets.dictionary,
  "Data Dictionary",
  "Column rules used by the app importer and future Google Sheets sync.",
  ["field", "required", "format", "notes"],
  [
    ["tenant_id", "recommended", "TEN-1001", "Stable ID for updates. If blank, the app can create one."],
    ["status", "yes", "active / ended / approved / managed", "Used for lifecycle filtering."],
    ["issue_date", "conditional", "yyyy-mm-dd", "Used for AI/certificate expiry extraction."],
    ["validity_years", "conditional", "number", "EICR often 5 years; gas safety normally 1 year."],
    ["expiry_date", "recommended", "yyyy-mm-dd", "Can be calculated from issue date and validity years."],
    ["visibility", "yes", "tenant / private", "Controls tenant document access."],
  ],
);

for (const sheet of Object.values(sheets)) {
  const used = sheet.getUsedRange();
  if (used) used.format.autofitColumns();
}

const errors = await workbook.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 100 },
});
if (errors.ndjson.includes("#")) {
  console.log(errors.ndjson);
}

const xlsx = await SpreadsheetFile.exportXlsx(workbook);
await xlsx.save(new URL("propflow-agency-data-templates.xlsx", outputDir));

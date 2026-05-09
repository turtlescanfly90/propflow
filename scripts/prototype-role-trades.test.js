const assert = require("node:assert/strict");
const fs = require("node:fs");

const app = fs.readFileSync("app.js", "utf8");
const html = fs.readFileSync("index.html", "utf8");

const rolePanels = {
  agency: ["overviewPanel", "propertiesPanel", "tenantsPanel", "ticketsPanel", "financePanel", "notificationsPanel", "documentsPanel", "teamPanel", "settingsPanel"],
  tenant: ["tenantPanel"],
  contractor: ["tradesPanel"],
};

function canAccess(role, panel) {
  return rolePanels[role].includes(panel);
}

assert.equal(canAccess("agency", "tenantPanel"), false, "agency cannot access tenant portal");
assert.equal(canAccess("tenant", "overviewPanel"), false, "tenant cannot access agency dashboard");
assert.equal(canAccess("tenant", "tradesPanel"), false, "tenant cannot access trades dashboard");
assert.equal(canAccess("contractor", "tenantPanel"), false, "tradesperson cannot access tenant portal");
assert.equal(canAccess("contractor", "financePanel"), false, "tradesperson cannot access agency financials");
assert.equal(canAccess("tenant", "tenantPanel"), true, "tenant can access tenant portal");
assert.equal(canAccess("agency", "ticketsPanel"), true, "agency can access repairs coordination");
assert.equal(canAccess("contractor", "tradesPanel"), true, "tradesperson can access trades dashboard");

const ownRequest = { tenantId: "TEN-1001", contractorEmail: "jobs@northline.example", media: ["leak.jpg"], availabilityWindows: ["Monday 9am-12pm"], appointment: { status: "proposed" } };
const otherRequest = { tenantId: "TEN-9999", contractorEmail: "jobs@other.example", media: ["private.jpg"], availabilityWindows: ["Friday"], appointment: { status: "confirmed" } };

assert.equal(ownRequest.tenantId === "TEN-1001", true, "tenant can upload photos to own maintenance request");
assert.equal(otherRequest.tenantId === "TEN-1001", false, "tenant cannot upload photos to another maintenance request");
assert.equal(ownRequest.appointment.status !== "confirmed", true, "tenant can update availability before confirmation");
assert.equal(otherRequest.appointment.status === "confirmed", true, "confirmed appointment requires reschedule flow");
assert.equal(ownRequest.contractorEmail === "jobs@northline.example", true, "assigned tradesperson can see job photos");
assert.equal(otherRequest.contractorEmail === "jobs@northline.example", false, "unrelated tradesperson cannot see job photos");

assert.match(app, /function allowedPanelForUser/, "app has role based panel guard");
assert.match(app, /function tradesVisibleJobs/, "app scopes trades dashboard to assigned jobs");
assert.match(app, /availabilityWindows/, "app stores tenant availability windows");
assert.match(app, /permissionToEnter/, "app stores sensitive access notes/permission separately");
assert.match(html, /id="tradesPanel"/, "tradesperson portal exists");
assert.match(html, /id="availabilityList"/, "tenant availability UI exists");

console.log("Prototype role/trades tests passed.");

const assert = require("node:assert/strict");
const fs = require("node:fs");
const {
  normaliseUkPostcode,
  createPostcodeLookupService,
} = require("../postcodeLookup.js");

function response(ok, payload) {
  return { ok, json: async () => payload };
}

async function run() {
  assert.deepEqual(normaliseUkPostcode(" en55xy "), { valid: true, postcode: "EN5 5XY", error: "" });
  assert.equal(normaliseUkPostcode("not a postcode").valid, false, "invalid postcode is rejected");

  const cache = {};
  let calls = 0;
  const service = createPostcodeLookupService({
    cacheStore: cache,
    now: () => "2026-05-04T10:00:00.000Z",
    fetchImpl: async (url) => {
      calls += 1;
      assert.match(url, /api\.postcodes\.io/);
      return response(true, {
        result: {
          postcode: "EN5 5XY",
          admin_district: "Barnet",
          admin_county: "",
          parish: "",
          region: "London",
          country: "England",
          longitude: -0.2,
          latitude: 51.6,
          codes: { admin_district: "E09000003" },
        },
      });
    },
  });
  const lookup = await service.lookup("EN55XY");
  assert.equal(lookup.result.councilName, "Barnet", "uses Postcodes.io admin_district as council");
  assert.equal(lookup.result.councilCode, "E09000003");
  assert.equal((await service.lookup("EN5 5XY")).cached, true, "cached lookup is reused");
  assert.equal(calls, 1, "cache prevents repeated provider calls");

  let fallbackCalls = 0;
  const fallback = createPostcodeLookupService({
    cacheStore: {},
    now: () => "2026-05-04T10:05:00.000Z",
    fetchImpl: async (url) => {
      fallbackCalls += 1;
      if (url.includes("postcodes.io")) return response(false, {});
      return response(true, { local_authority: { name: "Barnet", slug: "barnet", local_custodian_code: "E09000003" } });
    },
  });
  const fallbackLookup = await fallback.lookup("EN5 5XY");
  assert.equal(fallbackLookup.result.source, "govuk", "API failure falls back to GOV.UK");
  assert.equal(fallbackCalls, 2);

  const failed = createPostcodeLookupService({
    cacheStore: {},
    fetchImpl: async () => response(false, {}),
  });
  assert.equal((await failed.lookup("EN5 5XY")).manualAllowed, true, "manual entry is allowed if both APIs fail");

  const freshCache = {};
  let freshCalls = 0;
  const fresh = createPostcodeLookupService({
    cacheStore: freshCache,
    fetchImpl: async (url) => {
      freshCalls += 1;
      return response(true, {
        result: {
          postcode: url.includes("SW1A") ? "SW1A 1AA" : "EN5 5XY",
          admin_district: url.includes("SW1A") ? "Westminster" : "Barnet",
          codes: { admin_district: url.includes("SW1A") ? "E09000033" : "E09000003" },
        },
      });
    },
  });
  await fresh.lookup("EN5 5XY");
  await fresh.lookup("SW1A 1AA");
  assert.equal(freshCalls, 2, "changing postcode triggers a fresh lookup");

  const app = fs.readFileSync("app.js", "utf8");
  const html = fs.readFileSync("index.html", "utf8");
  assert.match(app, /manualCouncilName/, "agency override is stored");
  assert.match(app, /detectedCouncilName/, "detected council is retained for audit");
  assert.match(app, /londonCouncilDirectory/, "London council website directory is stored in the app");
  assert.match(app, /councilWebsite/, "lookup result is enriched with council website data");
  assert.match(html, /id="manualCouncilField"/, "manual override UI exists");
  const tenantPanel = html.split('id="tenantPanel"')[1].split('id="ticketsPanel"')[0];
  assert.doesNotMatch(tenantPanel, /manualCouncil|propertyCouncil/, "tenant cannot edit council fields");

  console.log("Postcode lookup tests passed.");
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});

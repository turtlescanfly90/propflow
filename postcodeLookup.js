(function postcodeLookupModule(root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.PostcodeLookup = factory();
  }
})(typeof window !== "undefined" ? window : globalThis, function postcodeLookupFactory() {
  const postcodePattern = /^(GIR ?0AA|[A-Z]{1,2}\d[A-Z\d]? ?\d[A-Z]{2})$/i;

  function normaliseUkPostcode(value) {
    const compact = String(value || "").trim().toUpperCase().replace(/\s+/g, "");
    if (!compact) return { valid: false, postcode: "", error: "Enter a postcode first." };
    if (!postcodePattern.test(compact)) return { valid: false, postcode: compact, error: "Enter a valid UK postcode, for example EN5 5XY." };
    if (compact === "GIR0AA") return { valid: true, postcode: "GIR 0AA", error: "" };
    return { valid: true, postcode: `${compact.slice(0, -3)} ${compact.slice(-3)}`, error: "" };
  }

  function mapPostcodesIoResponse(payload, checkedAt) {
    const result = payload?.result;
    if (!result?.admin_district) return null;
    return {
      postcode: result.postcode,
      councilName: result.admin_district,
      councilCode: result.codes?.admin_district || "",
      adminDistrict: result.admin_district || "",
      county: result.admin_county || "",
      countyCode: result.codes?.admin_county || "",
      parish: result.parish || "",
      region: result.region || "",
      country: result.country || "",
      longitude: result.longitude ?? "",
      latitude: result.latitude ?? "",
      source: "postcodes_io",
      lastCheckedAt: checkedAt,
    };
  }

  function mapGovukResponse(payload, postcode, checkedAt) {
    const authority = payload?.local_authority || payload?.localAuthority || payload;
    const addressAuthority = Array.isArray(payload?.addresses) ? payload.addresses[0] : null;
    const name = authority?.name || addressAuthority?.name || payload?.name || "";
    if (!name) return null;
    return {
      postcode,
      councilName: name,
      councilCode: authority?.local_custodian_code || authority?.code || addressAuthority?.slug || authority?.slug || "",
      councilWebsite: authority?.homepage_url || payload?.homepage_url || "",
      adminDistrict: name,
      county: authority?.parent?.name || "",
      countyCode: authority?.parent?.slug || "",
      parish: "",
      region: "",
      country: authority?.country_name || "",
      longitude: "",
      latitude: "",
      source: "govuk",
      lastCheckedAt: checkedAt,
    };
  }

  function createPostcodeLookupService({ fetchImpl, cacheStore, now = () => new Date().toISOString() }) {
    async function lookup(postcodeInput, options = {}) {
      const normalised = normaliseUkPostcode(postcodeInput);
      if (!normalised.valid) return { ok: false, error: normalised.error, postcode: normalised.postcode, manualAllowed: true };
      const postcode = normalised.postcode;
      if (!options.force && cacheStore?.[postcode]) return { ok: true, cached: true, result: cacheStore[postcode] };
      const checkedAt = now();

      try {
        const response = await fetchImpl(`https://api.postcodes.io/postcodes/${encodeURIComponent(postcode)}`);
        if (response.ok) {
          const mapped = mapPostcodesIoResponse(await response.json(), checkedAt);
          if (mapped) {
            if (cacheStore) cacheStore[postcode] = mapped;
            return { ok: true, cached: false, result: mapped };
          }
        }
      } catch (error) {
        // GOV.UK fallback below handles network or provider failures.
      }

      try {
        const response = await fetchImpl(`https://www.gov.uk/api/local-authority?postcode=${encodeURIComponent(postcode)}`);
        if (response.ok) {
          const mapped = mapGovukResponse(await response.json(), postcode, checkedAt);
          if (mapped) {
            if (cacheStore) cacheStore[postcode] = mapped;
            return { ok: true, cached: false, result: mapped };
          }
        }
      } catch (error) {
        // Manual override remains available when both services fail.
      }

      return { ok: false, error: "Council lookup failed. You can enter the council manually.", postcode, manualAllowed: true };
    }

    return { lookup };
  }

  return {
    normaliseUkPostcode,
    mapPostcodesIoResponse,
    mapGovukResponse,
    createPostcodeLookupService,
  };
});

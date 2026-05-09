# Postcode Council Lookup

PropFlow uses postcode as the source of truth for council/local authority detection.

## Flow

1. The postcode is trimmed, uppercased, validated, and stored in canonical UK format, for example `EN5 5XY`.
2. The app checks the local `postcodeLookups` cache first.
3. If there is no cached result, it calls Postcodes.io:
   `GET https://api.postcodes.io/postcodes/{postcode}`
4. The app stores `admin_district` as the detected council/local authority.
5. If Postcodes.io fails, the app falls back to GOV.UK:
   `GET https://www.gov.uk/api/local-authority?postcode={postcode}`
6. If the detected council is a London borough or the City of London, the app enriches the result from the stored London council website directory.
7. If both services fail, agency users can manually enter the council.

## Stored Fields

The cached lookup stores postcode, council name/code, council website, admin district, county, region, country, latitude, longitude, source, and last checked date.

Properties keep both values:

- `detectedCouncilName`: the automatic lookup result.
- `manualCouncilName`: agency override, if used.

If an agency overrides a council, the manual value is used in the UI while the detected value is kept for audit.

## Permission Rule

Council lookup and override are agency-side controls only. Tenant screens do not include council edit fields.

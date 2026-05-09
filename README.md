# PropFlow

PropFlow is a property-management SaaS prototype for estate agencies, tenants, landlords, and tradespeople.

## What is included

- Agency dashboard for properties, repairs, documents, finance, notifications, councils, and team settings.
- Tenant portal for assigned-property access, repair reporting, documents, rent, and messages.
- Landlord placeholder portal for future owner/property relationships.
- Tradesperson workspace for assigned jobs and repair workflow.
- Supabase email/password authentication with role-based routing.
- Vercel deployment support and PWA files for phone testing.

## Local setup

This project is a static frontend with a small Vercel API function for Supabase config.

1. Copy `.env.example` values into Vercel project environment variables.
2. Set:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
3. Run the Supabase SQL in `database/auth_schema.sql` or `database/fix_profiles_rls.sql`.
4. Deploy with Vercel.

## Important

Do not commit real Supabase keys, service-role keys, or local `.env` files.

# PropFlow Authentication And Roles

## Auth Provider

PropFlow now uses Supabase Auth for real email/password authentication.

Passwords are handled by Supabase Auth. They are not stored in frontend code, demo state, or localStorage.

## Environment Variables

Set these in Vercel Project Settings:

- `SUPABASE_URL`
- `SUPABASE_ANON_KEY`

This app is plain HTML/CSS/JavaScript, not Vite and not Next.js.

Use the exact names above. Do not use only `VITE_SUPABASE_URL` or `NEXT_PUBLIC_SUPABASE_URL` for this app.

The frontend loads these from `/api/auth-config`. `auth-config.generated.js`, which Vercel creates during `npm run build`, remains as a fallback.

After changing Vercel environment variables, trigger a fresh deployment. Existing deployments keep the values they were built with.

Never expose or use the Supabase service role key in the frontend.

## Profile Table

Role is stored in Supabase, not in frontend state.

Table: `public.profiles`

Fields:

- `id uuid primary key references auth.users(id)`
- `email text unique`
- `role text check(role in ('agency', 'landlord', 'tenant'))`
- `created_at timestamptz`
- `updated_at timestamptz`

Run:

- `database/auth_schema.sql`

If signup fails with `new row violates row-level security policy for table "profiles"`, run:

- `database/fix_profiles_rls.sql`

## Signup

User enters:

- email
- password
- confirm password
- role: agency, landlord, or tenant

The app creates a Supabase Auth user and stores the role in `public.profiles`.

## Login

User enters:

- email
- password

The app logs in through Supabase Auth, reads `public.profiles.role`, and routes to the correct portal.

If an account exists without a role, the app shows the role selection screen before allowing access.

## Routing

After login:

- `agency` -> agency dashboard
- `landlord` -> landlord dashboard placeholder
- `tenant` -> tenant portal

Frontend route protection redirects a user back to their own allowed portal if they try another role area.

## Fake User Logic Removed

The old account switcher and frontend-only role switching are no longer used for access.

Demo tenants/properties/repairs still exist as sample business data until we replace them with real database-backed property relationships.

## Future Relationship Model

Next tables can extend this foundation:

- `agencies`
- `landlords`
- `properties`
- `tenancies`
- `agency_landlords`
- `landlord_properties`
- `tenant_tenancies`
- `tradespeople`
- `maintenance_assignments`

Future relationships:

- Agency manages many landlords
- Landlord owns many properties
- Tenant is linked to one active tenancy/property
- Tradesperson is assigned to jobs

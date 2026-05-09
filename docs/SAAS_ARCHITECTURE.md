# PropFlow SaaS Architecture

PropFlow should be built as a multi-tenant SaaS platform first, then extended into iOS and Android apps once the core workflows are stable.

## Product Shape

The product has five account areas:

1. Super admin
   - Manages agencies, billing plans, support, platform settings.
2. Agency admin
   - Manages branding, staff, branches, document rules, contractor lists.
3. Agency staff / property manager
   - Manages tenants, repairs, paperwork, compliance, landlord approvals.
4. Tenant
   - Reports repairs, uploads evidence, views tenant-visible documents, tracks requests.
5. Contractor / tradesperson
   - Receives assigned jobs, updates status, uploads quotes, invoices, completion evidence.

Optional later:

6. Landlord
   - Approves repair quotes, sees documents, views property reports.

## Recommended Build Path

### Phase 1: SaaS Web App

Build the real web platform first.

Core stack recommendation:

- Frontend: Next.js or React
- Backend: Node API or Supabase Edge Functions
- Database: Postgres
- Auth: Supabase Auth, Auth0, Clerk, or custom JWT auth
- File storage: Supabase Storage, Amazon S3, Google Cloud Storage, or Azure Blob
- Email: Resend, SendGrid, Postmark
- SMS/WhatsApp later: Twilio
- AI document extraction: OpenAI document/image processing pipeline

Why web first:

- Agencies work from laptops/desktops.
- Faster B2B onboarding.
- Easier to iterate on workflows.
- Mobile apps can share the same backend later.

### Phase 2: Mobile App

Build mobile apps after the web SaaS is working.

Recommended mobile route:

- React Native with Expo
- Shared API backend with web app
- Tenant app first
- Contractor app second
- Agency admin mobile features later

Mobile app publishing:

- iOS: Apple Developer Program required
- Android: Google Play Console required
- App review, privacy policy, support URL, data safety forms required

## Multi-Tenant Model

Every major data row belongs to an agency.

Important rule:

```text
agency_id must exist on properties, tenants, documents, repairs, contractors, users, and workflows.
```

This prevents one agency seeing another agency's data.

## Document Storage Model

Never store real PDFs directly in normal database rows.

Use:

- Database: document metadata
- Secure storage: actual file
- Backend: permission checks
- Temporary signed URLs: document viewing

View flow:

```text
User clicks View
Backend checks role and agency/property access
Backend checks tenant-visible/private permission
Backend creates short-lived signed URL
Frontend opens preview
Audit event is recorded
```

## AI Certificate Extraction

For EICR, gas safety, EPC, and other certificates:

1. User uploads document.
2. Backend stores original securely.
3. AI extracts:
   - certificate type
   - property address
   - issue date
   - inspection date
   - expiry date if present
   - validity wording, for example 5 years
   - electrician / engineer name
   - registration body if visible
4. Backend calculates expiry if needed.
5. App creates reminders.
6. Human can review and confirm.

For safety, AI results should be marked as "Needs review" until confirmed by agency staff.

## Google Sheets / CSV Sync

Short term:

- CSV import/export using stable templates.

Medium term:

- Google Sheets OAuth connection per agency.
- Agency maps sheet tabs to PropFlow objects.
- Scheduled sync imports changes.
- Export writes app data back to Google Sheet.

Important:

Google Sheets should not be the main database. It should be an import/export and operational bridge.

## Compliance Features

Core UK lettings reminders:

- Gas safety certificate
- Electrical safety certificate / EICR
- EPC
- Deposit certificate
- Inventory/check-in
- Right to rent evidence
- HMO licence where applicable
- Insurance documents
- Tenancy agreement

The app should support configurable rules because requirements can vary by nation, property type, agency process, and future law changes.

## Security Requirements

Minimum real-world requirements:

- Role-based access control
- Agency-level data isolation
- Tenant/property access restrictions
- Signed file URLs
- Audit log for document views, uploads, deletes, visibility changes
- Backups
- GDPR deletion/export tools
- Encrypted storage
- Secure password/auth provider
- Rate limiting
- Admin action logs

## Billing Model

Likely SaaS pricing:

- Starter: small agency, limited properties
- Growth: larger portfolio, more staff, document automation
- Enterprise: multi-branch, SSO, custom workflows, API access

Pricing can be per:

- agency
- branch
- property count
- active tenancy count
- document automation usage
admin / contractor seats


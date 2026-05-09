# PropFlow API Contract

This is the first API shape for turning the prototype into a real SaaS app.

## Auth

All endpoints require authenticated users except public invite/accept flows.

Every request should include:

```text
Authorization: Bearer <token>
```

Backend resolves:

- user_id
- agency_id
- role
- permissions

## Subscription And Login Model

Agency onboarding:

```text
Agency signs up with email
Agency verifies email
Agency creates organisation profile
Agency chooses subscription plan
Agency admin invites staff, tenants, contractors, and landlords
```

Tenant access:

```text
Agency creates or imports tenant record
Agency links tenant to a property/tenancy
Agency invites tenant by email
Tenant verifies email
Tenant can only see their authorised tenancy, property address, repairs, and tenant-visible documents
```

Important:

Tenants do not automatically see every document at the agency. A document must be:

- linked to their property or tenancy
- marked tenant-visible
- inside an active or authorised tenancy period

Agency staff can tailor access per individual by controlling:

- tenant-property link
- document visibility
- role
- tenancy status
- branch or portfolio access

## Core Endpoints

### Agencies

```text
GET    /api/agencies/current
PATCH  /api/agencies/current
POST   /api/agencies/current/branding
```

### Users and Roles

```text
GET    /api/users
POST   /api/users/invite
PATCH  /api/users/:id
POST   /api/users/:id/disable
```

### Properties

```text
GET    /api/properties
POST   /api/properties
GET    /api/properties/:id
PATCH  /api/properties/:id
```

### Tenants

```text
GET    /api/tenants
POST   /api/tenants
GET    /api/tenants/:id
PATCH  /api/tenants/:id
POST   /api/tenants/:id/end-tenancy
POST   /api/tenants/:id/reactivate
```

### Repairs

```text
GET    /api/repairs
POST   /api/repairs
GET    /api/repairs/:id
PATCH  /api/repairs/:id
POST   /api/repairs/:id/media
POST   /api/repairs/:id/availability
PATCH  /api/repairs/:id/availability/:windowId
POST   /api/repairs/:id/assign-contractor
POST   /api/repairs/:id/propose-appointment
POST   /api/repairs/:id/confirm-appointment
POST   /api/repairs/:id/request-reschedule
POST   /api/repairs/:id/request-landlord-approval
POST   /api/repairs/:id/complete
POST   /api/repairs/:id/tenant-confirmation
POST   /api/repairs/:id/invoices
```

### Tradesperson Jobs

```text
GET    /api/trades/jobs
GET    /api/trades/jobs/:id
POST   /api/trades/jobs/:id/accept
POST   /api/trades/jobs/:id/decline
POST   /api/trades/jobs/:id/propose-appointment
POST   /api/trades/jobs/:id/status
POST   /api/trades/jobs/:id/work-notes
POST   /api/trades/jobs/:id/invoice
```

### Documents

```text
GET    /api/documents
POST   /api/documents/upload-url
POST   /api/documents
GET    /api/documents/:id
PATCH  /api/documents/:id
POST   /api/documents/:id/view-url
POST   /api/documents/:id/run-ai-extraction
POST   /api/documents/:id/confirm-ai-extraction
```

Document upload flow:

```text
Frontend asks for upload URL
Backend creates storage path and signed upload URL
Frontend uploads file directly to storage
Frontend creates document metadata record
Backend starts AI extraction job if relevant
```

Document view flow:

```text
Frontend asks for view URL
Backend checks permission
Backend logs audit event
Backend returns short-lived signed URL
Frontend previews file
```

### CSV and Google Sheets

```text
POST   /api/imports/csv
GET    /api/imports/:id
GET    /api/exports/tenants.csv
GET    /api/exports/documents.csv
POST   /api/google-sheets/connect
POST   /api/google-sheets/sync-now
GET    /api/google-sheets/mappings
PATCH  /api/google-sheets/mappings
```

## Permissions

Super admin:

- all platform actions

Agency admin:

- all agency actions
- billing/config
- staff invites

Property manager:

- properties, tenants, repairs, documents
- no billing

Tenant:

- own tenancy
- own repair tickets
- tenant-visible documents only

Contractor:

- assigned repairs only
- limited documents/evidence only when explicitly shared
- tenant-uploaded repair media and access notes for assigned jobs only
- no tenant documents, tenancy agreements, rent records, or agency financial dashboards

Landlord:

- own properties
- approval tasks
- landlord-visible documents

## AI Extraction Payload

Example result:

```json
{
  "document_type": "Electrical safety certificate / EICR",
  "property_address": "21 Park View, Birmingham B13",
  "issue_date": "2021-05-15",
  "validity_years": 5,
  "expiry_date": "2026-05-15",
  "electrician_name": "Example Electrician",
  "registration_body": "NICEIC",
  "confidence": 0.87,
  "needs_human_review": true
}
```

Rule:

AI can suggest expiry dates, but agency staff should confirm them before the app marks them as official.

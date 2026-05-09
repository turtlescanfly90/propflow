-- PropFlow real-world SaaS database foundation.
-- Designed for Postgres/Supabase-style deployments.

create table agencies (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text unique not null,
  logo_url text,
  primary_colour text default '#14745f',
  plan text default 'starter',
  created_at timestamptz not null default now()
);

create table users (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid references agencies(id) on delete cascade,
  email text unique not null,
  full_name text not null,
  role text not null check (role in ('super_admin', 'agency_admin', 'property_manager', 'tenant', 'contractor', 'landlord')),
  phone text,
  status text not null default 'active' check (status in ('active', 'invited', 'disabled')),
  created_at timestamptz not null default now()
);

create table subscriptions (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  plan text not null default 'starter',
  status text not null default 'trialing' check (status in ('trialing', 'active', 'past_due', 'cancelled')),
  billing_email text not null,
  current_period_start date,
  current_period_end date,
  created_at timestamptz not null default now()
);

create table tenant_access_grants (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  tenancy_id uuid references tenancies(id) on delete cascade,
  granted_by uuid references users(id) on delete set null,
  status text not null default 'active' check (status in ('active', 'revoked', 'expired')),
  granted_at timestamptz not null default now(),
  revoked_at timestamptz
);

create table branches (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  name text not null,
  address text,
  postcode text,
  created_at timestamptz not null default now()
);

create table landlords (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  created_at timestamptz not null default now()
);

create table properties (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  branch_id uuid references branches(id) on delete set null,
  landlord_id uuid references landlords(id) on delete set null,
  address text not null,
  postcode text not null,
  detected_council_name text,
  manual_council_name text,
  council_source text default 'not_checked' check (council_source in ('not_checked', 'postcodes_io', 'govuk', 'manual')),
  postcode_lookup_id uuid,
  property_type text,
  status text not null default 'managed' check (status in ('managed', 'inactive', 'archived')),
  created_at timestamptz not null default now()
);

create table postcode_lookups (
  id uuid primary key default gen_random_uuid(),
  postcode text unique not null,
  council_name text,
  council_code text,
  admin_district text,
  county text,
  region text,
  country text,
  latitude numeric(10, 7),
  longitude numeric(10, 7),
  source text not null check (source in ('postcodes_io', 'govuk', 'manual')),
  last_checked_at timestamptz not null default now()
);

alter table properties
  add constraint fk_properties_postcode_lookup
  foreign key (postcode_lookup_id) references postcode_lookups(id) on delete set null;

create table tenants (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  full_name text not null,
  email text,
  phone text,
  status text not null default 'active' check (status in ('active', 'ended', 'applicant', 'archived')),
  created_at timestamptz not null default now()
);

create table tenancies (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  start_date date not null,
  end_date date,
  rent_amount numeric(12, 2),
  deposit_amount numeric(12, 2),
  status text not null default 'active' check (status in ('active', 'ending', 'ended', 'draft')),
  created_at timestamptz not null default now()
);

create table contractors (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  company_name text not null,
  trade text not null,
  contact_name text,
  email text,
  phone text,
  coverage_area text,
  status text not null default 'approved' check (status in ('approved', 'pending', 'disabled')),
  created_at timestamptz not null default now()
);

create table repair_tickets (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  property_id uuid not null references properties(id) on delete cascade,
  tenant_id uuid references tenants(id) on delete set null,
  contractor_id uuid references contractors(id) on delete set null,
  issue_type text not null,
  priority text not null check (priority in ('Emergency', 'Urgent', 'Routine')),
  status text not null default 'New',
  trade text,
  description text,
  landlord_approval_status text default 'not_required',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  tenancy_id uuid references tenancies(id) on delete set null,
  tenant_id uuid references tenants(id) on delete set null,
  uploaded_by uuid references users(id) on delete set null,
  document_type text not null,
  file_name text not null,
  storage_path text not null,
  mime_type text,
  file_size_bytes bigint,
  issue_date date,
  validity_years numeric(5, 2),
  expiry_date date,
  visibility text not null default 'private' check (visibility in ('tenant', 'private', 'landlord', 'contractor')),
  ai_status text not null default 'not_processed' check (ai_status in ('not_processed', 'processing', 'needs_review', 'confirmed', 'failed')),
  ai_extracted_json jsonb,
  notes text,
  created_at timestamptz not null default now()
);

create table document_audit_events (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  document_id uuid not null references documents(id) on delete cascade,
  actor_user_id uuid references users(id) on delete set null,
  event_type text not null check (event_type in ('uploaded', 'viewed', 'downloaded', 'updated', 'visibility_changed', 'deleted', 'ai_reviewed')),
  event_meta jsonb,
  created_at timestamptz not null default now()
);

create table reminders (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  property_id uuid references properties(id) on delete cascade,
  document_id uuid references documents(id) on delete cascade,
  reminder_type text not null,
  due_date date not null,
  status text not null default 'open' check (status in ('open', 'snoozed', 'completed', 'cancelled')),
  assigned_user_id uuid references users(id) on delete set null,
  created_at timestamptz not null default now()
);

create table import_jobs (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  source_type text not null check (source_type in ('csv', 'google_sheets')),
  object_type text not null check (object_type in ('tenants', 'properties', 'contractors', 'documents', 'repairs')),
  status text not null default 'pending' check (status in ('pending', 'processing', 'completed', 'failed')),
  rows_total integer default 0,
  rows_success integer default 0,
  rows_failed integer default 0,
  error_report jsonb,
  created_at timestamptz not null default now()
);

create index idx_users_agency_role on users(agency_id, role);
create index idx_subscriptions_agency on subscriptions(agency_id, status);
create index idx_tenant_access on tenant_access_grants(agency_id, tenant_id, property_id, status);
create index idx_properties_agency on properties(agency_id);
create index idx_postcode_lookups_postcode on postcode_lookups(postcode);
create index idx_tenants_agency_status on tenants(agency_id, status);
create index idx_tenancies_property_status on tenancies(property_id, status);
create index idx_repairs_agency_status on repair_tickets(agency_id, status);
create index idx_documents_agency_property on documents(agency_id, property_id);
create index idx_documents_expiry on documents(agency_id, expiry_date);
create index idx_reminders_due on reminders(agency_id, due_date, status);

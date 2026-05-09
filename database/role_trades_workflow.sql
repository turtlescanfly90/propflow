-- Role separation and tradesperson workflow addendum.
-- Apply after the base schema when moving the prototype into Postgres/Supabase.

alter table repair_tickets
  add column if not exists preferred_contact_method text,
  add column if not exists access_notes text,
  add column if not exists permission_to_enter_absent boolean not null default false,
  add column if not exists estimated_cost numeric(12, 2),
  add column if not exists actual_cost numeric(12, 2),
  add column if not exists open_pool boolean not null default false;

alter table repair_tickets
  drop constraint if exists repair_tickets_status_check;

alter table repair_tickets
  add constraint repair_tickets_status_check check (
    status in (
      'Reported',
      'Reviewed',
      'Awaiting tenant availability',
      'Assigned to tradesperson',
      'Appointment proposed',
      'Appointment confirmed',
      'In progress',
      'Completed',
      'Tenant confirmation pending',
      'Closed',
      'Cancelled'
    )
  );

create table if not exists maintenance_request_media (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  repair_ticket_id uuid not null references repair_tickets(id) on delete cascade,
  uploaded_by uuid references users(id) on delete set null,
  storage_path text not null,
  file_name text not null,
  mime_type text,
  visibility text not null default 'job_participants' check (visibility in ('job_participants', 'agency_only')),
  created_at timestamptz not null default now()
);

create table if not exists tenant_availability_windows (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  repair_ticket_id uuid not null references repair_tickets(id) on delete cascade,
  tenant_id uuid not null references tenants(id) on delete cascade,
  label text not null,
  starts_at timestamptz,
  ends_at timestamptz,
  status text not null default 'available' check (status in ('available', 'superseded', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now()
);

create table if not exists maintenance_appointments (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  repair_ticket_id uuid not null references repair_tickets(id) on delete cascade,
  tenant_id uuid references tenants(id) on delete set null,
  property_id uuid references properties(id) on delete cascade,
  tradesperson_id uuid references contractors(id) on delete set null,
  proposed_by uuid references users(id) on delete set null,
  proposed_start timestamptz,
  proposed_end timestamptz,
  confirmed_start timestamptz,
  confirmed_end timestamptz,
  status text not null default 'proposed' check (status in ('proposed', 'confirmed', 'reschedule_requested', 'completed', 'cancelled')),
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists tradesperson_job_assignments (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  repair_ticket_id uuid not null references repair_tickets(id) on delete cascade,
  contractor_id uuid not null references contractors(id) on delete cascade,
  assigned_by uuid references users(id) on delete set null,
  status text not null default 'assigned' check (status in ('assigned', 'accepted', 'declined', 'in_progress', 'completed', 'cancelled')),
  decline_reason text,
  created_at timestamptz not null default now()
);

create table if not exists maintenance_job_status_history (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  repair_ticket_id uuid not null references repair_tickets(id) on delete cascade,
  actor_user_id uuid references users(id) on delete set null,
  status text not null,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists invoice_attachments (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies(id) on delete cascade,
  repair_ticket_id uuid not null references repair_tickets(id) on delete cascade,
  contractor_id uuid references contractors(id) on delete set null,
  storage_path text not null,
  file_name text not null,
  amount numeric(12, 2),
  status text not null default 'submitted' check (status in ('submitted', 'approved', 'paid', 'rejected')),
  created_at timestamptz not null default now()
);

create index if not exists idx_media_repair on maintenance_request_media(repair_ticket_id);
create index if not exists idx_availability_repair on tenant_availability_windows(repair_ticket_id, tenant_id);
create index if not exists idx_appointments_repair on maintenance_appointments(repair_ticket_id, status);
create index if not exists idx_trades_assignments_contractor on tradesperson_job_assignments(contractor_id, status);

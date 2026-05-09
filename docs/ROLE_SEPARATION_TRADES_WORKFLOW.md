# Role Separation And Tradesperson Workflow

## Portals

PropFlow now treats the three portals as separate workspaces:

- Tenant users can only access the tenant portal.
- Agency users can only access agency dashboards and coordination screens.
- Contractor users can only access the tradesperson dashboard.

The prototype enforces this in `allowedPanelForUser`. The production backend must enforce the same rule on every route and API handler.

## Tenant Availability Workflow

Tenants submit maintenance requests with:

- Issue photos or videos.
- Multiple availability windows.
- Access notes such as parking, gate code, pets, preferred contact, and permission to enter if absent.

Availability can be edited while the appointment is not confirmed. Once confirmed, the tenant should request a reschedule instead of editing the confirmed appointment directly.

## Agency Coordination

Agency staff can review:

- Tenant media.
- Availability windows.
- Access notes.
- Job urgency.
- Assigned tradesperson.
- Appointment proposal.
- Estimated and actual cost.
- Invoice or receipt attachment.

Agency users remain blocked from the tenant portal.

## Tradesperson Dashboard

Tradesperson users only see jobs assigned to their contractor email, or jobs explicitly published to an open pool. They can:

- Accept or decline a job.
- Propose an appointment from tenant availability.
- Mark en route or arrived.
- Add work notes.
- Upload invoice or receipt.
- Mark complete, which moves the job to tenant confirmation pending.

They cannot see tenant documents, tenancy agreements, rent/finance dashboards, or unrelated properties.

## Appointment Flow

Recommended flow:

1. Tenant reports issue, uploads media, and adds availability.
2. Agency reviews and assigns a tradesperson.
3. Tradesperson sees tenant availability and proposes a visit.
4. Agency confirms or adjusts the appointment.
5. Tenant receives notification and can request reschedule if needed.
6. Tradesperson completes the job.
7. Tenant confirms whether the repair is resolved.

## Permission Model

Production endpoints should enforce:

- `/tenant/*` and tenant APIs require tenant role and active tenancy scope.
- `/agency/*` and agency APIs require agency staff role and agency scope.
- `/trades/*` and trades APIs require contractor role and assigned/open job scope.
- Tenant media is visible only to the uploading tenant, managing agency, and assigned tradesperson.
- Access notes are sensitive and must never be exposed publicly.
- Media should use private storage with signed URLs.

The database addendum is in `database/role_trades_workflow.sql`.

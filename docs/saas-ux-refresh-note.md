# SaaS UX refresh developer note

## Design system

The prototype now uses lightweight design tokens in `styles.css` rather than adding a new framework. This keeps the current static app simple while moving the interface toward a polished SaaS style:

- Background: `#F5F7FB`
- Cards: white with thin `#E5E7EB` borders
- Primary: blue
- Accent: teal/green
- Status colours: red, orange, green, grey, blue
- Rounded cards use 16px to 20px radius
- Inter/system font stack remains the default

Reusable UI patterns are implemented as CSS/JS components:

- App shell/sidebar/page header through the existing shell
- Stat cards via `.metric-card`
- Chart cards via `.chart-card`, `.bar-chart`, `.donut-chart`
- Data tables via `.data-table` and `.data-row`
- Status badges via `.status-chip`
- Timeline via `renderTimeline()` and `.timeline-list`
- Property/repair/document cards via existing render helpers
- Tenant action cards via `.tenant-action-card`

## Portal separation

Role separation remains handled by the existing guards:

- tenant users can only access `tenantPanel`
- tradesperson users can only access `tradesPanel`
- agency users can access agency panels only

The UX now makes the separation clearer:

- Agency portal: KPI cards, charts, tables, filters, property operations
- Tenant portal: simple action cards, no charts, no property dropdown
- Tradesperson portal: job-focused cards, visit time, status, invoice actions

## Routing and filters

The prototype supports lightweight query routing for dashboard shortcuts:

- `?panel=ticketsPanel&status=open`
- `?panel=ticketsPanel&urgency=urgent`
- `?panel=documentsPanel&filter=expiring`
- `?panel=financePanel&filter=arrears`
- `?panel=propertiesPanel`

Static path-style routes such as `/agency/repairs?status=open` are also interpreted when the dev server falls back to `index.html`.

## Mock data

Charts use the existing demo state. A few historical rent chart bars are still sample values and should be replaced with real monthly aggregation when a backend exists.

TODO: connect charts and dashboard reminders to backend analytics once real server data is available.

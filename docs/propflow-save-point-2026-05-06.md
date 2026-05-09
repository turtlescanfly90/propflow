# PropFlow Save Point - 2026-05-06

## Current Product

PropFlow is a static web app prototype for UK estate agency operations.

It currently includes:

- Agency dashboard
- Properties dashboard and property detail workspace
- Tenant portal
- Tradesperson dashboard
- Repairs and maintenance workflow
- Tenant repair photo/media flow
- Documents and certificates
- Rent/financial overview
- London postcode/council lookup support
- PWA support for adding to phone home screen
- Vercel deployment configuration

## Framework

This is a static app, not React, Next.js, or Vite.

Main files:

- `index.html`
- `styles.css`
- `app.js`
- `postcodeLookup.js`
- `manifest.webmanifest`
- `sw.js`

## Deployment

Prepared for Vercel static deployment.

Deployment files:

- `vercel.json`
- `.vercelignore`
- `DEPLOYMENT.md`

Recommended project name:

- `propflow`

Deploy commands:

```powershell
cd "C:\Users\cihat\Documents\Codex\2026-04-28\can-i-make-apps-with-you"
vercel
vercel --prod
```

## Phone Testing

Open the Vercel live URL on the phone.

On iPhone:

1. Open URL in Safari.
2. Tap Share.
3. Tap Add to Home Screen.
4. Tap Add.

## Latest UI State

Latest completed UI work:

- Tenant portal redesigned as simple mobile-first home screen.
- Tenant sees tenant-only navigation.
- No tenant property dropdown.
- Tenant property is resolved from authorised tenant record.
- Report a repair is the primary CTA.
- Tenant documents are tenant-visible only.
- Tenant repair cards show open requests for assigned property only.
- KPI cards have subtle coloured circular icons.
- Council buttons are aligned, equal-height SaaS-style actions.
- Property detail panel uses true active-tab rendering via `activeDetailTab`.

## Important Prototype Notes

The app still uses browser `localStorage` demo data.

Before real commercial launch, replace demo storage with:

- Real backend
- Database
- Authentication
- Server-side permissions
- Secure file storage
- Proper tenant/agency/trades account separation
- Production email/SMS/push notifications
- Privacy policy and terms

## Next Suggested Step

After confirming the Vercel phone link works:

1. Add real login/auth foundation.
2. Add backend database schema.
3. Move documents/photos to secure cloud storage.
4. Turn prototype workflows into production API-backed workflows.

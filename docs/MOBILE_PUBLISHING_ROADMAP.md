# iOS and Android Publishing Roadmap

PropFlow can be published on iOS and Android after the SaaS backend exists.

## Recommended Route

Use React Native with Expo for mobile apps.

Build order:

1. Tenant mobile app
2. Contractor mobile app
3. Agency companion app

The agency dashboard should stay web-first because property managers usually work on larger screens.

## Mobile App Features

### Tenant App

- Login
- View tenancy/property
- Report repair
- Upload photos/videos
- Track repair status
- View tenant-visible documents
- Push notifications
- Message agency

### Contractor App

- Login
- View assigned jobs
- Accept/decline
- See access notes
- Upload quote
- Mark scheduled/in progress/completed
- Upload completion photos
- Upload invoice

### Agency App

- Repair triage
- Urgent notifications
- Contractor assignment
- Document expiry alerts
- Landlord approval alerts

## Publishing Requirements

### Apple App Store

- Apple Developer Program account
- App privacy policy
- Support URL
- App screenshots
- Data collection disclosure
- TestFlight testing
- App Review approval

### Google Play Store

- Google Play Console account
- Privacy policy
- Data safety form
- Screenshots
- Internal testing track
- Production review

## Technical Requirements

- Shared backend API
- Secure token storage
- Push notification service
- Deep links to repair/document records
- File upload from camera/gallery
- Offline-friendly draft repair reports
- Error reporting and analytics

## Important Product Decision

Do not build mobile first.

Build the SaaS backend and web dashboard first, because:

- Agencies are the paying B2B customer.
- The data model must be stable.
- Mobile apps need the same backend anyway.
- App Store review slows down iteration.

Once agencies can manage tenants, repairs, and documents reliably, mobile apps become a strong distribution channel.


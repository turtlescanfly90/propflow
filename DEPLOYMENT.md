# PropFlow Deployment

## Framework

This is a static web app, not React, Next.js, or Vite. It uses plain HTML, CSS, JavaScript, and a small Vercel API function for runtime Supabase config.

Main files:

- `index.html`
- `styles.css`
- `app.js`
- `postcodeLookup.js`
- `manifest.webmanifest`
- `sw.js`

## Deploy on Vercel

1. Create a GitHub repository and upload this project folder.
2. Go to Vercel and choose **Add New Project**.
3. Import the GitHub repository.
4. Framework preset: **Other**.
5. Build command: `npm run build`.
6. Output directory: `.`.
7. Deploy.

After deployment, Vercel will give you a live URL such as:

`https://your-project-name.vercel.app`

Open that URL on your phone.

## Install On Phone

On iPhone:

1. Open the Vercel URL in Safari.
2. Tap Share.
3. Tap **Add to Home Screen**.
4. Tap **Add**.

On Android:

1. Open the Vercel URL in Chrome.
2. Tap the menu.
3. Tap **Add to Home screen** or **Install app**.

## Notes

- The app currently stores demo data in browser `localStorage`.
- The deployment config keeps `sw.js` fresh so phone app updates are picked up.
- Supabase auth needs `SUPABASE_URL` and `SUPABASE_ANON_KEY` in Vercel Environment Variables for Production, then a fresh deployment. The app reads them through `/api/auth-config`; the build also creates `auth-config.generated.js` as a fallback.
- For a production SaaS, the next step is replacing demo browser storage with a real backend, database, authentication, and secure file storage.

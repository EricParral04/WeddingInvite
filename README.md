# Sonia & Eric's wedding guest-list test

A React, TypeScript, and Vite site deployed on GitHub Pages.

## Local development

```sh
npm ci
npm run dev
```

Check the production build with `npm run build`.

## Wedding and RSVP details

The couple facts and quiz are in `src/App.tsx`. Update the invitation details there when the date and venue are confirmed. To connect RSVPs:

1. Create a Google Form with guest name, email (optional), party size, names of additional guests, dietary/accessibility needs, and an optional song request.
2. In the Form's **Responses** tab, choose **Link to Sheets** to create its response spreadsheet.
3. Paste the form's public responder URL into `COUPLE.googleFormUrl` in `src/App.tsx`.

The RSVP link stays hidden until that URL is configured. The site does not collect or store guest data itself.

## GitHub Pages

Pushes to `main` build and deploy the site using `.github/workflows/pages.yml`. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.

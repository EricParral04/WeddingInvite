# Sonia & Eric's wedding guest-list test

A React, TypeScript, and Vite site deployed on GitHub Pages.

## Local development

```sh
npm ci
npm run dev
```

Check the production build with `npm run build`.

## Wedding and RSVP details

The couple facts, quiz, gallery photo paths, and RSVP URL are in `src/App.tsx`. Update the invitation details there when the date and venue are confirmed. The three gallery frames currently show artwork placeholders; once photos are supplied, add the image files under `public/images/` and set their paths in `COUPLE.galleryPhotos`.

Guests see the RSVP form only after passing the quiz. To collect responses in a Sheet:

1. Create a Google Form with guest name, party size (no limit), additional guest names, and any optional dietary/accessibility notes or song request.
2. In the Form's **Responses** tab, choose **Link to Sheets** to create its response spreadsheet.
3. Paste the form's public responder URL into `COUPLE.googleFormUrl` in `src/App.tsx`.

The site does not collect or store guest responses itself.

## Visual direction

The gallery styling takes cues from Oaxaca's historic green-quarry architecture and the Museo Textil de Oaxaca's focus on textiles, design, and creative process. The geometric frame patterns on this site are original decorative artwork, not reproductions of a community-specific textile design.

- [Museo Textil de Oaxaca — museum and building history](https://museotextildeoaxaca.org/museo/)
- [Oaxaca tourism — Oaxaca City and its green quarry architecture](https://www.oaxaca.travel/index.php/en-us/all-destinations/ciudad-de-oaxaca-en)

## GitHub Pages

Pushes to `main` build and deploy the site using `.github/workflows/pages.yml`. In repository **Settings → Pages → Build and deployment**, choose **GitHub Actions** as the source.

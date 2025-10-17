# Personal Portfolio (Static)

A clean, fast, and responsive personal portfolio. It includes:

- About section
- Projects and Skills sections
- Contact section with a mailto form (no backend required)
- Mobile menu and light/dark theme toggle (saved in localStorage)

## Customize

Edit these in the files below:

- `index.html`
  - Replace "Your Name" and text content in About
  - Update social links and project details/links
- `script.js`
  - Set your email address: change `CONTACT_EMAIL` or the `data-email` on the contact form
- `assets/img/avatar.svg`
  - Replace with your photo or graphic (keep the same filename or update the `img` src)
- `assets/favicon.svg`
  - Replace with your own favicon if you like

Optional:
- Add your resume and link to it from the About section.

## Run locally

Open `index.html` directly in your browser, or use a local server for better routing:

- If you have the Live Server extension in VS Code, right-click `index.html` and choose "Open with Live Server".

## Deploy

You can deploy this static site anywhere:

- GitHub Pages
- Netlify / Vercel / Azure Static Web Apps
- Any static hosting (upload the folder contents)

## Notes

- No data is sent to any server. The contact form creates an email draft in your default mail client using `mailto:`.
- The theme toggler cycles between light and dark; initial mode follows system preference unless you choose a mode.

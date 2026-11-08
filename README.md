# Yamaha MotoCare PH (2026 Edition)

Offline-first PWA: 19 Yamaha models, multi-bike garage, wear tracker with a severe-duty x0.70 factor, parts search and torque vault. No build step and no external dependencies.

## Deploy to GitHub Pages
1. Create a GitHub repository and upload the contents of this folder (`index.html` must be in the repo root).
2. Open **Settings > Pages**. Under **Build and deployment**, choose **Deploy from a branch**, select `main` and `/ (root)`, then **Save**.
3. After about a minute the site is live at `https://<user>.github.io/<repo>/`.

## Install
- **iPhone/iPad (Safari):** Share > **Add to Home Screen**. Web notifications need iOS 16.4+ and a Home Screen install.
- **Android (Chrome):** menu > **Install app**.
- **Desktop (Chrome/Edge):** install icon in the address bar.

## Verify
- DevTools > Application: the manifest shows no errors and the service worker is activated.
- Network tab > **Offline**, reload: the app loads. `offline.html` is a plain HTML spec table that works with JavaScript off.
- Run a Lighthouse PWA audit.

## Data warning
Part numbers, capacities and torque values in `js/db.js` were supplied by the project owner and are marked `verified:true` or `verified:false` per block. They have not been checked against Yamaha manuals. Confirm every value with your Yamaha dealer or the service manual before buying parts or tightening fasteners.

## Maintenance
- Bump the version `V` in `sw.js` after each release so users receive new files.
- Data lives in `js/db.js`. App state is stored locally under `motocare.v3`. Use Settings > Export backup, because iOS can clear storage after 7 days without use.
- Web Push needs your own server and a VAPID key (`Notif.subscribePush`). Without one, MotoCare notifies on app open and exports calendar reminders.

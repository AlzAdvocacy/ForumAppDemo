# Alz Advocacy Forum app prototype (installable demo)

A phone-installable version of the Advocacy Forum attendee app prototype. It opens full screen from the Home Screen, works without a signal after the first open, and includes persona links, a demo clock, and a Map page. Every name, meeting and schedule in it is fictional.

## Put it on GitHub Pages

1. In the Alz Advocacy GitHub organization, create a new repository, for example `forum-app-demo`. On a free organization plan the repository has to be **Public** for Pages to work.
2. Unzip the download. In the new repository, click **Add file**, then **Upload files**. Drag everything inside the `forum-app` folder onto the page, including the `fonts`, `icons`, `img` and `vendor` folders, then click **Commit changes**. (The hidden `.nojekyll` file is optional. Skip it if your computer hides it.)
3. Go to **Settings**, then **Pages**. Under Build and deployment, set Source to **Deploy from a branch**, choose **main** and **/(root)**, and click **Save**.
4. After a minute or two, the site address appears at the top of the Pages settings. It looks like `https://ORG-NAME.github.io/forum-app-demo/`.
5. Add `links.html` to the end of that address to get the presenter page with a QR code for each persona, or `demo.html` for scenarios that also set the day and time (Day 1, Hill Day, Day 3).

## Set up a demo phone

The presenter page (`links.html`) has the full steps. In short:

- **iPhone:** open a persona link in Safari, tap Share, then Add to Home Screen. Open the app from the Home Screen. If it opens to the code screen, type the persona's code once.
- **Android:** open the link in Chrome and tap Install, or use the menu and choose Add to Home screen.
- Open the app once with a signal. After that it opens without one.
- Tap the AIM logo three times to show the demo controls.

## Turn on the live Google map (optional)

Without a key, the Map page shows the built-in simple map and every walking link still opens Google Maps.

1. In the Google Cloud console, use a project with a billing account attached. IT may need to own this. Usage at demo scale should stay inside Google's free monthly allowance, but confirm current pricing before relying on that.
2. Enable the **Maps JavaScript API**.
3. Create an API key. Under Application restrictions choose **Websites** and add your Pages address with `*` at the end, for example `https://ORG-NAME.github.io/forum-app-demo/*`. Under API restrictions choose **Maps JavaScript API** only.
4. In the repository, open `app-config.js`, click the pencil icon, paste the key between the quotes after `googleMapsKey`, and commit.

The key will be visible in the public code. That is normal for browser map keys; the website restriction is what stops anyone else from using it. Map pins use approximate building locations.

The live map has not been tested yet, because the environment it was built in cannot reach Google. Check it on a phone before you demo it. If the key is wrong, the app quietly falls back to the simple map.

## Making changes

- **Edit on GitHub**, then open `sw.js` and change `VERSION` (for example `forum-demo-1` to `forum-demo-2`). Phones pick up the new version the second time the app is opened after your change, because the first open downloads it in the background.
- **Home Screen name:** change `short_name` in `manifest.webmanifest`, `apple-mobile-web-app-title` in `index.html`, and `shortName` in `app-config.js`. Names longer than about 12 characters get cut off under the icon on iPhone.
- **Personas:** the list is near the bottom of `links.html`. Codes must match an attendee in the app's fictional data.
- **Scenarios by day:** the list is near the bottom of `demo.html`. A link can carry `clock=N`, where N is the index of a preset in `CONFIG.clockPresets` inside `index.html` (0 and 1 are Day 1, 2 to 5 are Hill Day, 6 is Day 3).
- **Look and feel:** the style block in `index.html` is the Daylight theme, and the short script at the very end of the file draws the slim header, the menu button and the Everything drawer. Other screens are untouched.
- **Hotel pin:** add the venue's name and coordinates to `hotel` in `app-config.js`.

## What is real and what is simulated

**Real on the phone:** Home Screen install, full-screen launch, working offline after the first open, the offline banner in airplane mode, persona links, the app remembering where you left off, the phone's own permission prompt for alerts (Android in Chrome, iPhone after installing), and the live Google map once a key is added.

**Simulated:**
- All data is fictional.
- There is no shared server. A change made in Staff view only shows on the phone or laptop where it was made, so to show a schedule change arriving, use "Schedule change in 10 seconds" on the attendee's phone.
- Alerts appear as in-app banners. On Android a real notification can also appear if the phone is set down before the change arrives. Lock-screen alerts on iPhone would need a push server, which this demo does not have.
- No text messages are sent.

## Data rule

This repository and site are public. Use fictional data only. Real advocate names, phone numbers or schedules should never go here.

## Credits

- Archivo typeface, SIL Open Font License (`fonts/OFL-LICENSE.txt`).
- QR code generator by Kazuhiko Arase, MIT License (notice at the top of `vendor/qrcode.js`).
- AIM logo from the Association's official template files, used unaltered. Send brand questions to brandhelp@alz.org before using this beyond an internal demo.

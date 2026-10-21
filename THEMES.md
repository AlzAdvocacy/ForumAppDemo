# Visual theme options for the Forum app

Three alternative looks for the attendee app. Every screen, word, data record and
line of JavaScript is identical to `index.html`. Only the style layer changed:
the "Direction B: Bold Campaign" CSS block was removed and a new theme block was
added in its place. Nothing on `main` or the live site has been touched.

| File | Theme | In one line |
| --- | --- | --- |
| `theme-daylight.html` | Daylight (chosen direction) | Calm and airy. Slim white header with a three line menu button that slides in the Everything drawer from Pocket. Five tabs (Home, Agenda, Meetings, Act, Team); everything else lives in the drawer. |
| `theme-nightshift.html` | Night Shift | Dark glass control room. Deep plum canvas, gold for the next thing to do, glowing active tab. |
| `theme-wayfinder.html` | Wayfinder | Color coded sections. Header, active tab and selected chips take the section's color, so you always know where you are. |

## Round two: five redesigns that also change the layout

These keep every screen and record, but reshape the shell and the Home screen.
Each one is `index.html` plus a style layer plus a short script at the end that
redefines the shell and Home. The original screens, actions and data are untouched
and every destination is still reachable.

| File | Theme | What changes |
| --- | --- | --- |
| `theme-dispatch.html` | Dispatch | Home is a departures board for the whole day: sessions and your meetings in one time ordered list with a NOW marker. Navigation moves to a strip under the header. |
| `theme-pocket.html` | Pocket | No tab bar. One hub button opens a grid of every destination, including the ones that used to hide under More. Home is a swipeable deck of color coded stop cards. |
| `theme-briefing.html` | Briefing | Home reads as a message thread from Forum staff, built from the same data: greeting, up next, changes, buses, your day, today's action, announcements. Buttons under each message act as replies. |
| `theme-lanyard.html` | Lanyard | Home is your conference badge on a strap, with a QR of your code, and today's items as tear off tickets with stamps for done, checked in, reported or cancelled. |
| `theme-focus.html` | Focus | One thing at a time. A very large countdown, the next item, one primary button, Back and Next to step through the day. Two big buttons replace the tab bar: Next up and Everything. Text size toggle in the header. |

## How to preview

Open any of the three files the same way as `index.html`. Persona links work the
same, for example `theme-daylight.html?c=K7Q4M2` or `theme-nightshift.html?view=staff`.

One caveat if you preview on the live GitHub Pages site later: the service worker
in `sw.js` answers every page navigation except `links.html` with the saved copy of
`index.html`. On a phone or browser that has already opened the main app, a theme
file will therefore show the current design, not the new one. Options:

- Preview in a private window, or on a phone that has not opened the live app.
- Or add the theme file names to the navigation rule in `sw.js` before deploying.

The session that built these previewed them on a local server with service
workers disabled, so the screenshots are of the real files.

## What each theme is trying to do

**Daylight** is the lowest risk option. Light background, large tap targets, one
accent color, no uppercase shouting. Status still shows as a colored stripe plus
a word, so nothing depends on color alone. Best outdoors and for older eyes.

**Night Shift** is the most "cutting edge" option. Dark surfaces, frosted header,
a single gold call to action per screen. The trade off: dark interfaces are harder
to read in direct sunlight, and most of Hill Day happens outside between
buildings. Worth testing on a phone outdoors before choosing it.

**Wayfinder** is the most opinionated option. Each tab owns a color (purple for
Home, teal for Agenda, navy for Meetings, burnt orange for Act, green for Team,
slate for More). The header and the active tab change color together. The color
change uses the CSS `:has()` selector, which works in current iPhone and Android
browsers; older browsers simply keep the purple header. Buttons have a pressed
state with a visible bottom edge, which helps people who are unsure what is
tappable.

All three keep the brand purple, the AIM logo, the Archivo typeface, the
high contrast and large text settings, and the staff view.

Notes on round two:

- Dispatch, Lanyard and Focus merge the agenda and your meetings into one list for
  the current day. Breakouts appear only when starred, so the list stays short.
- Pocket and Focus drop the six tab bar. Everything that was under More is one tap
  away in the hub or the Everything menu. Worth testing with a few volunteers,
  since a hidden menu is a real trade off against a visible tab bar.
- Briefing's messages are generated from data, not typed by anyone. The staff
  avatar is the same one the Team threads already use.
- Lanyard draws the QR with the QR library already in `vendor/`. The QR encodes
  only the fictional code.
- Focus includes its own text size toggle in the header, and all buttons are larger.

## Adopting one

To make a theme the real app, copy its `<style>` block over the one in
`index.html`, bump `VERSION` in `sw.js` (for example `forum-demo-1` to
`forum-demo-2`), and update `theme_color` in `manifest.webmanifest` to match the
theme's header color if it changed. Then delete the three preview files.

## Still open from the deployment handoff

- The repository description is still blank. It should read: "Installable
  prototype of the Advocacy Forum attendee app. Fictional data only."
- The live site has not been verified over HTTP from a Claude session; the
  cloud environment cannot reach alzadvocacy.github.io.
- The AIM logo question (brandhelp@alz.org before use beyond an internal demo)
  is still open. The site is public.

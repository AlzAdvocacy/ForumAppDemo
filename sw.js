/* Offline support. Change VERSION whenever you upload new files so every
   phone refreshes its saved copy on the next launch. */
const VERSION = 'forum-demo-1';
const CORE = [
  './', './index.html', './links.html', './app-config.js', './manifest.webmanifest', './vendor/qrcode.js',
  './img/aim-logo-white.png', './img/aim-logo-purple.png',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-maskable-512.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
  './fonts/archivo-latin-500-normal.woff2', './fonts/archivo-latin-700-normal.woff2', './fonts/archivo-latin-900-normal.woff2'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

/* Saved copy first so the app opens instantly with or without a signal,
   then a quiet refresh in the background for next time. Anything from
   another site (Google Maps) goes straight to the network. */
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const key = req.mode === 'navigate' ? (url.pathname.endsWith('links.html') ? './links.html' : './index.html') : req;
  const fresh = fetch(req).then(res => {
    if (res && res.ok) { const copy = res.clone(); caches.open(VERSION).then(c => c.put(key, copy)); }
    return res;
  }).catch(() => null);
  e.waitUntil(fresh);
  e.respondWith(caches.open(VERSION)
    .then(c => c.match(key, { ignoreSearch: true }))
    .then(cached => cached || fresh.then(r => r || new Response('Offline and not saved yet.', { status: 503, headers: { 'Content-Type': 'text/plain' } }))));
});

/* Tapping a phone notification opens the app on that meeting. */
self.addEventListener('notificationclick', e => {
  e.notification.close();
  const meetingId = e.notification.data && e.notification.data.meetingId;
  e.waitUntil(self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then(list => {
    const win = list[0];
    if (win) { if (meetingId) win.postMessage({ open: meetingId }); return win.focus(); }
    return self.clients.openWindow('./');
  }));
});

var cacheName = 'v1.0';

var cacheAssets = [
  /** HTML Files */
  '/',
  '/index.html',
  '/calendar.html',
  '/settings.html',
  '/statistics.html',
  /** CSS Files */
  'styles/calendar.css',
  'styles/home.css',
  'styles/index.css',
  'styles/settings.css',
  'styles/statistics.css',
  /** Javascript Files */
  'scripts/controller/taskcontroller.js',
  'scripts/model/taskmodel.js',
  'scripts/views/calendar.js',
  'scripts/views/index.js',
  'scripts/views/settings.js',
  'scripts/views/statistics.js',
  'scripts/views/theme.js',
  'scripts/views/validation.js',
  /** PWA Assets */
  'assets/pwa-assets/android-chrome-192x192.png',
  'assets/pwa-assets/android-chrome-512x512.png',
  'assets/pwa-assets/apple-touch-icon.png',
  'assets/pwa-assets/favicon-16x16.png',
  'assets/pwa-assets/favicon-32x32.png',
  'assets/pwa-assets/favicon.ico',
  'assets/pwa-assets/mstile-150x150.png',
  'assets/pwa-assets/safari-pinned-tab.svg',
  /** SVG Illustrations */
  'assets/appdata-amico.svg',
  'assets/completed-amico.svg',
  'assets/create-amico.svg',
  'assets/data.svg',
  'assets/development-amico.svg',
  'assets/edit.svg',
  'assets/error-robot-amico.svg',
  'assets/inboxcleanup-amico.svg',
  'assets/metrics-amico.svg',
  'assets/questions-amico.svg',
  'assets/settings-amico.svg',
  /** Icons */
  'assets/pwa-assets/icons/bar-chart-2-line.svg',
  'assets/pwa-assets/icons/calendar-line.svg',
  'assets/pwa-assets/icons/settings-4-line.svg',
  'assets/pwa-assets/icons/task-line.svg',
  /** PWA */
  'manifest.json',
  'serviceworker.js',
  /** Libraries */
  'https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css',
  'https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.3/Chart.min.js',
]

// Installation
self.addEventListener('install', event => {
  event.waitUntil(caches.open(cacheName)
    .then(cache => {
      cache.addAll(cacheAssets);
    })
    .then(() => self.skipWaiting())
  );
});

// Activation
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keyList => {
      return Promise.all(
        keyList.map(key => {
          if(key === cacheName){
            return;
          }
          return caches.delete(cacheName);
        })
      );
    })
  );
});

// Fetch
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});
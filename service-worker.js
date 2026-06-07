const CACHE_VERSION = 'rf-example-pwa-v2';
const APP_SHELL = [
  './',
  './index.html',
  './admin.html',
  './delivery.html',
  './tracking.html',
  './offline.html',
  './assets/config.js',
  './assets/restaurant.css',
  './assets/pwa.js',
  './manifest-client.webmanifest',
  './manifest-management.webmanifest',
  './assets/icons/icon-192.png',
  './assets/icons/icon-512.png',
  './assets/icons/maskable-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then(cache => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(key => key !== CACHE_VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  if (request.method !== 'GET') return;

  const url = new URL(request.url);
  if (url.origin !== location.origin) return;

  if (request.mode === 'navigate') {
    event.respondWith(networkFirst(request, './offline.html'));
    return;
  }

  if (url.pathname.includes('/assets/') || url.pathname.endsWith('.webmanifest')) {
    event.respondWith(cacheFirst(request));
    return;
  }

  event.respondWith(networkFirst(request, './offline.html'));
});

async function cacheFirst(request) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(request);
  if (cached) return cached;
  const response = await fetch(request);
  if (response && response.ok) cache.put(request, response.clone());
  return response;
}

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_VERSION);
  try {
    const response = await fetch(request);
    if (response && response.ok) cache.put(request, response.clone());
    return response;
  } catch (error) {
    return (await cache.match(request)) || cache.match(fallbackUrl);
  }
}

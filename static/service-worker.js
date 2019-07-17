// This is the "Offline page" service worker

// Install stage sets up the offline page in the cache and opens a new cache
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', event => {
  console.log(11, event);
  const offlinePage = new Request('/');
  event.waitUntil(
    fetch(offlinePage).then(response => {
      return caches.open('pwabuilder-offline').then(cache => {
        console.log(`Page cached ${response.url}`);
        return cache.put(offlinePage, response);
      });
    }),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => {
  console.log(event.request.url);
  event.respondWith(
    fetch(event.request).catch(error => {
      console.error(`Serving Offline ${error}`);
      return caches.open('pwabuilder-offline').then(cache => {
        return cache.match('/');
      });
    }),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

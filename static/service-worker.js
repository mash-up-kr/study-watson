// This is the "Offline page" service worker

// Install stage sets up the offline page in the cache and opens a new cache
// eslint-disable-next-line no-restricted-globals
self.addEventListener('install', event => {
  const offlinePage = new Request('/');
  event.waitUntil(
    fetch(offlinePage).then(response => {
      return caches
        .open('study-watson-offline')
        .then(cache => {
          console.log(`Page cached ${response.url}`);
          return cache.put(offlinePage, response);
        })
        .catch(error => console.log('실패', error));
    }),
  );
});

// eslint-disable-next-line no-restricted-globals
self.addEventListener('fetch', event => {
  event.respondWith(
    fetch(event.request).catch(error => {
      console.error(`Serving Offline ${error}`);
      return caches
        .open('study-watson-offline')
        .then(cache => {
          return cache.match('/');
        })
        .catch(error => console.log('실패', error));
    }),
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(self.clients.claim());
});

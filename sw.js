/*
const assets = [
    '/',
    '/index.html',
    '/js/app.js',
    '/js/customui.js',
    '/js/customdb.js',
    '/js/customHistory.js',
    '/js/customStats.js',
    '/js/jquery.min.js',
    '/js/tailwind.js',
    '/js/chartjs.min.js',
    '/pages/fallback.html',
    '/js/pouchdb.min.js'
]
*/

const assets = [
  '/projecttest/',
  '/projecttest/index.html',
  '/projecttest/pages/fallback.html',
]

const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1';

// cache size limit function
const limitCacheSize = (name, size) => {
  caches.open(name).then(cache => {
    cache.keys().then(keys => {
      if(keys.length > size){
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

// install event
self.addEventListener('install', evt => {
  //console.log('service worker installed');
  evt.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      console.log('caching shell assets');
      cache.addAll(assets);
    })
  );
});

// activate event
self.addEventListener('activate', evt => {
  //console.log('service worker activated');
  evt.waitUntil(
    caches.keys().then(keys => {
      //console.log(keys);
      return Promise.all(keys
        .filter(key => key !== staticCacheName && key !== dynamicCacheName)
        .map(key => caches.delete(key))
      );
    })
  );
});

// fetch events
self.addEventListener('fetch', evt => {
 // if(evt.request.url.indexOf('firestore.googleapis.com') === -1){
    evt.respondWith(
      caches.match(evt.request).then(cacheRes => {
        return cacheRes || fetch(evt.request).then(fetchRes => {
          return caches.open(dynamicCacheName).then(cache => {
            cache.put(evt.request.url, fetchRes.clone());
            // check cached items size
            limitCacheSize(dynamicCacheName, 15);
            return fetchRes;
          })
        });
      }).catch(() => {
        if(evt.request.url.indexOf('.html') > -1){
          return caches.match('/projecttest/pages/fallback.html');
        } 
      })
    );
 // }
});
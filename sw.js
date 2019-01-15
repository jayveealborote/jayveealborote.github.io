self.addEventListener('install', function(e) {
 e.waitUntil(
   caches.open('login-app').then(function(cache) {
     return cache.addAll([
       '/t2app/',
       '/t2app/index.html',
       '/t2app/style.css',
       '/t2app/index.js'

     ]);
   })
 );
});

self.addEventListener('fetch', function(e) {
  console.log(e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});

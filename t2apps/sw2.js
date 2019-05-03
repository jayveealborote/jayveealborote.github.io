const staticAssets = [
    '/',
    './style.css',
    './app.js'
];


self.addEventListener('install', async event =>{
    const cache = await caches.open('login-static');
    cache.addAAll(staticAssets);


});

self.addEventListener('fetch', event =>{
   const req = event.request;
   const url = new URL(req.url);

    if (url.origin == location.origin){
        event.respondWith(cacheFirst(req));
    } else{
        event.respondWith(networkFirst(req));
    }

  
    });

    async function cacheFirst(req){
        const cachedResponse = await caches.match(req);
        return cachedResponse || fetch(req);

    }

    async function networkFirst(req){
        const cache = await caches.open('login-dynamic');
        try {
            const rest = await fetch(req);
            cache.put(req, res.clone());
            return res;
        } catch (error) {
            return await cache.match(req);
            
            
        }
    }
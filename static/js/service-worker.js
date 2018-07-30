"use strict"
const urlsToCache = ["/", "/static/styles/Layout.css", "/static/styles/Header.css", "/static/styles/index.css", "/static/styles/Navigation.css", "/static/styles/variables.css"];
for (let i = 1; i <= 10; i++) {
    urlsToCache.push(`/images/${i}.jpg`);
}
console.log(urlsToCache);
self.addEventListener("install", event => {
    event.waitUntil(
        caches
        .open('perfcache')
        .then(cache => {
            return cache.addAll(urlsToCache);
        })
        .then(() => {
            self.skipWaiting(); // Immediately replace any other service worker that might be active
            console.log("Service worker installed and objects are cached");
        })
    );
});


self.addEventListener('activate', function(event) {
    // Claim any clients immediately, so that the page will be under SW control without reloading.
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
    // If the request is not GET or POST, let the network handle things,
    if (event.request.method !== 'GET') {
        return;
    }

    // url.split('/') = ['https:', '', domain, importantURLPart, ...]
    const importantURLPart = event.request.url.split('/')[3];
    if (importantURLPart.includes('favorites') && event.request.method === 'GET') { // Put this url first since it also matches 'favorite'
        event.respondWith(
            caches.open('favorite-cache').then(cache => {
                return cache.keys().then(keys => {
                    let totalLoaded = event.request.url.split("=")[1];
                    let foundKey = keys[0];
                    for (let index = 0; index <= totalLoaded; index++) {
                        foundKey = keys[index];
                        if (!foundKey) {
                            break;
                        }
                    }
                    if (!foundKey) {
                        return new Response("", { status: 404, statusText: "Could not find meme"});
                    } else {
                        return cache.match(foundKey)
                        .then(cachedResponse => {
                            if (!cachedResponse) {
                                return new Response("", { status: 404, statusText: "Cache miss" });
                            } else {
                                return cachedResponse;
                            } 
                        })
                        .catch(error => {
                            console.log(`error: ${error}`);
                            return new Response("", { status: 500, statusText: "Could not match request" });
                        });
                    }
                }); 
            })
        )        
    } else if (importantURLPart.includes('favorite') && event.request.method === 'GET') {
        event.respondWith(
            caches.open('favorite-cache').then(cache => {
                return cache.match(event.request)
                .then(cachedResponse => {
                    if (cachedResponse) {
                        return new Response("", { status: 200, statusText: "OK" });
                    } else {
                        return caches.open('perfcache').then(perfcache => {
                            const memeId = event.request.url.split("=")[1];
                            let newRequest = new Request(`https://localhost:3000/images/${memeId}.jpg`, {method: 'GET'});
                            return perfcache.match(newRequest)
                            .then(cachedResponse => {
                                if (cachedResponse.status === 200) {
                                    cache.put(event.request.clone(), cachedResponse.clone());
                                    return cachedResponse;
                                } else {
                                    console.log("Could not cache favorited meme");
                                    return new Response("", { status: 500, statusText: "Could not cache favorited meme" });
                                }
                            })
                            .catch(() => { return new Response("", { status: 500, statusText: "Could not cache favorited meme" }); });
                        });                          
                    }
                })
                .catch(() => {
                    return new Response("", { status: 500, statusText: "Could not match request"});
                });
            })
            .catch(error => {
                console.log(error);
                return new Response("", { status: 500, statusText: "Could not open cache" });
            })
        );
    } else if (importantURLPart !== "_next") {
        event.respondWith(
            caches.open('perfcache').then(function(cache) {
                return cache.match(event.request).then(function (response) {
                    return response || fetch(event.request).then(function(response) {
                        cache.put(event.request, response.clone());
                        return response;
                    });
                });
            })
        );
    }
  });
// const CACHE_NAME = "v1";

// const urlsToCache = ["index.html"];

// const self = this;

// // Install the service worker
// self.addEventListener("install", (e) => {
//   e.waitUntil(
//     caches.open(CACHE_NAME).then((cache) => {
//       console.log("Opened cache");
//       return cache.addAll(urlsToCache);
//     })
//   );
// });

// // Listen to requests
// self.addEventListener("fetch", (e) => {
//   e.respondWith(
//     caches.match(e.request).then(() => {
//       return fetch(e.request).catch(() => caches.match("index.html"));
//     })
//   );
// });

// // Activate the service worker
// self.addEventListener("activate", (e) => {
//   const cacheWhitelist = [];
//   cacheWhitelist.push(CACHE_NAME);

//   e.waitUntil(
//     caches.keys().then((cacheNames) =>
//       Promise.all(
//         cacheNames.map((cacheName) => {
//           if (!cacheWhitelist.includes(cacheName)) {
//             return caches.delete(cacheName);
//           }
//           return null;
//         })
//       )
//     )
//   );
// });

const self = this;
const urlsToCache = ["/noInternet.html", "/no-internet.css"];
const staticCacheName = "v1";

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(staticCacheName).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys.then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return cacheName.startsWith("v") && cacheName !== staticCacheName;
          })
          .map((cacheName) => {
            return caches.delete(cacheName);
          })
      );
    })
  );
});

self.addEventListener("fetch", (e) => {
  // e.respondWith(
  //   new Response("Hello <b>world</b>", {
  //     headers: { "Content-Type": "text/html" },
  //   })
  // );

  // if (e.request.url.endsWith(".jpg")) {
  //   e.respondWith(fetch("/netflix-logo.png"));
  // }

  // e.respondWith(
  //   fetch(e.request)
  //     .then((res) => {
  //       if (res.status === "404") {
  //         console.log("Not found");
  //         return new Response("Not found");
  //       }
  //       return res;
  //     })
  //     .catch(() => {
  //       // return new Response("You're offline");
  //       return fetch("/netflix-logo.png");
  //     })
  // );

  e.respondWith(
    caches.match(e.request).then((res) => {
      // if (res) {
      //   return caches.match("/");
      // }
      return fetch(e.request).catch(() => caches.match("/noInternet.html"));
    })

    // caches.match(e.request).then((res) => {
    //   if (res) {
    //     console.log(res);
    //     return res;
    //   }
    //   return fetch(e.request);
    // })
  );
});

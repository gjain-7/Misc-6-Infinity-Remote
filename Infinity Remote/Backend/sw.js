const staticCache = "static-v1";
const assets = [
  "/",
  "/css/welcome.css",
  "/scripts/welcome.js",
  "/views/offline.html",
  "/icons/error.png",
  "/css/errors.css",
];
self.addEventListener("install", function (event) {
  // console.log("Service Worker Installed");
  event.waitUntil(
    caches.open(staticCache).then(function (cache) {
      // console.log("Caching Assets");
      return cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", function (event) {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        // console.log(Removing all previous caches);
        keys.filter((key) => key !== staticCache).map((key) => caches.delete())
      );
    })
  );
});
self.addEventListener("fetch", function (event) {
  // console.log("Fetch Event", event);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return (
        response ||
        fetch(event.request).catch(() => caches.match("/views/offline.html"))
      );
    })
  );
});

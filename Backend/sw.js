const staticCache = "static-v1"
const assets = [
    "/", "/server.js","/views/connecting.ejs","/views/mainpage.ejs","/views/index.ejs",
    "/public/mainpage.css","/public/welcome.css","/public/welcome.js","/public/connecting.css","/public/mainpage.js","/public/css/fontawesome.min.css","/public/css/all.min.css", "/public/icons/icon.svg", "https://rawgit.com/sitepoint-editors/jsqrcode/master/src/qr_packed.js", "/views/offline.ejs","/views/invalid.ejs","/views/error.ejs","/public/icons/error.png","/public/error.css"
]
self.addEventListener('install', function(event){
    console.log("Service Worker Installed")
    event.waitUntil(
        caches.open(staticCache).then(function(cache){
            console.log("Caching Assets")
            return cache.addAll(assets);
        })
    );
});

self.addEventListener("activate", function(event){
    event.waitUntil(
        caches.keys().then(keys =>{
            console.log(keys);
            return Promise.all(keys
                .filter(key => key ==! staticCache)
                .map(key => caches.delete())
            )
        })
    )
})
self.addEventListener('fetch', function(event){
    console.log("Fetch Event", event);
    event.respondWith(
        caches.match(event.request).then(function(response){
            return response || fetch(event.request).catch(()=> caches.match("/views/index.ejs"));
        })
    );
});


var dataCacheName = 'pengadaan.online'
var cacheName = 'pengadaan.online'
var dataUrl = 'http://pengadaan.online/'
var PATH = dataUrl
var filesToCache = [
   PATH + '/',
   PATH + '/index.html',
   PATH + '/public/js/jquery-3.5.1.js',
   PATH + 'public/js/jquery.dataTables.min.js',
   PATH + 'public/css/reset.css',
   PATH + 'public/bootstrap/css/bootstrap.min.css',
   PATH + 'public/bootstrap/css/jquery.dataTables.min.css',
   PATH + 'public/bootstrap/css/bootstrap-datatables.min.css',
   PATH + 'public/bootstrap/css/font-awesome.min.css',
   PATH + 'public/css/application.css',
   PATH + 'lpse.json'
]
self.addEventListener('install', function(e) {
   console.log('[ServiceWorker] Install')
   e.waitUntil(caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell')
      return cache.addAll(filesToCache)
   }))
})
self.addEventListener('activate', function(e) {
   console.log('[ServiceWorker] Activate')
   e.waitUntil(caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
         if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key)
            return caches.delete(key)
         }
      }))
   }))
})
self.addEventListener('fetch', function(e) {
   console.log('[ServiceWorker] Fetch', e.request.url)
   if (e.request.url.indexOf(dataUrl) === 0) {
      e.respondWith(fetch(e.request).then(function(response) {
         return caches.open(dataCacheName).then(function(cache) {
            cache.put(e.request.url, response.clone())
            console.log('[ServiceWorker] Fetched&Cached Data')
            return response;
         })
      }))
   } else {
      e.respondWith(caches.match(e.request).then(function(response) {
         return response || fetch(e.request)
      }))
   }
}) 

const CACHE_NAME = 'np-fee-v1';
const ASSETS = [
  './',
  './index.html',
  './css/bootstrap.min.css',
  './css/style.css',
  './js/bootstrap.bundle.min.js',
  './js/app.js',
  './img/logo.png',
  './img/icon.png'
];

// ติดตั้ง Service Worker และ Cache ไฟล์
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// เรียกใช้ไฟล์จาก Cache เมื่อ Offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => response || fetch(e.request))
  );
});
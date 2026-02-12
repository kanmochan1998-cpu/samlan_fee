const CACHE_NAME = 'np-fee-v4.3'; // ปรับเวอร์ชันเพื่อรีเซ็ต Cache
const ASSETS = [
    './',
    './index.html',  //ตรงนี้โหลดมาเก็บไว้ในเครื่อง offline
    './css/style.css?v=4.3',         // แก้ให้ตรงกับ index.html
    './css/bootstrap.min.css',
    './js/app.js?v=4.3',            // แก้ให้ตรงกับ index.html
    './js/bootstrap.bundle.min.js',
    './img/logo.png',
    './img/icon.png',
    './manifest.json'
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
    );
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        ))
    );
});

// แก้ไขปัญหา Offline: เช็คใน Cache ก่อนเสมอ
self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((response) => {
            return response || fetch(e.request);
        })
    );
});
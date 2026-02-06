const CACHE_NAME = 'np-fee-v3.2'; // อัปเดตเวอร์ชันเป็น 3.2
const ASSETS = [
    './',
    './index.html',
    './css/style.css',
    './css/bootstrap.min.css',      // เพิ่ม: ตัวจัดหน้าตา
    './js/app.js',
    './js/bootstrap.bundle.min.js', // เพิ่ม: ตัวคุม Popup Modal
    './img/logo.png',               // เพิ่ม: โลโก้
    './img/icon.png',               // เพิ่ม: ไอคอนแอป
    './manifest.json'               // เพิ่ม: ไฟล์ตั้งค่าติดตั้ง
];

self.addEventListener('install', (e) => {
    self.skipWaiting();
    e.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS)));
});

self.addEventListener('activate', (e) => {
    e.waitUntil(
        caches.keys().then((keys) => Promise.all(
            keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
        ))
    );
});

self.addEventListener('fetch', (e) => {
    e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
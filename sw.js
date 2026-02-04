// 1. ทุกครั้งที่แก้โค้ด ให้มาเปลี่ยนเลขตรงนี้เป็น v2, v3, v4 ไปเรื่อยๆ 
const CACHE_NAME = 'np-fee-v2'; 

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

// ติดตั้งและบังคับให้ใช้ตัวใหม่ทันที
self.addEventListener('install', (e) => {
  self.skipWaiting(); 
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// ล้างแคชเก่าทิ้งทันทีที่มีการเปลี่ยน CACHE_NAME
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
});

// เปลี่ยนกลยุทธ์เป็น: ไปดูที่ Network ก่อน ถ้าไม่มีเน็ตค่อยดึงจาก Cache (Network First)
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request).catch(() => caches.match(e.request))
  );
});

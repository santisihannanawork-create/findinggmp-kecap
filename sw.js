const CACHE_NAME = 'gmp-v2';

// Daftar file yang harus disimpan di memori HP agar bisa dibuka saat OFFLINE
const assets = [
  './',
  './index.html',
  './manifest.json',
  'https://cdnjs.cloudflare.com/ajax/libs/exceljs/4.3.0/exceljs.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/FileSaver.js/2.0.5/FileSaver.min.js'
];

// Tahap Install: Browser akan mendownload semua file di atas dan menyimpannya
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Menyimpan aset ke cache...');
      return cache.addAll(assets);
    })
  );
});

// Tahap Fetch: Jika HP offline, ambil file dari memori (cache). Jika online, ambil dari internet.
self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(res => {
      return res || fetch(e.request);
    })
  );
});

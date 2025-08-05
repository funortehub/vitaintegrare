const CACHE_NAME = 'minha-app-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/icone.jpg',
  '/termos.pdf',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Instalando o service worker e armazenando os arquivos no cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Ativando o service worker e limpando caches antigos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
});

// Interceptando requisições e servindo do cache quando possível
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Retorna o recurso do cache ou faz o fetch na rede
        return response || fetch(event.request);
      })
  );
});

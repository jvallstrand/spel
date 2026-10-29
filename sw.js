const CACHE = 'spel-v20';
const FILES = ['./', './index.html'];
const CDN = /(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net|unpkg\.com)$/;
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k.startsWith('spel-') && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const isPage = req.mode === 'navigate';
  const scope = new URL(self.registration.scope);
  if (url.origin === location.origin ? !url.pathname.startsWith(scope.pathname) : !CDN.test(url.hostname)) return;
  e.respondWith(caches.open(CACHE).then(async c => {
    // varje spel har sin egen sida: nyckeln är sidans sökväg, med index.html för mappar
    const key = isPage ? url.origin + url.pathname.replace(/\/$/, '/index.html') : req;
    const cached = await c.match(key, { ignoreSearch: isPage });
    const fresh = fetch(req).then(res => {
      if (res && (res.ok || res.type === 'opaque')) c.put(key, res.clone());
      return res;
    }).catch(() => cached);
    return cached || fresh;
  }));
});

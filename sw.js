const VER = 'dacha-v1';
const SHELL = ['./', './index.html', './app.js', './style.css', './manifest.json', './icon.svg'];
const CDN = ['https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.js', 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css', 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.117.2/dist/umd/supabase.js'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VER).then(c => c.addAll(SHELL).then(() => Promise.all(CDN.map(u => c.add(new Request(u, { mode: 'cors' })))))).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VER && k !== 'tiles').map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (u.hostname.endsWith('arcgisonline.com')) {
    // карта: сначала кэш, потом сеть (и запоминаем)
    e.respondWith(caches.open('tiles').then(async c => {
      const hit = await c.match(e.request);
      if (hit) return hit;
      try {
        const r = await fetch(e.request);
        if (r.ok) c.put(e.request, r.clone());
        return r;
      } catch (_) { return new Response('', { status: 504 }); }
    }));
    return;
  }
  if (u.origin === location.origin || CDN.includes(e.request.url)) {
    // приложение: сначала кэш, обновляем в фоне
    e.respondWith(caches.open(VER).then(async c => {
      const hit = await c.match(e.request, { ignoreSearch: true });
      const net = fetch(e.request).then(r => { if (r.ok) c.put(e.request, r.clone()); return r; }).catch(() => hit);
      return hit || net;
    }));
  }
});

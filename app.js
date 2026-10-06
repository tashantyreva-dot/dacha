'use strict';
/* ---------- Справочник культур ---------- */
const RASP = '<img class="ico" alt="" src="data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 64 64%27%3E%3Cg fill=%27%23d81b4a%27 stroke=%27%238e0f33%27 stroke-width=%271.4%27%3E%3Ccircle cx=%2717%27 cy=%2724%27 r=%276.6%27/%3E%3Ccircle cx=%2727%27 cy=%2724%27 r=%276.6%27/%3E%3Ccircle cx=%2737%27 cy=%2724%27 r=%276.6%27/%3E%3Ccircle cx=%2747%27 cy=%2724%27 r=%276.6%27/%3E%3Ccircle cx=%2722%27 cy=%2733%27 r=%276.6%27/%3E%3Ccircle cx=%2732%27 cy=%2733%27 r=%276.6%27/%3E%3Ccircle cx=%2742%27 cy=%2733%27 r=%276.6%27/%3E%3Ccircle cx=%2727%27 cy=%2742%27 r=%276.6%27/%3E%3Ccircle cx=%2737%27 cy=%2742%27 r=%276.6%27/%3E%3Ccircle cx=%2732%27 cy=%2751%27 r=%276.6%27/%3E%3C/g%3E%3Cg fill=%27%23ff9db5%27%3E%3Ccircle cx=%2715%27 cy=%2721.8%27 r=%271.7%27/%3E%3Ccircle cx=%2725%27 cy=%2721.8%27 r=%271.7%27/%3E%3Ccircle cx=%2735%27 cy=%2721.8%27 r=%271.7%27/%3E%3Ccircle cx=%2745%27 cy=%2721.8%27 r=%271.7%27/%3E%3Ccircle cx=%2720%27 cy=%2730.8%27 r=%271.7%27/%3E%3Ccircle cx=%2730%27 cy=%2730.8%27 r=%271.7%27/%3E%3Ccircle cx=%2740%27 cy=%2730.8%27 r=%271.7%27/%3E%3Ccircle cx=%2725%27 cy=%2739.8%27 r=%271.7%27/%3E%3Ccircle cx=%2735%27 cy=%2739.8%27 r=%271.7%27/%3E%3Ccircle cx=%2730%27 cy=%2748.8%27 r=%271.7%27/%3E%3C/g%3E%3Cg fill=%27%232e7d32%27 stroke=%27%231b5e20%27 stroke-width=%271%27%3E%3Cpath d=%27M32 22C26 20 20 15 18 9C25 9 30 13 32 18C34 13 39 9 46 9C44 15 38 20 32 22Z%27/%3E%3Crect x=%2730.8%27 y=%277%27 width=%272.4%27 height=%279%27 rx=%271.2%27/%3E%3C/g%3E%3C/svg%3E">';   // значок малины (в эмодзи его нет)
// harvest: [от, до] дней после посадки; tasks: что и когда делать (дней после посадки)
const CROPS = {
  'Томат': { e: '🍅', harvest: [70, 120], tips: 'Поливать под корень, редко, но обильно. Пасынковать и подвязывать. Подкормка при цветении фосфором и калием.', tasks: [[10, 'Подвязать к опоре'], [14, 'Подкормка (азот + фосфор)'], [30, 'Убрать пасынки, подкормка калием'], [50, 'Обработка от фитофторы']] },
  'Огурец': { e: '🥒', harvest: [40, 70], tips: 'Любит влагу и тепло, поливать тёплой водой. Собирать часто, чтобы не перерастали.', tasks: [[14, 'Подкормка азотом'], [28, 'Подкормка комплексным удобрением'], [40, 'Начать собирать, не давать перерастать']] },
  'Картофель': { e: '🥔', harvest: [70, 110], tips: 'Окучить 2 раза. Поливать в период бутонизации. Копать, когда ботва пожелтела и подсохла.', tasks: [[20, 'Первое окучивание'], [35, 'Второе окучивание'], [45, 'Обработка от колорадского жука / полив при бутонах']] },
  'Морковь': { e: '🥕', harvest: [80, 120], tips: 'Прореживать всходы. Не переливать, иначе трескается. Не вносить свежий навоз.', tasks: [[14, 'Прореживание (1-й раз)'], [30, 'Прореживание (2-й раз), подкормка калием']] },
  'Свёкла': { e: '🟣', harvest: [70, 110], tips: 'Прореживать, поливать равномерно. Любит золу и бор.', tasks: [[14, 'Прореживание'], [30, 'Подкормка золой']] },
  'Лук': { e: '🧅', harvest: [80, 110], tips: 'За 3 недели до уборки прекратить полив. Убирать, когда перья полегли.', tasks: [[14, 'Подкормка азотом'], [50, 'Подкормка калием'], [75, 'Прекратить полив']] },
  'Чеснок': { e: '🧄', harvest: [90, 120], tips: 'Стрелки удалять. Убирать, когда нижние листья пожелтели.', tasks: [[30, 'Подкормка'], [60, 'Удалить стрелки']] },
  'Капуста': { e: '🥬', harvest: [70, 130], tips: 'Любит влагу и подкормки азотом. Защищать от гусениц и крестоцветной блошки.', tasks: [[14, 'Подкормка азотом'], [30, 'Окучить, подкормка'], [45, 'Обработка от вредителей']] },
  'Перец': { e: '🫑', harvest: [90, 130], tips: 'Тепло и полив тёплой водой. Подкармливать каждые 2 недели.', tasks: [[14, 'Подкормка'], [30, 'Подкормка калием']] },
  'Баклажан': { e: '🍆', harvest: [100, 140], tips: 'Тепло, регулярный полив. Не густить посадку.', tasks: [[14, 'Подкормка'], [35, 'Подкормка калием']] },
  'Кабачок': { e: '🍈', harvest: [45, 65], tips: 'Много воды и места. Собирать молодыми, тогда плодоносит дольше.', tasks: [[14, 'Подкормка'], [35, 'Начать сбор, собирать молодыми']] },
  'Тыква': { e: '🎃', harvest: [90, 130], tips: 'Любит солнце, воду и питание. Пасынковать плети, оставить 2-3 плода.', tasks: [[21, 'Подкормка'], [50, 'Прищипнуть плети']] },
  'Редис': { e: '🌰', harvest: [20, 35], tips: 'Быстрая культура. Не загущать, поливать регулярно, иначе пустеет.', tasks: [[10, 'Прореживание']] },
  'Зелень (укроп, петрушка)': { e: '🌿', harvest: [30, 60], tips: 'Сеять с перерывом 2 недели. Срезать по мере надобности.', tasks: [[10, 'Прореживание']] },
  'Горох': { e: '🟢', harvest: [55, 80], tips: 'Нужна опора. Собирать регулярно.', tasks: [[14, 'Установить опору']] },
  'Фасоль': { e: '🫘', harvest: [60, 100], tips: 'Не любит переувлажнения. Сеять после заморозков.', tasks: [[14, 'Прополка, рыхление']] },
  'Клубника': { e: '🍓', per: 1, harvest: [30, 60], tips: 'Мульчировать, усы убирать. После сбора урожая подкормить и омолодить.', tasks: [[14, 'Подкормка'], [30, 'Мульча под ягоды']] },
  'Малина': { per: 1, e: RASP, harvest: [365, 730], tips: 'Обрезать плодоносившие побеги осенью. Подкормка весной азотом.', tasks: [[30, 'Подкормка']] },
  'Яблоня': { per: 1, e: '🍎', harvest: [1095, 2000], tips: 'Обрезка зимой/ранней весной. Побелка штамба осенью. Полив первые 3 года.', tasks: [[30, 'Полив, мульча'], [365, 'Весенняя обрезка и подкормка']] },
  'Смородина': { per: 1, e: '🫐', harvest: [365, 730], tips: 'Обновляющая обрезка осенью. Мульча.', tasks: [[30, 'Подкормка']] },
  'Виноград': { e: '🍇', per: 1, harvest: [1095, 1500], tips: 'Обрезка осенью или ранней весной, укрытие на зиму в холодных районах. Подвязка лозы, подкормка весной.', tasks: [[30, 'Полив, мульча'], [365, 'Весенняя обрезка и подкормка']] },
  'Груша': { e: '🍐', per: 1, harvest: [1460, 2200], tips: 'Обрезка ранней весной, побелка осенью.', tasks: [[365, 'Весенняя обрезка и подкормка']] },
  'Вишня': { e: '🍒', per: 1, harvest: [1095, 1800], tips: 'Обрезка ранней весной, побелка осенью.', tasks: [[365, 'Весенняя обрезка и подкормка']] },
  'Цветы': { e: '🌷', harvest: [30, 90], tips: 'Поливать по погоде, подкармливать при бутонизации.', tasks: [[14, 'Подкормка']] },
  'Теплица': { e: '🏕️', obj: true, harvest: null, tips: '', tasks: [] },
  'Дом': { e: '🏠', obj: true, harvest: null, tips: '', tasks: [] },
  'Колодец / вода': { e: '💧', obj: true, harvest: null, tips: '', tasks: [] },
  'Компост': { e: '♻️', obj: true, harvest: null, tips: '', tasks: [] },
  'Грядка': { e: '🟫', obj: true, harvest: null, tips: '', tasks: [] },
  'Другое': { e: '🌱', harvest: [60, 120], tips: '', tasks: [] }
};
const isPer = p => p.perennial != null ? !!p.perennial : !!cropInfo(p.crop).per;
const cropInfo = n => CROPS[n] || CROPS['Другое'];
const cropEmoji = n => (CROPS[n] ? CROPS[n].e : '🌱');

/* ---------- Утилиты ---------- */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const today = () => new Date().toISOString().slice(0, 10);
const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
const addDays = (d, n) => { const x = new Date(d + 'T12:00:00'); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
const fmt = d => d ? new Date(d + 'T12:00:00').toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' }) : '';
const daysBetween = (a, b) => Math.round((new Date(b + 'T12:00:00') - new Date(a + 'T12:00:00')) / 864e5);

/* ---------- Хранилище (IndexedDB) ---------- */
const DB = {
  db: null,
  open() {
    return new Promise((res, rej) => {
      const r = indexedDB.open('dacha', 1);
      r.onupgradeneeded = () => { r.result.createObjectStore('plantings', { keyPath: 'id' }); r.result.createObjectStore('meta'); };
      r.onsuccess = () => { this.db = r.result; res(); };
      r.onerror = () => rej(r.error);
    });
  },
  tx(store, mode, fn) {
    return new Promise((res, rej) => {
      const t = this.db.transaction(store, mode); const s = t.objectStore(store);
      const rq = fn(s); t.oncomplete = () => res(rq && rq.result); t.onerror = () => rej(t.error); t.onabort = () => rej(t.error || new Error('Запись отменена'));
    });
  },
  all() { return this.tx('plantings', 'readonly', s => s.getAll()); },
  put(p) { return this.tx('plantings', 'readwrite', s => s.put(p)); },
  getMeta(k) { return this.tx('meta', 'readonly', s => s.get(k)); },
  setMeta(k, v) { return this.tx('meta', 'readwrite', s => s.put(v, k)); }
};

/* ---------- Состояние ---------- */
let plantings = [];      // включая «удалённые» (tombstone) для синхронизации
let year = new Date().getFullYear();
let map, markers = {}, movingId = null;
let focusZone = null, prevLayer = null, satOp = 1, snapOn = true;   // режим «внутри зоны»
const live = () => plantings.filter(p => !p.deleted && !p.kind);   // записи с kind (граница, строения) — не посадки
const yOf = d => new Date(d).getFullYear();
const inYear = () => live().filter(p => cropInfo(p.crop).obj || yOf(p.plantedAt) === year || (p.harvests || []).some(h => yOf(h.date) === year) || (isPer(p) && yOf(p.plantedAt) <= year && !(p.removedAt && yOf(p.removedAt) < year)));

async function save(p) {
  p.updatedAt = Date.now();
  try { await DB.put(p); }   // сначала в память телефона: если не вышло — не делаем вид, что сохранено
  catch (e) {
    alert('Не удалось сохранить: на телефоне не хватает места или браузер не даёт записать данные. Освободите место и нажмите «Сохранить» ещё раз. Пока не получилось, это изменение пропадёт при закрытии приложения.');
    throw e;
  }
  const i = plantings.findIndex(x => x.id === p.id);
  if (i >= 0) plantings[i] = p; else plantings.push(p);
  renderAll();
  Sync.schedule();
}

/* ---------- Карта ---------- */
const TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
const OSM = 'https://tile.openstreetmap.org/{z}/{x}/{y}.png';
const LAYER_NAMES = { sat: '🛰️ Спутниковый снимок', osm: '🗺️ Схема', blank: '⬜ Чистый план' };
const SHAPE_TYPES = {
  'Дом': { e: '🏠', c: '#8d6e63' }, 'Теплица': { e: '🏕️', c: '#26a69a' }, 'Сарай': { e: '📦', c: '#78909c' },
  'Баня': { e: '♨️', c: '#a1887f' }, 'Гараж': { e: '🚗', c: '#7e57c2' }, 'Другое': { e: '▫️', c: '#ef6c00' }
};
let layers = {}, curLayer = 'sat', plotLayer = null, shapeLayers = [], gridLayer = null, gridOn = true;
let drawing = null, drawKind = null, draftLayer = null, editing = null, editLayer = null;
const plotRecs = () => plantings.filter(p => p.kind === 'plot' && !p.deleted);   // участков может быть несколько (соседние)
const plotRec = () => plotRecs()[0];
const plotName = p => p.name || 'Участок';
const plotAt = (lat, lng) => plotRecs().find(p => inPoly([lat, lng], p.pts));
const shapeRecs = () => plantings.filter(p => p.kind === 'shape' && !p.deleted);
const zoneRecs = () => plantings.filter(p => p.kind === 'zone' && !p.deleted);
const ZONE_COLORS = ['#43a047', '#8e24aa', '#e53935', '#fb8c00', '#fdd835', '#1e88e5', '#d81b60', '#6d4c41'];
// зона, в которой лежит точка (если вложены друг в друга — берём самую маленькую)
const zoneAt = (lat, lng) => zoneRecs().filter(z => inPoly([lat, lng], z.pts)).sort((a, b) => areaM2(a.pts) - areaM2(b.pts))[0];
const inZone = z => live().filter(p => p.lat != null && inPoly([p.lat, p.lng], z.pts));

async function initMap() {
  const home = await DB.getMeta('home');
  const c = home || { lat: 55.75, lng: 37.6, z: 10, fresh: true };
  map = L.map('map', { zoomControl: false, attributionControl: false, maxZoom: 24 }).setView([c.lat, c.lng], c.z);
  L.control.zoom({ position: 'topright' }).addTo(map);
  // источники карты: по условиям лицензий они должны быть доступны, поэтому спрятаны за маленькую кнопку ⓘ
  const cr = L.control({ position: 'bottomright' });
  cr.onAdd = () => {
    const d = L.DomUtil.create('div'); d.style.cssText = 'display:flex;align-items:flex-end;gap:4px;margin:0 6px 6px 0';
    d.innerHTML = '<span style="display:none;background:#fffe;border-radius:6px;padding:3px 6px;font-size:11px">Снимки: Esri · Схема: © OpenStreetMap · Leaflet</span><button title="Источники карты" style="width:22px;height:22px;border:0;border-radius:50%;background:#fff9;font-size:13px;line-height:22px;padding:0;color:#555">ⓘ</button>';
    L.DomEvent.disableClickPropagation(d);
    d.querySelector('button').onclick = () => { const t = d.querySelector('span'); t.style.display = t.style.display === 'none' ? '' : 'none'; };
    return d;
  };
  cr.addTo(map);
  layers.sat = L.tileLayer(TILE, { maxNativeZoom: (await DB.getMeta('satZoom')) || 17, maxZoom: 24, attribution: 'Esri' });
  layers.osm = L.tileLayer(OSM, { maxNativeZoom: 19, maxZoom: 24, attribution: '© OpenStreetMap' });
  gridOn = (await DB.getMeta('grid')) !== false;
  satOp = (await DB.getMeta('satOp')) || 1; layers.sat.setOpacity(satOp);
  snapOn = (await DB.getMeta('snap2')) === true;   // по умолчанию метка ставится точно туда, куда нажали
  // перенос границ участка из старой версии в общие данные (чтобы они попадали в облако)
  const old = await DB.getMeta('plot');
  if (old && !plantings.some(p => p.kind === 'plot')) { const rec = { id: 'plot', kind: 'plot', pts: old, updatedAt: Date.now() }; plantings.push(rec); await DB.put(rec); }
  setLayer((await DB.getMeta('layer')) || 'sat');
  // касание ждёт 0,3 с: если следом второе рядом — это приближение двойным касанием, а не новая точка или посадка
  let pending = null;
  map.on('click', e => {
    if (pending) {
      const near = pending.pt.distanceTo(e.containerPoint) < 30, prev = pending;
      clearTimeout(prev.t); pending = null;
      if (near) return;
      onMapTap(prev.ll);   // далеко — это два разных нажатия
    }
    pending = { ll: e.latlng, pt: e.containerPoint, t: setTimeout(() => { const p = pending; pending = null; onMapTap(p.ll); }, 300) };
  });
  map.on('zoomend', () => { drawGrid(); map.getContainer().classList.toggle('zlow', map.getZoom() < 17); });
  map.getContainer().classList.toggle('zlow', map.getZoom() < 17);
  initSearch(); initTools();
  if (c.fresh) { locate(true); hint('Найдите свой участок через поиск сверху и нажмите ⭐, чтобы карта всегда открывалась здесь.'); }
}
function setLayer(name) {
  curLayer = name;
  ['sat', 'osm'].forEach(k => { if (k === name) layers[k].addTo(map); else layers[k].remove(); });
  $('#map').style.background = name === 'blank' ? '#eef3e6' : '';
  if (!focusZone) DB.setMeta('layer', name);
  drawGrid();
}

/* --- геометрия: локальная система координат в метрах, ось вдоль первой стороны участка --- */
function frame(pts) {
  const lat0 = pts[0][0], lng0 = pts[0][1], kx = 111320 * Math.cos(lat0 * Math.PI / 180), ky = 110540;
  let ux = (pts[1][1] - lng0) * kx, uy = (pts[1][0] - lat0) * ky; const l = Math.hypot(ux, uy) || 1; ux /= l; uy /= l;
  const to = p => { const e = (p[1] - lng0) * kx, n = (p[0] - lat0) * ky; return [e * ux + n * uy, -e * uy + n * ux]; };
  const from = q => { const e = q[0] * ux - q[1] * uy, n = q[0] * uy + q[1] * ux; return [lat0 + n / ky, lng0 + e / kx]; };
  return { to, from };
}
function areaM2(pts) {
  const f = frame(pts), q = pts.map(f.to); let s = 0;
  q.forEach((p, i) => { const r = q[(i + 1) % q.length]; s += p[0] * r[1] - r[0] * p[1]; });
  return Math.abs(s) / 2;
}
function inPoly(p, q) {
  let c = false;
  for (let i = 0, j = q.length - 1; i < q.length; j = i++)
    if (((q[i][1] > p[1]) !== (q[j][1] > p[1])) && (p[0] < (q[j][0] - q[i][0]) * (p[1] - q[i][1]) / (q[j][1] - q[i][1]) + q[i][0])) c = !c;
  return c;
}
const sotki = pts => areaM2(pts) / 100;

/* --- сетка 1×1 м внутри границ участка --- */
const centroid = pts => [pts.reduce((a, p) => a + p[0], 0) / pts.length, pts.reduce((a, p) => a + p[1], 0) / pts.length];
// система координат сетки: берём участок, в котором лежит зона, — чтобы клетки зоны совпадали с клетками участка
const gridRec = z => plotAt(...centroid(z.pts)) || z;
function drawGrid() {
  if (gridLayer) gridLayer.remove(); gridLayer = null;
  const z = map.getZoom();
  const items = focusZone ? [{ rec: gridRec(focusZone), poly: focusZone.pts }] : plotRecs().map(r => ({ rec: r, poly: r.pts }));
  if (!items.length || (!focusZone && (!gridOn || z < 18))) return;
  const step = z >= 22 ? 0.1 : z >= 19 ? 1 : 5, every = step === 0.1 ? 10 : step === 1 ? 5 : 1;
  const thin = [], thick = [], col = curLayer === 'sat' ? '#ffffff' : '#546e7a';
  items.forEach(({ rec, poly }) => {
    const f = frame(rec.pts), q = poly.map(f.to), n = q.length;
    [0, 1].forEach(axis => {
      const vals = q.map(p => p[axis]);
      const k0 = Math.ceil(Math.min(...vals) / step - 1e-9), k1 = Math.floor(Math.max(...vals) / step + 1e-9);
      for (let k = k0; k <= k1; k++) {
        const v = k * step, xs = [];
        for (let i = 0; i < n; i++) {
          const p = q[i], r = q[(i + 1) % n], pv = p[axis], rv = r[axis];
          if ((pv <= v && v < rv) || (rv <= v && v < pv)) xs.push(p[1 - axis] + (v - pv) / (rv - pv) * (r[1 - axis] - p[1 - axis]));
        }
        xs.sort((x, y) => x - y);
        for (let i = 0; i + 1 < xs.length; i += 2) {
          const seg = axis ? [[xs[i], v], [xs[i + 1], v]] : [[v, xs[i]], [v, xs[i + 1]]];
          (k % every === 0 ? thick : thin).push(seg.map(f.from));
        }
      }
    });
  });
  gridLayer = L.layerGroup([
    L.polyline(thin, { color: col, weight: 1, opacity: 0.45, interactive: false }),
    L.polyline(thick, { color: col, weight: 1.6, opacity: 0.8, interactive: false })
  ]).addTo(map);
}
// привязка новой метки к центру клетки сетки (когда сетка видна и точка внутри участка)
function snap(ll) {
  const z = map.getZoom();
  if (!snapOn) return ll;
  if (focusZone) {   // внутри зоны: к центру клетки (1 м, а при сильном приближении 10 см) или свободно
    if (z < 19) return ll;
    const st = z >= 22 ? 0.1 : 1, f = frame(gridRec(focusZone).pts), p = f.to([ll.lat, ll.lng]);
    const [lat, lng] = f.from([(Math.floor(p[0] / st) + 0.5) * st, (Math.floor(p[1] / st) + 0.5) * st]);
    return { lat, lng };
  }
  const rec = plotAt(ll.lat, ll.lng);
  if (!gridOn || !rec || z < 19) return ll;
  const f = frame(rec.pts), q = rec.pts.map(f.to), p = f.to([ll.lat, ll.lng]);
  if (!inPoly(p, q)) return ll;
  const [lat, lng] = f.from([Math.floor(p[0]) + 0.5, Math.floor(p[1]) + 0.5]);
  return { lat, lng };
}

/* --- границы участка и строений --- */
function renderShapes() {
  if (!map) return;
  if (plotLayer) plotLayer.remove(); plotLayer = null;
  shapeLayers.forEach(l => l.remove()); shapeLayers = [];
  const ed = id => editing && editing.rec.id === id;
  const pls = plotRecs().filter(p => !ed(p.id)).map(pr => {
    const l = L.polygon(pr.pts, { color: '#f9a825', weight: 3, dashArray: '8 6', fillColor: '#f9a825', fillOpacity: 0.07, interactive: false });
    l.bindTooltip(esc(plotName(pr)) + ' ≈ ' + sotki(pr.pts).toFixed(1) + ' сот.', { permanent: true, direction: 'center', className: 'shape-label' });
    return l;
  });
  if (pls.length) plotLayer = L.featureGroup(pls).addTo(map);
  zoneRecs().filter(z => !ed(z.id) && (!focusZone || z.id === focusZone.id)).forEach(z => {
    const l = L.polygon(z.pts, { color: z.color, weight: 2, dashArray: '2 5', fillColor: z.color, fillOpacity: focusZone ? 0.04 : 0.16, interactive: false }).addTo(map);
    const n = inZone(z).length;
    l.bindTooltip('🌿 ' + esc(z.name) + (n ? ' · ' + n + ' раст.' : ''), { permanent: true, direction: 'center', className: 'shape-label' });
    shapeLayers.push(l);
  });
  shapeRecs().filter(s => !ed(s.id)).forEach(s => {
    const t = SHAPE_TYPES[s.type] || SHAPE_TYPES['Другое'];
    const l = L.polygon(s.pts, { color: t.c, weight: 2, fillColor: t.c, fillOpacity: 0.35, interactive: false }).addTo(map);
    l.bindTooltip(t.e + ' ' + (s.name || s.type) + ' · ' + Math.round(areaM2(s.pts)) + ' м²', { permanent: true, direction: 'center', className: 'shape-label' });
    shapeLayers.push(l);
  });
  drawGrid();
}
function redrawDraft() {
  if (draftLayer) draftLayer.remove();
  draftLayer = L.layerGroup([L.polyline(drawing, { color: '#f9a825', weight: 3, interactive: false }), ...drawing.map(p => L.circleMarker(p, { radius: 6, color: '#fff', weight: 2, fillColor: '#f9a825', fillOpacity: 1, interactive: false }))]).addTo(map);
  const what = drawKind === 'plot' ? 'участка' : drawKind === 'zone' ? 'зоны' : 'строения';
  hint(drawing.length < 3 ? 'Нажимайте на углы ' + what + ' по кругу (минимум 3 точки). Сейчас точек: ' + drawing.length : 'Точек: ' + drawing.length + '. Нажмите «Готово», когда обошли весь контур.');
}
function startDraw(kind) {
  drawKind = kind; drawing = []; redrawDraft(); $('#drawbar').style.display = 'flex'; $('#btn-gps').style.display = 'none';
}
function stopDraw() {
  drawing = null; if (draftLayer) draftLayer.remove(); draftLayer = null;
  $('#drawbar').style.display = 'none'; $('#btn-gps').style.display = ''; hint('');
}
const outsidePlot = pts => plotRecs().length > 0 && pts.some(p => !plotAt(p[0], p[1]));
async function finishDraw() {
  if (drawing.length < 3) return alert('Нужно минимум 3 точки');
  if (drawKind === 'zone' && outsidePlot(drawing) && !confirm('Часть углов зоны лежит за границей участка. Всё равно сохранить? (Отмена — вернуться и поправить точки)')) return;
  const pts = drawing, kind = drawKind; stopDraw();
  if (kind === 'plot') askPlot(pts);
  else if (kind === 'zone') askZone(pts);
  else askShape(pts);
}
function askPlot(pts) {
  openSheet(`<h3 style="margin-top:0">Новый участок</h3>
    <label>Название или кадастровый номер (необязательно)</label><input id="pl-name" placeholder="например, 33:08:070110:18">
    <p class="muted">Площадь: ≈ ${sotki(pts).toFixed(1)} сот. (${Math.round(areaM2(pts))} м²)</p>
    <button class="b" id="pl-ok">Сохранить</button><button class="b sec" id="pl-no">Отмена</button>`);
  $('#pl-no').onclick = closeSheet;
  $('#pl-ok').onclick = async () => { closeSheet(); await addPlot($('#pl-name').value.trim(), pts, uid()); };
}
async function addPlot(name, pts, id) {
  await save({ id, kind: 'plot', name, pts });
  map.fitBounds(plotLayer.getBounds().pad(0.1));
  await saveHome(true);
  hint('✅ Участок сохранён: ≈ ' + sotki(pts).toFixed(1) + ' сот. (' + Math.round(areaM2(pts)) + ' м²). Сетка 1×1 м появится при приближении.');
  setTimeout(() => hint(''), 9000);
}
// расстояние (км) между центрами двух контуров — чтобы заметить перепутанные широту и долготу
function kmBetween(a, b) {
  const [la1, lo1] = centroid(a), [la2, lo2] = centroid(b), r = Math.PI / 180;
  const dx = (lo2 - lo1) * Math.cos((la1 + la2) / 2 * r), dy = la2 - la1;
  return Math.hypot(dx, dy) * 111.32;
}
// true — можно добавлять; если новый участок далеко от уже заданных, спрашиваем (скорее всего, перепутаны широта и долгота)
function okFarPlot(pts) {
  const old = plotRecs()[0];
  if (!old) return true;
  const km = kmBetween(old.pts, pts);
  return km < 30 || confirm('Этот участок находится в ' + Math.round(km) + ' км от уже заданного. Возможно, перепутаны широта и долгота (сначала широта, потом долгота). Всё равно добавить?');
}
// «56.27, 42.04» по одной паре на строку → [[lat,lng],…]
function parseCoords(text) {
  const n = (text.match(/-?\d+(?:[.,]\d+)?/g) || []).map(x => +x.replace(',', '.'));
  const pts = [];
  for (let i = 0; i + 1 < n.length; i += 2) pts.push([n[i], n[i + 1]]);
  if (pts.length < 3 || n.length % 2 || pts.some(p => Math.abs(p[0]) > 90 || Math.abs(p[1]) > 180)) return null;
  return pts;
}
function askShape(pts) {
  openSheet(`<h3 style="margin-top:0">Что это за строение?</h3>
    <label>Тип</label><select id="sh-type">${Object.keys(SHAPE_TYPES).map(k => `<option>${k}</option>`).join('')}</select>
    <label>Название (необязательно)</label><input id="sh-name" placeholder="например, «Большая теплица»">
    <p class="muted">Площадь: ${Math.round(areaM2(pts))} м²</p>
    <button class="b" id="sh-ok">Сохранить</button><button class="b sec" id="sh-no">Отмена</button>`);
  $('#sh-no').onclick = closeSheet;
  $('#sh-ok').onclick = async () => { await save({ id: uid(), kind: 'shape', type: $('#sh-type').value, name: $('#sh-name').value.trim(), pts }); closeSheet(); };
}
function askZone(pts, rec) {
  const z = rec ? { ...rec } : { id: uid(), kind: 'zone', name: '', color: ZONE_COLORS[zoneRecs().length % ZONE_COLORS.length], pts };   // правим копию: «Отмена» ничего не меняет
  openSheet(`<h3 style="margin-top:0">${rec ? 'Изменить зону' : 'Новая зона'}</h3>
    <label>Название зоны</label><input id="z-name" value="${esc(z.name)}" placeholder="например, «Плодовый сад», «Виноградник», «Клумба у дома»">
    <label>Цвет</label><div class="swatches">${ZONE_COLORS.map(c => `<button class="sw${c === z.color ? ' on' : ''}" data-c="${c}" style="background:${c}"></button>`).join('')}</div>
    <p class="muted">Площадь: ${Math.round(areaM2(z.pts))} м² (≈ ${sotki(z.pts).toFixed(1)} сот.)</p>
    <button class="b" id="z-ok">Сохранить</button><button class="b sec" id="z-no">Отмена</button>`);
  sbody.querySelectorAll('.sw').forEach(b => b.onclick = () => { z.color = b.dataset.c; sbody.querySelectorAll('.sw').forEach(x => x.classList.toggle('on', x === b)); });
  $('#z-no').onclick = closeSheet;
  $('#z-ok').onclick = async () => {
    const nm = $('#z-name').value.trim(); if (!nm) return alert('Введите название зоны');
    z.name = nm; await save(rec ? Object.assign(rec, z) : z); closeSheet();
  };
}
function openZoneCard(z) {
  const items = inZone(z).sort((a, b) => b.plantedAt.localeCompare(a.plantedAt));
  openSheet(`
    <div class="h"><h3 style="margin:0">🌿 ${esc(z.name)}</h3><button id="z-x">✕</button></div>
    <div class="muted">${Math.round(areaM2(z.pts))} м² (≈ ${sotki(z.pts).toFixed(1)} сот.) · растений: ${items.length}</div>
    <p class="muted">Чтобы добавить растение — приблизьте карту (зона остаётся на месте) и нажмите в нужной точке внутри зоны.</p>
    <button class="b" id="z-go">🔍 Войти в зону (чистая сетка, до сантиметров)</button>
    <h3>Что здесь растёт</h3>
    ${items.map(p => `<div class="card" data-id="${p.id}"><div class="t">${cropEmoji(p.crop)} ${esc(p.crop)}${p.variety ? ' · ' + esc(p.variety) : ''}</div><div class="s">Посажено ${fmt(p.plantedAt)}</div></div>`).join('') || '<div class="muted">Пока пусто</div>'}
    <div style="margin-top:12px"><button class="b sec" id="z-edit">✏️ Название и цвет</button><button class="b sec" id="z-shape">📐 Править контур</button><button class="b red" id="z-del">Удалить зону</button></div>`);
  $('#z-x').onclick = closeSheet;
  $('#z-go').onclick = () => enterZone(z);
  $('#z-edit').onclick = () => askZone(null, z);
  $('#z-shape').onclick = () => startEdit(z);
  $('#z-del').onclick = async () => { if (confirm('Удалить зону «' + z.name + '»? Растения в ней останутся.')) { z.deleted = true; await save(z); closeSheet(); } };
  sbody.querySelectorAll('.card').forEach(c => c.onclick = () => openCard(c.dataset.id));
}
/* --- правка контура: перетаскивание точек, добавление и удаление --- */
const vIcon = L.divIcon({ className: '', html: '<div class="vtx"></div>', iconSize: [26, 26], iconAnchor: [13, 13] });
const mIcon = L.divIcon({ className: '', html: '<div class="vtx mid"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });
function startEdit(rec) {
  closeSheet(); switchView('map');
  editing = { rec, pts: rec.pts.map(p => [p[0], p[1]]) };
  $('#editbar').style.display = 'flex'; $('#btn-gps').style.display = 'none';
  renderShapes(); drawEdit();
  map.fitBounds(L.polygon(editing.pts).getBounds().pad(0.3), { maxZoom: 20 });
}
function editInfo() {
  const a = areaM2(editing.pts);
  hint('Тяните белые точки на нужное место. Маленькие точки между ними — нажмите, чтобы добавить угол. Нажмите на угол, чтобы удалить его. Площадь: ' + Math.round(a) + ' м² (≈ ' + (a / 100).toFixed(1) + ' сот.)');
}
function drawEdit() {
  if (editLayer) editLayer.remove();
  const pts = editing.pts, n = pts.length, g = L.layerGroup();
  const poly = L.polygon(pts, { color: '#fff', weight: 2, dashArray: '4 4', fillColor: '#fff', fillOpacity: 0.12, interactive: false });
  g.addLayer(poly);
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % n], mid = [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2];
    const mm = L.marker(mid, { icon: mIcon }); mm.on('click', e => { L.DomEvent.stopPropagation(e); pts.splice(i + 1, 0, mid); drawEdit(); }); g.addLayer(mm);
  });
  pts.forEach((p, i) => {
    const m = L.marker(p, { icon: vIcon, draggable: true });
    m.on('drag', e => { const ll = e.target.getLatLng(); pts[i] = [ll.lat, ll.lng]; poly.setLatLngs(pts); editInfo(); });
    m.on('dragend', drawEdit);
    m.on('click', e => { L.DomEvent.stopPropagation(e); if (n > 3 && confirm('Удалить этот угол?')) { pts.splice(i, 1); drawEdit(); } else if (n <= 3) hint('Нужно минимум 3 угла'); });
    g.addLayer(m);
  });
  editLayer = g.addTo(map); editInfo();
}
function stopEdit() {
  editing = null; if (editLayer) editLayer.remove(); editLayer = null;
  $('#editbar').style.display = 'none'; $('#btn-gps').style.display = ''; hint(''); renderShapes();
}
async function finishEdit() {
  if (editing.rec.kind === 'zone' && outsidePlot(editing.pts) && !confirm('Часть углов зоны лежит за границей участка. Всё равно сохранить? (Отмена — продолжить правку)')) return;
  const rec = editing.rec; rec.pts = editing.pts; stopEdit(); await save(rec);
  hint('✅ Контур сохранён. Площадь ≈ ' + sotki(rec.pts).toFixed(1) + ' сот. (' + Math.round(areaM2(rec.pts)) + ' м²)'); setTimeout(() => hint(''), 5000);
}
/* --- режим «внутри зоны»: чистый план, сетка 1 м (10 см при сильном приближении), только растения этой зоны --- */
function focusUi() {
  $('#f-name').textContent = '🌿 ' + (focusZone ? focusZone.name : '');
  $('#f-snap').textContent = snapOn ? '🧲 К центру клетки' : '✋ Где нажму';
}
function enterZone(z) {
  closeSheet(); switchView('map');
  if (editing) stopEdit();
  if (!focusZone) prevLayer = curLayer;
  focusZone = z; setLayer('blank');
  $('#focusbar').style.display = 'flex'; $('#btn-gps').style.display = 'none'; focusUi();
  renderShapes(); renderMarkers();
  setTimeout(() => {
    map.invalidateSize(); map.fitBounds(L.polygon(z.pts).getBounds().pad(0.1), { maxZoom: 21 });
    hint('Вы внутри зоны «' + z.name + '». Приближайте сколько нужно и нажимайте там, где посадили. Слой 🛰️ — подсказка, 🌓 — прозрачность.'); setTimeout(() => hint(''), 6000);
  }, 80);
}
function exitZone() {
  if (!focusZone) return;
  const z = focusZone; focusZone = null;
  setLayer(prevLayer || 'sat'); prevLayer = null;
  $('#focusbar').style.display = 'none'; $('#btn-gps').style.display = ''; hint('');
  renderShapes(); renderMarkers();
  map.fitBounds(L.polygon(z.pts).getBounds().pad(0.5), { maxZoom: 19 });
}
/* --- пошаговый путь --- */
function openSteps() {
  const st = [
    [plotRecs().length > 0, '1. Границы участка', 'Обведите участок на карте или внесите координаты из НСПД (Ещё → Участок).', '▢ Обвести участок', () => { closeSheet(); startDraw('plot'); }],
    [shapeRecs().length > 0, '2. Постройки', 'Дом, теплицы, сараи — обведите по спутнику (слой 🛰️).', '🏠 Обвести строение', () => { closeSheet(); startDraw('building'); }],
    [zoneRecs().length > 0, '3. Зоны', 'Картошка, виноградник, клубника — любые названия.', '🌿 Отметить зону', () => { closeSheet(); startDraw('zone'); }],
    [live().length > 0, '4. Посадки', 'Войдите в зону, приблизьте и ставьте точки там, где посадили.', '🔎 Войти в зону', () => { closeSheet(); $('#t-in').click(); }]
  ];
  openSheet('<h3 style="margin-top:0">🧭 Шаги</h3>' + st.map((x, i) => `<div class="card"><div class="t">${x[0] ? '✅' : '⬜'} ${x[1]}</div><div class="s">${x[2]}</div><button class="b${x[0] ? ' sec' : ''}" data-i="${i}">${x[3]}</button></div>`).join('') + '<button class="b sec" id="st-x">Закрыть</button>');
  sbody.querySelectorAll('[data-i]').forEach(b => b.onclick = () => st[+b.dataset.i][4]());
  $('#st-x').onclick = closeSheet;
}
function initTools() {
  $('#v-map').insertAdjacentHTML('beforeend', `<div class="tools"><button id="t-layer" title="Слой карты">🛰️</button><button id="t-plot" title="Обвести границы участка">▢</button><button id="t-zone" title="Отметить зону (сад, виноградник, клумба…)">🌿</button><button id="t-bld" title="Обвести строение">🏠</button><button id="t-grid" title="Сетка 1×1 м">🔳</button><button id="t-op" title="Прозрачность спутника">🌓</button><button id="t-in" title="Войти в зону">🔎</button><button id="t-steps" title="Шаги: что делать дальше">🧭</button><button id="t-fit" title="К моему участку">🎯</button></div>
    <div id="drawbar" class="drawbar" style="display:none"><button class="b sec" id="d-undo">↩ Убрать точку</button><button class="b" id="d-ok">✓ Готово</button><button class="b red" id="d-no">✕</button></div>
    <div id="focusbar" class="drawbar focusbar" style="display:none"><span id="f-name"></span><button class="b sec" id="f-snap"></button><button class="b red" id="f-out">✕ Выйти</button></div>
    <div id="editbar" class="drawbar" style="display:none"><button class="b" id="e-ok">✓ Сохранить контур</button><button class="b red" id="e-no">✕ Отмена</button></div>`);
  L.DomEvent.disableClickPropagation($('.tools')); L.DomEvent.disableClickPropagation($('#drawbar')); L.DomEvent.disableClickPropagation($('#editbar')); L.DomEvent.disableClickPropagation($('#focusbar'));
  const names = Object.keys(LAYER_NAMES);
  $('#t-layer').onclick = () => { const n = names[(names.indexOf(curLayer) + 1) % names.length]; setLayer(n); hint(LAYER_NAMES[n]); setTimeout(() => hint(''), 1800); };
  $('#t-plot').onclick = () => startDraw('plot');
  $('#t-bld').onclick = () => startDraw('building');
  $('#t-zone').onclick = () => startDraw('zone');
  $('#t-grid').onclick = () => {
    if (!plotRec()) { hint('Сначала обведите границы участка (кнопка ▢)'); setTimeout(() => hint(''), 3000); return; }
    gridOn = !gridOn; DB.setMeta('grid', gridOn); drawGrid();
    hint(gridOn ? 'Сетка 1×1 м включена (видна при приближении, метки встают в центр клетки)' : 'Сетка выключена'); setTimeout(() => hint(''), 3000);
  };
  $('#t-op').onclick = () => {
    satOp = satOp > 0.9 ? 0.6 : satOp > 0.5 ? 0.3 : 1; layers.sat.setOpacity(satOp); DB.setMeta('satOp', satOp);
    hint('Прозрачность снимка: ' + Math.round(satOp * 100) + '%' + (curLayer === 'sat' ? '' : ' (включите слой 🛰️, чтобы увидеть)')); setTimeout(() => hint(''), 2000);
  };
  $('#t-in').onclick = () => {
    const zs = zoneRecs(), c = map.getCenter();
    const z = zoneAt(c.lat, c.lng) || (zs.length === 1 ? zs[0] : null);
    if (z) return enterZone(z);
    if (!zs.length) { hint('Зон пока нет. Нажмите 🌿 и обведите первую зону.'); setTimeout(() => hint(''), 3000); return; }
    openSheet('<h3 style="margin-top:0">В какую зону войти?</h3>' + zs.map(x => `<div class="card" data-id="${x.id}"><div class="t">🌿 ${esc(x.name)}</div><div class="s">${Math.round(areaM2(x.pts))} м²</div></div>`).join(''));
    sbody.querySelectorAll('.card').forEach(c => c.onclick = () => enterZone(zs.find(x => x.id === c.dataset.id)));
  };
  $('#t-steps').onclick = openSteps;
  $('#f-out').onclick = exitZone;
  $('#f-snap').onclick = () => { snapOn = !snapOn; DB.setMeta('snap2', snapOn); focusUi(); };
  $('#t-fit').onclick = () => { if (focusZone) return map.fitBounds(L.polygon(focusZone.pts).getBounds().pad(0.1), { maxZoom: 21 }); if (plotLayer) map.fitBounds(plotLayer.getBounds().pad(0.1)); else goHome(); };
  $('#d-undo').onclick = () => { drawing.pop(); redrawDraft(); };
  $('#d-ok').onclick = finishDraw;
  $('#d-no').onclick = stopDraw;
  $('#e-ok').onclick = finishEdit;
  $('#e-no').onclick = stopEdit;
}
async function goHome() {
  const h = await DB.getMeta('home');
  if (h) map.setView([h.lat, h.lng], h.z); else locate(true);
}
async function saveHome(silent) {
  const c = map.getCenter();
  await DB.setMeta('home', { lat: c.lat, lng: c.lng, z: map.getZoom() });
  if (silent === true) return;
  hint('⭐ Запомнено: теперь карта всегда открывается на этом месте.'); setTimeout(() => hint(''), 3500);
}
/* ---------- Поиск места ---------- */
function initSearch() {
  $('#v-map').insertAdjacentHTML('beforeend', `<div id="search" class="search"><div class="srow"><input id="q-place" placeholder="Деревня, адрес или координаты"><button id="q-go" title="Найти">🔍</button><button id="q-home" title="Запомнить как мой участок">⭐</button></div><div id="q-res"></div></div>`);
  const box = $('#search'); L.DomEvent.disableClickPropagation(box); L.DomEvent.disableScrollPropagation(box);
  const res = $('#q-res');
  const jump = (lat, lng, z) => { map.setView([lat, lng], z); res.innerHTML = ''; };
  const go = async () => {
    const q = $('#q-place').value.trim(); if (!q) return;
    if (/^[-\d.,;\s]+$/.test(q)) {
      const n = (q.match(/-?\d+(?:[.,]\d+)?/g) || []).map(s => +s.replace(',', '.'));
      if (n.length === 2 && Math.abs(n[0]) <= 90 && Math.abs(n[1]) <= 180) return jump(n[0], n[1], 18);
    }
    if (!navigator.onLine) { res.innerHTML = '<div class="r">Для поиска нужен интернет</div>'; return; }
    res.innerHTML = '<div class="r">Ищу…</div>';
    try {
      const r = await fetch('https://nominatim.openstreetmap.org/search?format=jsonv2&limit=6&accept-language=ru&q=' + encodeURIComponent(q));
      const arr = await r.json();
      res.innerHTML = arr.length ? arr.map((x, i) => `<div class="r" data-i="${i}">${esc(x.display_name)}</div>`).join('') : '<div class="r">Ничего не найдено. Попробуйте название ближайшей деревни или координаты.</div>';
      res.querySelectorAll('[data-i]').forEach(d => d.onclick = () => { const x = arr[+d.dataset.i]; jump(+x.lat, +x.lon, 17); });
    } catch (_) { res.innerHTML = '<div class="r">Не удалось выполнить поиск. Проверьте интернет.</div>'; }
  };
  $('#q-go').onclick = go;
  $('#q-place').onkeydown = e => { if (e.key === 'Enter') go(); };
  $('#q-home').onclick = () => saveHome();
}
function locate(center) {
  return new Promise(res => {
    if (!navigator.geolocation) return res(null);
    navigator.geolocation.getCurrentPosition(p => {
      const ll = { lat: p.coords.latitude, lng: p.coords.longitude };
      if (center) map.setView([ll.lat, ll.lng], 18);
      res(ll);
    }, () => res(null), { enableHighAccuracy: true, timeout: 15000 });
  });
}
function onMapTap(ll) {
  if (editing) return;
  if (drawing) { drawing.push([ll.lat, ll.lng]); redrawDraft(); return; }
  if (movingId) {
    const p = plantings.find(x => x.id === movingId); movingId = null; hint('');
    if (p) { p.lat = ll.lat; p.lng = ll.lng; save(p); }
    return;
  }
  if (focusZone) {
    if (!inPoly([ll.lat, ll.lng], focusZone.pts)) { hint('Это вне зоны «' + focusZone.name + '». Нажмите внутри зоны или выйдите из неё.'); setTimeout(() => hint(''), 2500); return; }
    openForm(null, snap(ll)); return;
  }
  const z = zoneAt(ll.lat, ll.lng);
  if (z && map.getZoom() < 18) { openZoneCard(z); return; }   // издалека — карточка зоны, вблизи — новая посадка
  openForm(null, snap(ll));
}
function hint(t) { const h = $('#hint'); h.textContent = t; h.style.display = t ? 'block' : 'none'; }
function renderMarkers() {
  Object.values(markers).forEach(m => m.remove()); markers = {};
  inYear().forEach(p => {
    if (p.lat == null) return;
    if (focusZone && !inPoly([p.lat, p.lng], focusZone.pts)) return;
    const icon = L.divIcon({ className: '', html: `<div class="pin">${cropEmoji(p.crop)}</div>`, iconSize: [30, 30], iconAnchor: [15, 15] });
    const m = L.marker([p.lat, p.lng], { icon }).addTo(map);
    m.bindTooltip(esc(p.crop + (p.variety ? ' · ' + p.variety : '')), { direction: 'top', offset: [0, -12] });
    m.on('click', ev => { L.DomEvent.stopPropagation(ev); openCard(p.id); });
    markers[p.id] = m;
  });
}
$('#btn-gps').onclick = async () => {
  hint('Определяю положение…');
  const ll = await locate(false); hint('');
  if (!ll) return alert('Не удалось определить положение. Нажмите на карту в нужном месте.');
  map.setView([ll.lat, ll.lng], Math.max(map.getZoom(), 19));
  openForm(null, ll);
};

/* ---------- Карточка / форма ---------- */
const sheet = $('#sheet'), sbody = $('#sheet-body');
function openSheet(html) { sbody.innerHTML = html; sheet.classList.remove('hidden'); sbody.scrollTop = 0; }
function closeSheet() { sheet.classList.add('hidden'); sbody.innerHTML = ''; }
sheet.addEventListener('click', e => { if (e.target === sheet) closeSheet(); });

function openForm(p, ll) {
  const isNew = !p;
  p = p || { id: uid(), crop: '', variety: '', plantedAt: today(), note: '', photos: [], harvests: [], done: [], lat: ll.lat, lng: ll.lng };
  openSheet(`
    <h3 style="margin-top:0">${isNew ? 'Новая посадка' : 'Изменить'}</h3>
    <label>Культура</label><input id="f-crop" list="crops" value="${esc(p.crop)}" placeholder="Томат, огурец, яблоня…">
    <label>Сорт</label><input id="f-var" value="${esc(p.variety)}">
    <label>Дата посадки</label><input id="f-date" type="date" value="${p.plantedAt}">
    <label>Как растёт</label><select id="f-per"><option value="0">Однолетнее (каждый год сажаю заново)</option><option value="1">Многолетнее (растёт много лет)</option></select>
    <label>Убрано / выкорчевано (если уже нет)</label><input id="f-rm" type="date" value="${p.removedAt || ''}">
    <label>Заметка (сколько, где именно, как сажал)</label><textarea id="f-note">${esc(p.note)}</textarea>
    <button class="b" id="f-ok">Сохранить</button><button class="b sec" id="f-no">Отмена</button>`);
  $('#f-no').onclick = closeSheet;
  let perTouched = !isNew;
  $('#f-per').value = isPer(p) ? '1' : '0';
  $('#f-per').onchange = () => { perTouched = true; };
  $('#f-crop').oninput = () => { if (!perTouched) $('#f-per').value = cropInfo($('#f-crop').value.trim()).per ? '1' : '0'; };
  $('#f-ok').onclick = async () => {
    const crop = $('#f-crop').value.trim();
    if (!crop) return alert('Укажите культуру');
    p.crop = crop; p.variety = $('#f-var').value.trim(); p.plantedAt = $('#f-date').value || today(); p.note = $('#f-note').value;
    p.perennial = $('#f-per').value === '1'; p.removedAt = $('#f-rm').value || '';
    await save(p); closeSheet();
    if (isNew) { year = new Date(p.plantedAt).getFullYear(); renderAll(); }
  };
}

function openCard(id) {
  const p = plantings.find(x => x.id === id); if (!p) return;
  const info = cropInfo(p.crop), age = daysBetween(p.plantedAt, today());
  const total = (p.harvests || []).reduce((a, h) => a + (+h.amount || 0), 0);
  const units = [...new Set((p.harvests || []).map(h => h.unit))].join(', ');
  const hv = info.harvest;
  const win = hv ? `Ожидаемый сбор: ${fmt(addDays(p.plantedAt, hv[0]))} — ${fmt(addDays(p.plantedAt, hv[1]))}` : '';
  openSheet(`
    <div class="h"><h3 style="margin:0">${cropEmoji(p.crop)} ${esc(p.crop)}${p.variety ? ' · ' + esc(p.variety) : ''}</h3><button id="c-x">✕</button></div>
    <div class="muted">Посажено ${fmt(p.plantedAt)} (${age >= 0 ? age + ' дн. назад' : 'через ' + (-age) + ' дн.'})${p.lat != null && zoneAt(p.lat, p.lng) ? ' · зона: ' + esc(zoneAt(p.lat, p.lng).name) : ''}</div>
    ${p.note ? `<p>${esc(p.note).replace(/\n/g, '<br>')}</p>` : ''}
    <div class="photos">${(p.photos || []).map((s, i) => `<img src="${s}" data-i="${i}">`).join('')}</div>
    <label>Добавить фото</label><input id="c-photo" type="file" accept="image/*" capture="environment">
    <h3>Урожай${total ? ` — всего ${+total.toFixed(2)} ${esc(units)}` : ''}</h3>
    ${(p.harvests || []).map((h, i) => `<div class="h"><span>${fmt(h.date)} — ${esc(h.amount)} ${esc(h.unit)}</span><button data-hd="${i}">🗑</button></div>`).join('') || '<div class="muted">Пока ничего не собрано</div>'}
    <div class="row" style="margin-top:8px"><input id="h-date" type="date" value="${today()}"><input id="h-amt" type="number" step="any" inputmode="decimal" placeholder="Сколько"><select id="h-unit"><option>кг</option><option>шт</option><option>вёдра</option><option>л</option></select></div>
    <button class="b" id="h-add">+ Записать сбор</button>
    ${info.tips || win ? `<div class="tips"><b>Уход:</b> ${esc(info.tips)}<br>${win}</div>` : ''}
    <div style="margin-top:12px">
      <button class="b sec" id="c-edit">✏️ Изменить</button>
      <button class="b sec" id="c-move">📍 Переместить</button>
      <button class="b sec" id="c-show">🗺️ На карте</button>
      <button class="b red" id="c-del">Удалить</button>
    </div>`);
  $('#c-x').onclick = closeSheet;
  $('#c-edit').onclick = () => openForm(p);
  $('#c-show').onclick = () => { closeSheet(); switchView('map'); if (p.lat != null) map.setView([p.lat, p.lng], 20); };
  $('#c-move').onclick = () => { closeSheet(); switchView('map'); movingId = p.id; hint('Нажмите на карте новое место для «' + p.crop + '»'); };
  $('#c-del').onclick = async () => { if (confirm('Удалить посадку «' + p.crop + '»?')) { p.deleted = true; await save(p); closeSheet(); } };
  $('#h-add').onclick = async () => {
    const a = $('#h-amt').value; if (!a) return alert('Укажите количество');
    p.harvests = p.harvests || []; p.harvests.push({ date: $('#h-date').value || today(), amount: +a, unit: $('#h-unit').value });
    await save(p); openCard(p.id);
  };
  sbody.querySelectorAll('[data-hd]').forEach(b => b.onclick = async () => { p.harvests.splice(+b.dataset.hd, 1); await save(p); openCard(p.id); });
  sbody.querySelectorAll('.photos img').forEach(im => im.onclick = () => { if (confirm('Удалить это фото?')) { p.photos.splice(+im.dataset.i, 1); save(p).then(() => openCard(p.id)); } });
  $('#c-photo').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    p.photos = p.photos || []; p.photos.push(await shrink(f)); await save(p); openCard(p.id);
  };
}
function shrink(file, max = 900) {
  return new Promise(res => {
    const img = new Image(), url = URL.createObjectURL(file);
    img.onload = () => {
      const k = Math.min(1, max / Math.max(img.width, img.height)), c = document.createElement('canvas');
      c.width = img.width * k; c.height = img.height * k; c.getContext('2d').drawImage(img, 0, 0, c.width, c.height);
      URL.revokeObjectURL(url); res(c.toDataURL('image/jpeg', 0.7));
    };
    img.src = url;
  });
}

/* ---------- Вкладки ---------- */
function renderList() {
  const items = inYear().sort((a, b) => b.plantedAt.localeCompare(a.plantedAt));
  const sums = {};
  items.forEach(p => (p.harvests || []).filter(h => new Date(h.date).getFullYear() === year).forEach(h => { const k = p.crop + '|' + h.unit; sums[k] = (sums[k] || 0) + (+h.amount || 0); }));
  const sumHtml = Object.entries(sums).map(([k, v]) => { const [c, u] = k.split('|'); return `<div>${cropEmoji(c)} ${esc(c)}: <b>${+v.toFixed(2)} ${esc(u)}</b></div>`; }).join('');
  $('#v-list').innerHTML = `
    <div class="card"><div class="t">Урожай ${year}</div>${sumHtml || '<div class="s">Пока ничего не собрано</div>'}</div>
    <input id="q" placeholder="Поиск по культуре, сорту, заметке" style="margin-bottom:10px">
    <div id="items"></div>`;
  const draw = () => {
    const q = $('#q').value.toLowerCase();
    $('#items').innerHTML = items.filter(p => (p.crop + p.variety + p.note).toLowerCase().includes(q)).map(p => `
      <div class="card" data-id="${p.id}"><div class="t">${cropEmoji(p.crop)} ${esc(p.crop)}${p.variety ? ' · ' + esc(p.variety) : ''}</div>
      <div class="s">${isPer(p) ? '🌳 многолетнее · ' : ''}Посажено ${fmt(p.plantedAt)}${p.removedAt ? ' · убрано ' + fmt(p.removedAt) : ''}${p.lat == null ? ' · без места на карте' : (zoneAt(p.lat, p.lng) ? ' · ' + esc(zoneAt(p.lat, p.lng).name) : '')}</div></div>`).join('') || '<div class="muted">Посадок за этот год нет. Нажмите на карту, чтобы добавить.</div>';
    $('#items').querySelectorAll('.card').forEach(c => c.onclick = () => openCard(c.dataset.id));
  };
  $('#q').oninput = draw; draw();
}

function renderTodo() {
  const t = today(), list = [];
  live().forEach(p => {
    const info = cropInfo(p.crop); p.done = p.done || [];
    info.tasks.forEach(([d, text], i) => {
      const due = addDays(p.plantedAt, d), key = i + ':' + text;
      if (p.done.includes(key)) return;
      const diff = daysBetween(t, due);
      if (diff <= 3 && diff >= -30) list.push({ p, due, diff, text, key });
    });
    if (info.harvest) {
      const a = addDays(p.plantedAt, info.harvest[0]), b = addDays(p.plantedAt, info.harvest[1]);
      if (t >= a && t <= b && !(p.harvests || []).length && !p.done.includes('harvest'))
        list.push({ p, due: a, diff: daysBetween(t, a), text: 'Пора проверять урожай (сбор до ' + fmt(b) + ')', key: 'harvest' });
    }
  });
  list.sort((x, y) => x.diff - y.diff);
  $('#v-todo').innerHTML = '<h3 style="margin-top:0">Что пора сделать</h3>' + (list.map((x, i) => `
    <div class="card"><div class="t">${cropEmoji(x.p.crop)} ${esc(x.p.crop)}: ${esc(x.text)}</div>
    <div class="s">${x.diff < 0 ? 'просрочено на ' + (-x.diff) + ' дн.' : x.diff === 0 ? 'сегодня' : 'через ' + x.diff + ' дн.'} · посажено ${fmt(x.p.plantedAt)}</div>
    <button class="b sec" data-i="${i}">✓ Сделано</button><button class="b sec" data-o="${i}">Открыть</button></div>`).join('') || '<div class="muted">Сейчас дел по справочнику нет. Дела рассчитываются от даты посадки.</div>');
  $('#v-todo').querySelectorAll('[data-i]').forEach(b => b.onclick = async () => { const x = list[+b.dataset.i]; x.p.done.push(x.key); await save(x.p); });
  $('#v-todo').querySelectorAll('[data-o]').forEach(b => b.onclick = () => openCard(list[+b.dataset.o].p.id));
}

// карточки в «Ещё»: каждому участку — свои зоны и постройки (по тому, в каком участке лежит центр контура)
const ownerOf = rec => plotAt(...centroid(rec.pts));
function plotCard(p) {
  return `<div class="card"><div class="t">🟨 ${esc(plotName(p))}</div><div class="s">Участок · ${sotki(p.pts).toFixed(1)} сот. (${Math.round(areaM2(p.pts))} м²)</div>
      <button class="b sec" data-sh="show:${p.id}">На карте</button><button class="b sec" data-sh="ren:${p.id}">Название</button><button class="b sec" data-sh="edit:${p.id}">📐 Контур</button><button class="b red" data-sh="del:${p.id}">Удалить</button></div>`;
}
function zoneCardHtml(z) {
  return `<div class="card"><div class="t">🌿 ${esc(z.name)}</div><div class="s">Зона · ${Math.round(areaM2(z.pts))} м² · растений: ${inZone(z).length}</div>
      <button class="b sec" data-sh="card:${z.id}">Открыть</button><button class="b sec" data-sh="show:${z.id}">На карте</button><button class="b sec" data-sh="edit:${z.id}">📐 Контур</button><button class="b red" data-sh="del:${z.id}">Удалить</button></div>`;
}
function shapeCardHtml(s) {
  return `<div class="card"><div class="t">${(SHAPE_TYPES[s.type] || SHAPE_TYPES['Другое']).e} ${esc(s.name || s.type)}</div><div class="s">${esc(s.type)} · ${Math.round(areaM2(s.pts))} м²</div>
      <button class="b sec" data-sh="show:${s.id}">На карте</button><button class="b sec" data-sh="ren:${s.id}">Переименовать</button><button class="b sec" data-sh="edit:${s.id}">📐 Контур</button><button class="b red" data-sh="del:${s.id}">Удалить</button></div>`;
}
function settingsGroups() {
  const plots = plotRecs(), zs = zoneRecs(), ss = shapeRecs();
  const inner = (zl, sl) => (zl.length || sl.length) ? zl.map(zoneCardHtml).join('') + sl.map(shapeCardHtml).join('') : '<div class="muted">Зон и построек здесь пока нет</div>';
  let html = plots.map(p => `<div class="pgroup">${plotCard(p)}<div class="pin-list">${inner(zs.filter(z => ownerOf(z) === p), ss.filter(x => ownerOf(x) === p))}</div></div>`).join('');
  const lz = zs.filter(z => !ownerOf(z)), ls = ss.filter(x => !ownerOf(x));
  if (lz.length || ls.length) html += `<div class="pgroup"><div class="card"><div class="t">Вне участков</div><div class="s">Эти зоны и постройки не попали внутрь границ ни одного участка</div></div><div class="pin-list">${inner(lz, ls)}</div></div>`;
  return html || '<div class="muted">Границы участка ещё не заданы (кнопка ▢ на карте или координаты ниже).</div>';
}
async function renderSettings() {
  const cfg = (await DB.getMeta('sync')) || {};
  const last = await DB.getMeta('lastSync');
  $('#v-set').innerHTML = `
    <h3 style="margin-top:0">Карта без интернета</h3>
    <div class="muted">Пока есть интернет, наведите карту на участок (чтобы он был виден целиком) и нажмите кнопку — снимок сохранится в телефон.</div>
    <button class="b" id="s-dl">⬇️ Скачать карту этого вида</button>
    <div id="dl-st" class="muted"></div>
    <h3>Резервная копия в облаке</h3>
    <div class="muted">Supabase (бесплатно). Инструкция — в файле README.</div>
    <label>Адрес проекта (Project URL)</label><input id="s-url" value="${esc(cfg.url || '')}" placeholder="https://xxxx.supabase.co">
    <label>Ключ (anon public key)</label><input id="s-key" value="${esc(cfg.key || '')}">
    <label>Почта</label><input id="s-mail" type="email" value="${esc(cfg.mail || '')}">
    <label>Пароль</label><input id="s-pass" type="password" value="${esc(cfg.pass || '')}">
    <button class="b" id="s-save">Сохранить и синхронизировать</button>
    <div id="sync-st" class="muted">${last ? 'Последняя синхронизация: ' + new Date(last).toLocaleString('ru-RU') : 'Не синхронизировано'}</div>
    <h3>Файл-копия</h3>
    <button class="b sec" id="s-exp">Сохранить в файл</button>
    <label style="display:inline-block" class="b sec">Загрузить из файла<input id="s-imp" type="file" accept=".json" hidden></label>
    <h3>Участок, зоны и строения</h3>
    ${settingsGroups()}
    <label>Добавить участок по координатам (широта, долгота — по одной паре на строку, из НСПД)</label>
    <input id="pc-name" placeholder="Название или кадастровый номер">
    <textarea id="pc-pts" placeholder="Пример (это подсказка, не данные):&#10;55.1234567, 37.1234567&#10;55.1236000, 37.1240000&#10;55.1230000, 37.1242000"></textarea>
    <button class="b" id="pc-add">+ Добавить участок</button><button class="b sec" id="pc-clear">Очистить поля</button>
    <h3>Слой карты</h3>
    <label>Максимальная детализация снимка (если при приближении видите «Map data not yet available» — уменьшите)</label>
    <select id="s-z"><option>15</option><option>16</option><option>17</option><option>18</option><option>19</option></select>
    <h3>Участок</h3>
    <button class="b sec" id="s-home">⭐ Запомнить текущий вид карты как мой участок</button>
    <button class="b sec" id="s-loc">📍 Перейти к моему положению</button>`;
  $('#s-dl').onclick = downloadTiles;
  $('#pc-add').onclick = async () => {
    const pts = parseCoords($('#pc-pts').value);
    if (!pts) return alert('Не получилось разобрать координаты. Нужно минимум 3 пары чисел: широта, долгота, по одной паре на строку.');
    if (!okFarPlot(pts)) return;
    switchView('map'); await addPlot($('#pc-name').value.trim(), pts, uid());
  };
  $('#pc-clear').onclick = () => { $('#pc-name').value = ''; $('#pc-pts').value = ''; };
  $('#v-set').querySelectorAll('[data-sh]').forEach(b => b.onclick = async () => {
    const [act, id] = b.dataset.sh.split(':'), s = plantings.find(x => x.id === id); if (!s) return;
    if (act === 'card') { openZoneCard(s); return; }
    if (act === 'edit') { startEdit(s); return; }
    if (act === 'show') { switchView('map'); map.fitBounds(L.polygon(s.pts).getBounds().pad(0.4)); }
    else if (act === 'ren') { const nm = prompt('Название', s.name || ''); if (nm !== null) { s.name = nm.trim(); await save(s); renderSettings(); } }
    else if (act === 'del' && confirm('Удалить «' + (s.name || s.type || 'Участок') + '»?')) { s.deleted = true; await save(s); renderSettings(); }
  });
  $('#s-z').value = layers.sat.options.maxNativeZoom;
  $('#s-z').onchange = e => { layers.sat.options.maxNativeZoom = +e.target.value; layers.sat.redraw(); DB.setMeta('satZoom', +e.target.value); };
  $('#s-loc').onclick = () => { switchView('map'); locate(true); };
  $('#s-home').onclick = () => { switchView('map'); setTimeout(() => hint('Подвиньте карту на свой участок и нажмите ⭐ вверху'), 100); };
  $('#s-save').onclick = async () => {
    await DB.setMeta('sync', { url: $('#s-url').value.trim(), key: $('#s-key').value.trim(), mail: $('#s-mail').value.trim(), pass: $('#s-pass').value });
    Sync.client = null; await Sync.run(true);
  };
  $('#s-exp').onclick = () => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([JSON.stringify(plantings)], { type: 'application/json' }));
    a.download = 'dacha-' + today() + '.json'; a.click();
  };
  $('#s-imp').onchange = async e => {
    const f = e.target.files[0]; if (!f) return;
    try {
      const arr = JSON.parse(await f.text());
      for (const p of arr) { const cur = plantings.find(x => x.id === p.id); if (!cur || (cur.updatedAt || 0) < (p.updatedAt || 0)) { if (cur) plantings[plantings.indexOf(cur)] = p; else plantings.push(p); await DB.put(p); } }
      renderAll(); alert('Готово: загружено ' + arr.length);
    } catch (_) { alert('Не удалось прочитать файл'); }
  };
}

/* ---------- Скачивание карты ---------- */
const lon2x = (lon, z) => Math.floor((lon + 180) / 360 * 2 ** z);
const lat2y = (lat, z) => Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * 2 ** z);
async function downloadTiles() {
  const st = $('#dl-st');
  if (!navigator.onLine) return st.textContent = 'Нет интернета: скачайте карту там, где он есть.';
  const src = { sat: { url: TILE, max: layers.sat.options.maxNativeZoom }, osm: { url: OSM, max: 19 } }[curLayer];
  if (!src) return st.textContent = 'Для «чистого плана» карту скачивать не нужно: он работает без интернета.';
  const b = map.getBounds().pad(0.15), urls = [];
  for (let z = 15; z <= src.max; z++) {
    const x0 = lon2x(b.getWest(), z), x1 = lon2x(b.getEast(), z), y0 = lat2y(b.getNorth(), z), y1 = lat2y(b.getSouth(), z);
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) urls.push(src.url.replace('{z}', z).replace('{x}', x).replace('{y}', y));
  }
  if (curLayer === 'osm' && urls.length > 400) return st.textContent = 'Для схемы OpenStreetMap можно сохранять только небольшую область (до 400 фрагментов, сейчас ' + urls.length + '). Приблизьте карту к участку.';
  if (urls.length > 2500) return st.textContent = 'Слишком большая область (' + urls.length + ' фрагментов). Приблизьте карту к участку.';
  if (!confirm(`Скачать ${urls.length} фрагментов карты (около ${Math.round(urls.length * 0.025)} МБ)?`)) return;
  const cache = await caches.open('tiles'); let n = 0, bad = 0;
  const worker = async () => {
    while (urls.length) {
      const u = urls.pop();
      try { if (!(await cache.match(u))) { const r = await fetch(u); if (r.ok) await cache.put(u, r); else bad++; } } catch (_) { bad++; }
      st.textContent = `Скачано ${++n}…`;
    }
  };
  await Promise.all([worker(), worker(), worker(), worker()]);
  st.textContent = `Готово. Скачано ${n - bad}${bad ? ', не удалось ' + bad : ''}. Теперь карта этого участка работает без интернета.`;
}

/* ---------- Облако (Supabase) ---------- */
const Sync = {
  client: null, timer: null,
  schedule() { clearTimeout(this.timer); this.timer = setTimeout(() => this.run(false), 3000); },
  async run(manual) {
    const st = $('#sync-st'), say = t => { if (st) st.textContent = t; if (manual && !st) alert(t); };
    const cfg = await DB.getMeta('sync');
    if (!cfg || !cfg.url || !cfg.key || !cfg.mail) return manual && say('Заполните настройки облака');
    if (!navigator.onLine) return manual && say('Нет интернета — синхронизируем позже');
    try {
      if (!this.client) {
        this.client = supabase.createClient(cfg.url, cfg.key);
        let { error } = await this.client.auth.signInWithPassword({ email: cfg.mail, password: cfg.pass });
        if (error) { const r = await this.client.auth.signUp({ email: cfg.mail, password: cfg.pass }); if (r.error) throw r.error; }
      }
      const { data, error } = await this.client.from('plantings').select('id,updated_at,data');
      if (error) throw error;
      const remote = new Map(data.map(r => [r.id, r]));
      const push = [];
      for (const r of data) {
        const cur = plantings.find(x => x.id === r.id);
        if (!cur) { plantings.push(r.data); await DB.put(r.data); }
        else if ((cur.updatedAt || 0) < r.updated_at) { plantings[plantings.indexOf(cur)] = r.data; await DB.put(r.data); }
      }
      for (const p of plantings) { const r = remote.get(p.id); if (!r || r.updated_at < (p.updatedAt || 0)) push.push({ id: p.id, updated_at: p.updatedAt || 0, data: p }); }
      if (push.length) { const { error: e2 } = await this.client.from('plantings').upsert(push); if (e2) throw e2; }
      await DB.setMeta('lastSync', Date.now()); renderAll();
      say('Синхронизировано: ' + new Date().toLocaleTimeString('ru-RU'));
    } catch (e) { this.client = null; say('Ошибка облака: ' + (e.message || e)); }
  }
};

/* ---------- Каркас ---------- */
function switchView(v) {
  document.querySelectorAll('.view').forEach(e => e.classList.toggle('active', e.id === 'v-' + v));
  document.querySelectorAll('nav button').forEach(b => b.classList.toggle('on', b.dataset.v === v));
  if (v === 'map') setTimeout(() => map.invalidateSize(), 50);
  if (v === 'set') renderSettings();
}
document.querySelectorAll('nav button').forEach(b => b.onclick = () => switchView(b.dataset.v));

function renderYears() {
  const ys = new Set([new Date().getFullYear(), year]);
  live().forEach(p => { ys.add(new Date(p.plantedAt).getFullYear()); (p.harvests || []).forEach(h => ys.add(new Date(h.date).getFullYear())); });
  const sel = $('#year'); sel.innerHTML = [...ys].sort((a, b) => b - a).map(y => `<option ${y === year ? 'selected' : ''}>${y}</option>`).join('');
}
$('#year').onchange = e => { year = +e.target.value; renderAll(); };
function renderNet() { $('#net').textContent = navigator.onLine ? '● онлайн' : '○ офлайн'; }
addEventListener('online', () => { renderNet(); Sync.run(false); }); addEventListener('offline', renderNet);
function renderAll() { renderYears(); if (map) { renderShapes(); renderMarkers(); } renderList(); renderTodo(); }

// ссылка вида  ?plot=Название@lat,lng;lat,lng;…  добавляет участок одним нажатием
async function importFromLink() {
  const q = new URLSearchParams(location.search).get('plot'); if (!q) return;
  history.replaceState(null, '', location.pathname);
  const [name, rest] = q.includes('@') ? q.split('@') : ['', q];
  const pts = parseCoords((rest || '').replace(/;/g, '\n'));
  if (!pts) return alert('Ссылка с участком повреждена');
  if (!okFarPlot(pts)) return;
  const id = 'plot-' + (name || 'link').replace(/[^0-9A-Za-zА-Яа-я]+/g, '-');
  if (confirm('Добавить участок «' + (name || 'без названия') + '» ≈ ' + sotki(pts).toFixed(1) + ' сот. (' + Math.round(areaM2(pts)) + ' м²)?')) await addPlot(name, pts, id);
}

(async function start() {
  $('#crops').innerHTML = Object.keys(CROPS).map(c => `<option value="${esc(c)}">`).join('');
  await DB.open();
  plantings = await DB.all();
  await initMap(); renderNet(); renderAll();
  importFromLink();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
  Sync.run(false);
})();

'use strict';
/* ---------- Справочник культур ---------- */
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
  'Кабачок': { e: '🥒', harvest: [45, 65], tips: 'Много воды и места. Собирать молодыми, тогда плодоносит дольше.', tasks: [[14, 'Подкормка'], [35, 'Начать сбор, собирать молодыми']] },
  'Тыква': { e: '🎃', harvest: [90, 130], tips: 'Любит солнце, воду и питание. Пасынковать плети, оставить 2-3 плода.', tasks: [[21, 'Подкормка'], [50, 'Прищипнуть плети']] },
  'Редис': { e: '🌰', harvest: [20, 35], tips: 'Быстрая культура. Не загущать, поливать регулярно, иначе пустеет.', tasks: [[10, 'Прореживание']] },
  'Зелень (укроп, петрушка)': { e: '🌿', harvest: [30, 60], tips: 'Сеять с перерывом 2 недели. Срезать по мере надобности.', tasks: [[10, 'Прореживание']] },
  'Горох': { e: '🫛', harvest: [55, 80], tips: 'Нужна опора. Собирать регулярно.', tasks: [[14, 'Установить опору']] },
  'Фасоль': { e: '🫘', harvest: [60, 100], tips: 'Не любит переувлажнения. Сеять после заморозков.', tasks: [[14, 'Прополка, рыхление']] },
  'Клубника': { e: '🍓', harvest: [30, 60], tips: 'Мульчировать, усы убирать. После сбора урожая подкормить и омолодить.', tasks: [[14, 'Подкормка'], [30, 'Мульча под ягоды']] },
  'Малина': { e: '🍇', harvest: [365, 730], tips: 'Обрезать плодоносившие побеги осенью. Подкормка весной азотом.', tasks: [[30, 'Подкормка']] },
  'Яблоня': { e: '🍎', harvest: [1095, 2000], tips: 'Обрезка зимой/ранней весной. Побелка штамба осенью. Полив первые 3 года.', tasks: [[30, 'Полив, мульча'], [365, 'Весенняя обрезка и подкормка']] },
  'Смородина': { e: '🫐', harvest: [365, 730], tips: 'Обновляющая обрезка осенью. Мульча.', tasks: [[30, 'Подкормка']] },
  'Цветы': { e: '🌷', harvest: [30, 90], tips: 'Поливать по погоде, подкармливать при бутонизации.', tasks: [[14, 'Подкормка']] },
  'Другое': { e: '🌱', harvest: [60, 120], tips: '', tasks: [] }
};
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
      const rq = fn(s); t.oncomplete = () => res(rq && rq.result); t.onerror = () => rej(t.error);
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
const live = () => plantings.filter(p => !p.deleted);
const inYear = () => live().filter(p => new Date(p.plantedAt).getFullYear() === year || (p.harvests || []).some(h => new Date(h.date).getFullYear() === year));

async function save(p) {
  p.updatedAt = Date.now();
  const i = plantings.findIndex(x => x.id === p.id);
  if (i >= 0) plantings[i] = p; else plantings.push(p);
  await DB.put(p);
  renderAll();
  Sync.schedule();
}

/* ---------- Карта ---------- */
const TILE = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
async function initMap() {
  const c = (await DB.getMeta('center')) || { lat: 55.75, lng: 37.6, z: 10, fresh: true };
  map = L.map('map', { zoomControl: false, maxZoom: 21 }).setView([c.lat, c.lng], c.z);
  L.control.zoom({ position: 'topright' }).addTo(map);
  L.tileLayer(TILE, { maxNativeZoom: 19, maxZoom: 21, attribution: 'Esri' }).addTo(map);
  map.on('moveend', () => { const m = map.getCenter(); DB.setMeta('center', { lat: m.lat, lng: m.lng, z: map.getZoom() }); });
  map.on('click', e => onMapTap(e.latlng));
  if (c.fresh) locate(true);
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
  if (movingId) {
    const p = plantings.find(x => x.id === movingId); movingId = null; hint('');
    if (p) { p.lat = ll.lat; p.lng = ll.lng; save(p); }
    return;
  }
  openForm(null, ll);
}
function hint(t) { const h = $('#hint'); h.textContent = t; h.style.display = t ? 'block' : 'none'; }
function renderMarkers() {
  Object.values(markers).forEach(m => m.remove()); markers = {};
  inYear().forEach(p => {
    if (p.lat == null) return;
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
    <label>Заметка (сколько, где именно, как сажал)</label><textarea id="f-note">${esc(p.note)}</textarea>
    <button class="b" id="f-ok">Сохранить</button><button class="b sec" id="f-no">Отмена</button>`);
  $('#f-no').onclick = closeSheet;
  $('#f-ok').onclick = async () => {
    const crop = $('#f-crop').value.trim();
    if (!crop) return alert('Укажите культуру');
    p.crop = crop; p.variety = $('#f-var').value.trim(); p.plantedAt = $('#f-date').value || today(); p.note = $('#f-note').value;
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
    <div class="muted">Посажено ${fmt(p.plantedAt)} (${age >= 0 ? age + ' дн. назад' : 'через ' + (-age) + ' дн.'})</div>
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
      <div class="s">Посажено ${fmt(p.plantedAt)}${p.lat == null ? ' · без места на карте' : ''}</div></div>`).join('') || '<div class="muted">Посадок за этот год нет. Нажмите на карту, чтобы добавить.</div>';
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
    <h3>Участок</h3>
    <button class="b sec" id="s-loc">📍 Перейти к моему положению</button>`;
  $('#s-dl').onclick = downloadTiles;
  $('#s-loc').onclick = () => { switchView('map'); locate(true); };
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
  const b = map.getBounds().pad(0.15), urls = [];
  for (let z = 15; z <= 19; z++) {
    const x0 = lon2x(b.getWest(), z), x1 = lon2x(b.getEast(), z), y0 = lat2y(b.getNorth(), z), y1 = lat2y(b.getSouth(), z);
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) urls.push(TILE.replace('{z}', z).replace('{x}', x).replace('{y}', y));
  }
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
function renderAll() { renderYears(); renderMarkers(); renderList(); renderTodo(); }

(async function start() {
  $('#crops').innerHTML = Object.keys(CROPS).map(c => `<option value="${esc(c)}">`).join('');
  await DB.open();
  plantings = await DB.all();
  await initMap(); renderNet(); renderAll();
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
  Sync.run(false);
})();

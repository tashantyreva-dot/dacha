# Дача — учёт посадок

Офлайн-приложение: карта-спутник, посадки, урожай, фото, подсказки, напоминания, копия в облаке.

## Облако (Supabase, бесплатно) — один раз
1. supabase.com → New project.
2. SQL Editor → выполнить:

```sql
create table plantings (
  id text primary key,
  user_id uuid not null default auth.uid(),
  updated_at bigint not null,
  data jsonb not null
);
alter table plantings enable row level security;
create policy "own rows" on plantings for all using (user_id = auth.uid()) with check (user_id = auth.uid());
```

3. Authentication → Providers → Email: выключить "Confirm email" (чтобы вход работал сразу).
4. Project Settings → API: скопировать Project URL и anon public key.

## На телефоне (Android, Chrome)
1. Открыть адрес сайта → меню ⋮ → «Установить приложение».
2. Вкладка «Ещё»: ввести данные Supabase (URL, ключ, почта, пароль) → «Сохранить и синхронизировать».
3. Там, где есть интернет, навести карту на участок → «Скачать карту этого вида». После этого карта работает офлайн.
4. Данные записываются на телефон сразу, а в облако уходят, когда появляется интернет.

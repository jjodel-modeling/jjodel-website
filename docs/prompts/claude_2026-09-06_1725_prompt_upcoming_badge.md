# Sito jjodel.io: badge "Upcoming" sugli eventi futuri

> **Nome del documento prompt**: 2026-09-06 17:25

Corsia veloce. Repo `jjodel-website`, **branch `main`** (non `release-3-0`). Leggi
`docs/claude-code-log.md` prima di iniziare.

## Contesto (non rifare l'analisi)

Le attività (collection `activity`) compaiono in tre punti: `src/components/ActivityFeed.astro`
(home, 6 elementi), `src/pages/activity/index.astro` (archivio) e `src/pages/research.astro`
(lista `talks`, solo `talk` e `keynote`). Il feed non mostra la data e non distingue eventi passati
da futuri: oggi FAME (30 set), la demo MODELS (7 ott) e LangDev (8 ott) stanno in fila con i talk
del 2025 senza segnale.

Il sito è statico e si ricostruisce solo al push. Un badge calcolato solo in build resterebbe
sugli eventi passati finché non si pusha di nuovo: per questo il badge si rende in build per le
date future e uno script lato client rimuove quelli scaduti. Stessa logica di giorno UTC usata da
`src/lib/release.ts` e `ReleaseBanner.astro`.

Regole di scrittura: inglese, niente trattini lunghi (`—` e `–`).

## COSA

### Commit 1, `feat: add UpcomingBadge component`

Nuovo file **`src/components/UpcomingBadge.astro`**:

```astro
---
interface Props {
  date: Date;
}

const { date } = Astro.props;

// Calendar-day comparison in UTC; the client script re-checks at load time.
const now = new Date();
const todayUtc = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
const dateUtc = Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
const isUpcoming = dateUtc >= todayUtc;
const iso = date.toISOString().slice(0, 10);
---

{isUpcoming && <span class="upcoming-badge" data-date={iso}>Upcoming</span>}

<script>
  // Removes badges whose date has passed since the site was last built.
  document.addEventListener('DOMContentLoaded', () => {
    const now = new Date();
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    document.querySelectorAll<HTMLElement>('.upcoming-badge[data-date]').forEach((el) => {
      const [y, m, d] = (el.dataset.date ?? '').split('-').map(Number);
      if (!y || !m || !d) return;
      if (Date.UTC(y, m - 1, d) < today) el.remove();
    });
  });
</script>

<style>
  .upcoming-badge {
    display: inline-block;
    margin-left: 8px;
    padding: 1px 7px;
    border-radius: 999px;
    background: var(--jj-teal-50);
    color: var(--jj-teal-600);
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 0.4px;
    text-transform: uppercase;
    vertical-align: middle;
    white-space: nowrap;
  }
</style>
```

Prima di crearlo: `grep -rn "upcoming-badge\|UpcomingBadge" src` deve dare zero risultati.
Lo `<script>` senza `define:vars` è un modulo: Astro lo bundla una volta sola anche se il
componente è reso più volte nella pagina.

### Commit 2, `feat: show Upcoming badge on future activities`

Nei tre file, importare `UpcomingBadge` e renderlo subito dopo il titolo, dentro lo `<span>`
del titolo, dopo il link o il testo:

**`src/components/ActivityFeed.astro`** e **`src/pages/activity/index.astro`**: in
`feed.map((item) => ...)`, dentro `<span class="feed-title">`, dopo il blocco
`{item.url ? (...) : (item.title)}`, aggiungere `<UpcomingBadge date={item.date} />`.
`item.date` è già nel tipo `FeedItem`.

**`src/pages/research.astro`**: in `talks.map((t) => ...)`, dentro `<span class="talk-title">`,
dopo il blocco del link, aggiungere `<UpcomingBadge date={t.data.date} />`.

Nessuna modifica agli stili dei tre file né ad altro markup.

### Commit 3, `docs: log upcoming badge prompt`

Entry in `docs/claude-code-log.md` e `git add` di questo prompt.

## COME

- Leggere per intero ogni file prima di modificarlo. Edit puntuali.
- `npm run build` verde. Verifiche su `dist/`:
  `grep -o 'data-date="[0-9-]*"' dist/index.html dist/activity/index.html dist/research/index.html | sort | uniq -c`
  attesi solo `2026-09-30`, `2026-10-07`, `2026-10-08` (nessuna data del 2025 o precedente);
  `grep -c "—" dist/index.html dist/activity/index.html dist/research/index.html` atteso 0.
- Staging per file espliciti, mai `git add .`. Nessun push.

## HARD STOP

Dopo il commit 3: hash, esito build, output dei due grep.

## NON FARE

- Non aggiungere la data visibile alle righe del feed (fuori scope).
- Non toccare `config.ts`, `release.ts`, `ReleaseBanner.astro`, il branch `release-3-0`.
- Non cambiare classi CSS esistenti.

## RIFERIMENTI

- `src/components/ReleaseBanner.astro` (stessa logica di giorno UTC)
- `src/styles/global.css` (token `--jj-teal-50`, `--jj-teal-600`)

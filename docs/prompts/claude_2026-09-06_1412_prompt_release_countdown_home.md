# Sito jjodel.io: conto alla rovescia del rilascio 3.0 sulla home

> **Nome del documento prompt**: 2026-09-06 14:12

Corsia veloce. Repo `jjodel-website`, branch `main`. Leggi `docs/claude-code-log.md` prima di iniziare.
Segue il prompt `claude_2026-09-06_1346_prompt_pre_release_3_0.md` (commit `210ea79`).

## Contesto (non rifare l'analisi)

Jjodel 3.0 esce il 15 settembre 2026. Il modale `Announcement.astro` mostra il badge statico
"Release date" e compare una sola volta per sessione: chi lo chiude non ha più alcun segnale del
rilascio imminente. Si vuole rendere leggibile il tempo che manca, in giorni, senza orologi
animati, in due punti: il badge del modale e una striscia sottile in testa alla home, sempre
visibile finché l'utente non la chiude. Solo sulla home: le altre pagine non cambiano.

Il sito è statico (Astro, build unica su GitHub Pages): il conteggio deve girare nel browser.
Vincolo di sicurezza: il rilascio è un deploy manuale e può tardare; il sito non deve mai
mostrare "0 days" fermo o numeri negativi. Tre stati, calcolati dalla stessa data.

Regole di scrittura: inglese, niente trattini lunghi (`—` e `–`), frasi brevi.

## COSA

### Commit 1, `feat: shared release date and countdown helper`

Nuovo file **`src/lib/release.ts`**:

```ts
/** Release date of Jjodel 3.0, as a calendar day in UTC. */
export const RELEASE_DATE_ISO = '2026-09-15';

/** Fallback label rendered at build time, used when JavaScript is off. */
export const RELEASE_DATE_LABEL = '15 September 2026';

/**
 * Days from `now` to the release day, comparing UTC calendar days.
 * Negative when the release day has passed.
 */
export function daysToRelease(now: Date, releaseIso: string = RELEASE_DATE_ISO): number {
  const [y, m, d] = releaseIso.split('-').map(Number);
  const release = Date.UTC(y, m - 1, d);
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((release - today) / 86_400_000);
}

/** Short label for the countdown: "9 days to go", "Tomorrow", "Today", "Out now". */
export function countdownLabel(days: number): string {
  if (days > 1) return `${days} days to go`;
  if (days === 1) return 'Tomorrow';
  if (days === 0) return 'Today';
  return 'Out now';
}
```

Prima di crearlo: `grep -rn "src/lib\|RELEASE_DATE\|daysToRelease\|countdownLabel" src` deve dare
zero risultati.

### Commit 2, `feat: dynamic countdown badge in the announcement modal`

**`src/components/Announcement.astro`**:
- importare `RELEASE_DATE_ISO` da `../lib/release`;
- il badge resta `'Release date'` come fallback nell'oggetto `announcement`;
- aggiungere `id="ann-badge"` allo `<span class="ann-badge">` (solo l'attributo);
- nello script `define:vars` esistente aggiungere `releaseIso: RELEASE_DATE_ISO` alle variabili
  e, in testa al listener `DOMContentLoaded`, prima del controllo su `sessionStorage`:

```js
const badge = document.getElementById('ann-badge');
if (badge) {
  const [y, m, d] = releaseIso.split('-').map(Number);
  const release = Date.UTC(y, m - 1, d);
  const now = new Date();
  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  const days = Math.round((release - today) / 86400000);
  badge.textContent =
    days > 1 ? `${days} days to go` : days === 1 ? 'Tomorrow' : days === 0 ? 'Today' : 'Out now';
}
```

Lo script del modale è inline con `define:vars` e non può importare moduli: la logica è
duplicata di proposito e deve restare identica a `countdownLabel`. Aggiungere un commento di una
riga che rimanda a `src/lib/release.ts`. Se `days < 0` il modale mostra "Out now" ma resta
com'è: il cambio delle CTA è del prompt di release day.

Nessuna altra modifica al componente.

### Commit 3, `feat: release countdown banner on the home page`

Nuovo componente **`src/components/ReleaseBanner.astro`**:

```astro
---
import { RELEASE_DATE_ISO, RELEASE_DATE_LABEL } from '../lib/release';

const dismissKey = 'release-banner-v1';
---

<div class="release-banner" id="release-banner" role="status">
  <div class="release-banner__inner">
    <p class="release-banner__text">
      <strong>Jjodel 3.0</strong> arrives on {RELEASE_DATE_LABEL}<span id="release-banner-count"></span>.
      <a href="https://beta.jjodel.io" rel="noopener">Try the beta →</a>
    </p>
    <button class="release-banner__close" id="release-banner-close" type="button" aria-label="Dismiss">
      <i class="bi bi-x-lg" aria-hidden="true"></i>
    </button>
  </div>
</div>

<script define:vars={{ dismissKey, releaseIso: RELEASE_DATE_ISO }}>
  // Countdown logic mirrors src/lib/release.ts (inline scripts cannot import modules).
  document.addEventListener('DOMContentLoaded', () => {
    const banner = document.getElementById('release-banner');
    const count = document.getElementById('release-banner-count');
    const close = document.getElementById('release-banner-close');
    if (!banner || !count || !close) return;
    let dismissed = false;
    try { dismissed = !!sessionStorage.getItem(dismissKey); } catch {}
    if (dismissed) { banner.remove(); return; }
    const [y, m, d] = releaseIso.split('-').map(Number);
    const release = Date.UTC(y, m - 1, d);
    const now = new Date();
    const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
    const days = Math.round((release - today) / 86400000);
    if (days > 1) count.textContent = `, ${days} days to go`;
    else if (days === 1) count.textContent = ', tomorrow';
    else if (days === 0) count.textContent = ', today';
    else {
      const text = banner.querySelector('.release-banner__text');
      if (text) text.innerHTML = '<strong>Jjodel 3.0</strong> is out. <a href="https://beta.jjodel.io" rel="noopener">Open Jjodel →</a>';
    }
    close.addEventListener('click', () => {
      try { sessionStorage.setItem(dismissKey, 'true'); } catch {}
      banner.remove();
    });
  });
</script>
```

Stile, nello stesso file: sfondo `var(--jj-slate-900)`, testo `var(--jj-white)`, link con
`color: var(--jj-yellow)` e sottolineatura al hover, altezza minima 40px, padding 8px 16px, testo
0.882rem, `strong` a peso 600; `.release-banner__inner` con `max-width: var(--max-width)`,
margine auto, flex tra testo e bottone; bottone senza bordo né sfondo, colore
`var(--jj-slate-300)`, bianco al hover. Nessuna animazione. Sotto 768px il testo va a capo e la
freccia del link resta sulla stessa riga del link.

Prima di crearlo: `grep -rn "release-banner\|ReleaseBanner" src` deve dare zero risultati (le
classi CSS sono API interne, nessuna collisione ammessa).

**`src/pages/index.astro`**: importare `ReleaseBanner` e montarlo come primo elemento dentro
`BaseLayout`, prima di `<Announcement />`. La striscia sta quindi sotto la navbar, in testa al
contenuto della home. Nessun'altra pagina la monta; `BaseLayout.astro` e `Nav.astro` non si
toccano.

### Commit 4, `docs: log release countdown prompt`

Entry in `docs/claude-code-log.md` (formato esistente) e `git add` di questo prompt.

## COME

- Leggere per intero ogni file prima di modificarlo. Edit puntuali.
- Dopo il commit 3: `npm run build` verde; `grep -c "—" dist/index.html` atteso 0.
- Test rapido dei tre stati senza aspettare le date: in `npm run dev`, nella console del browser,
  non c'è un hook; verificare invece la funzione pura con un file temporaneo
  `node -e` che importi la logica, oppure con `npx tsx` se disponibile:
  `daysToRelease(new Date('2026-09-06T23:30:00Z'))` → 9,
  `daysToRelease(new Date('2026-09-14T00:10:00Z'))` → 1,
  `daysToRelease(new Date('2026-09-15T12:00:00Z'))` → 0,
  `daysToRelease(new Date('2026-09-16T00:00:00Z'))` → -1.
  Riportare i quattro risultati nella entry di log, poi rimuovere il file temporaneo.
- Staging per file espliciti, mai `git add .`. Nessun push.

## HARD STOP

Dopo il commit 4: hash dei commit, esito build, i quattro valori del test, output del grep.

## NON FARE

- Non montare la striscia in `BaseLayout.astro`: solo la home.
- Non toccare `Hero.astro`, `TryJjodelButton.astro`, `Nav.astro`, `Footer.astro`, `whats-new.astro`.
- Nessun orologio con ore/minuti/secondi, nessun `setInterval`.
- Non cambiare gli URL delle CTA: restano `beta.jjodel.io` fino al prompt di release day.

## RIFERIMENTI

- `src/components/Announcement.astro` (script con `define:vars` e `sessionStorage`, da imitare)
- `src/styles/global.css` (token: `--jj-slate-900`, `--jj-yellow`, `--max-width`)
- `docs/prompts/claude_2026-09-06_1346_prompt_pre_release_3_0.md`

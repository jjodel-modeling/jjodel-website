# Sito jjodel.io: release day di Jjodel 3.0 (da eseguire il 15 settembre 2026)

> **Nome del documento prompt**: 2026-09-06 14:27

Corsia veloce. Repo `jjodel-website`, branch `main`. Leggi `docs/claude-code-log.md` prima di iniziare.
Segue `claude_2026-09-06_1346_prompt_pre_release_3_0.md` e `claude_2026-09-06_1412_prompt_release_countdown_home.md`.

**Da eseguire solo su GO esplicito di Alfonso il giorno del rilascio**, dopo che i sottodomini
sono stati commutati. Se il GO arriva prima della commutazione, fermarsi e chiederlo.

## Contesto (non rifare l'analisi)

Dal 15 settembre 2026 la mappa dei sottodomini cambia così:
- `app.jjodel.io` serve Jjodel 3.0 (la ex beta, aggiornata alla versione definitiva);
- `old.jjodel.io` serve la 2.x, che resta online per alcuni mesi;
- `beta.jjodel.io` sparisce.

Il sito oggi punta la 3.0 su `beta.jjodel.io` in quattro posti (split button, modale, banner della
home, pagina What's New). Dopo questo prompt nessun file in `src/` deve più citare `beta.jjodel.io`.

Regole di scrittura: inglese, niente trattini lunghi (`—` e `–`), frasi brevi, copy data qui usata
alla lettera.

## COSA

### Commit 1, `feat: switch CTAs to Jjodel 3.0 on app.jjodel.io, keep 2.x on old.jjodel.io`

**`src/components/TryJjodelButton.astro`**:
- rinominare la costante `BETA_URL` in `OLD_URL` con valore `'https://old.jjodel.io'`
  (`APP_URL` resta `'https://app.jjodel.io'`; verificare con `grep -rn BETA_URL src` che la
  costante non sia usata altrove: atteso solo questo file);
- la voce di menu che oggi dice `Current version` (href `APP_URL`) diventa `Jjodel 3.0`;
- la voce che oggi dice `Beta (3.0)` (href `BETA_URL`) diventa `Previous version (2.x)` con href
  `OLD_URL`;
- ordine invariato: prima la 3.0, poi la 2.x. Nessun'altra modifica a markup, script o stile.

**`src/components/Announcement.astro`**, solo l'oggetto `announcement`:
- `enabled`: `true`
- `badge`: `'Out now'`
- `title`: `'Jjodel 3.0'`
- `headline`: `'Released on 15 September 2026. A completely redesigned metamodeling experience with a new transformation engine, a new expression language and a new UI.'`
- `message`: `'Jjodel 3.0 is live at app.jjodel.io. The previous version stays available at old.jjodel.io for a few months.'`
- `primaryAction`: `{ label: 'Open Jjodel 3.0 →', url: 'https://app.jjodel.io' }`
- `secondaryAction`: invariato (`/whats-new/`)
- `dismissKey`: `'announcement-v3'`

Nello script del modale, il blocco del badge dinamico (`ann-badge`) va rimosso per intero: il badge
torna statico. Togliere `releaseIso` dalle variabili di `define:vars` e l'import di
`RELEASE_DATE_ISO` se non resta usato. Il resto dello script non cambia.

**`src/components/ReleaseBanner.astro`**: nel ramo `else` dello script (rilascio avvenuto) il link
diventa `https://app.jjodel.io`; nel markup statico il link `Try the beta →` diventa
`Open Jjodel 3.0 →` con href `https://app.jjodel.io`. Il banner resta montato: dal 15 mostra
"Jjodel 3.0 is out". La sua rimozione è un task successivo, non di questo prompt.

**`src/pages/whats-new.astro`**:
- sottotitolo del `page-header`, ultima frase: `The beta is available now.` diventa
  `Released on 15 September 2026.`
- CTA del `page-header`: label `Open Jjodel 3.0 →`, href `https://app.jjodel.io`;
- sezione `Status`, primo paragrafo, sostituire per intero con:
  `Jjodel 3.0 is the current version at app.jjodel.io. The previous version (2.x) remains available at old.jjodel.io for a few months, so existing projects can be migrated at your own pace. Projects created during the beta open in 3.0.`
- secondo paragrafo (bug report): invariato.

**`src/components/Hero.astro`**: la barra finta del browser mostra già `app.jjodel.io`, nessuna
modifica. Lo screenshot resta quello attuale, salvo la sezione opzionale qui sotto.

Verifica di chiusura del commit: `grep -rn "beta.jjodel.io\|Try the beta\|Beta (3.0)" src` deve
dare zero risultati.

### Sezione opzionale, solo se Alfonso consegna un nuovo screenshot

Se il GO include il path di un nuovo `jjodel-screenshot.png` della 3.0: sostituire
`public/jjodel-screenshot.png` con quel file (stesso nome), poi in `Hero.astro` **disattivare i
quattro hotspot** del lightbox avvolgendoli in un commento HTML con la nota
`<!-- hotspots disabled: positions refer to the 2.x screenshot, to be recalibrated -->`.
Le posizioni degli hotspot sono calibrate sullo screenshot vecchio e sul nuovo cadrebbero a
caso; ricalibrarle è un task separato con verifica visiva. Commit a parte:
`feat: update hero screenshot to Jjodel 3.0, disable stale hotspots`.
Senza screenshot nel GO, questa sezione non si esegue.

### Commit finale, `docs: log release day prompt`

Entry in `docs/claude-code-log.md` e `git add` di questo prompt.

## COME

- Leggere per intero ogni file prima di modificarlo. Edit puntuali.
- `npm run build` verde; `grep -c "—" dist/index.html dist/whats-new/index.html` atteso 0 e 0;
  `grep -rl "beta.jjodel.io" dist` atteso vuoto.
- Staging per file espliciti, mai `git add .`. Nessun push: lo fa Alfonso dopo la verifica visiva
  e dopo aver controllato che `app.jjodel.io` e `old.jjodel.io` rispondano.

## HARD STOP

Dopo il commit finale: hash dei commit, esito build, output dei grep.

## NON FARE

- Non eseguire prima del GO del 15 settembre.
- Non toccare `src/lib/release.ts`, `Nav.astro`, `Footer.astro`, `index.astro`, `BaseLayout.astro`.
- Non rimuovere il banner né il modale: si spengono con un task successivo.
- Non ricalibrare gli hotspot.

## RIFERIMENTI

- `docs/prompts/claude_2026-09-06_1346_prompt_pre_release_3_0.md`
- `docs/prompts/claude_2026-09-06_1412_prompt_release_countdown_home.md`
- `src/components/TryJjodelButton.astro` (menu con le due voci)

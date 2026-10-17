# Sito jjodel.io: Jjodel 3.1 (preparazione su ramo, merge il 19 ottobre 2026)

> **Prompt-ID**: P-2026-10-17-1630
> **Nome del documento prompt**: 2026-10-17 16:30

Corsia veloce. Repo `jjodel-website`, ramo nuovo `release-3-1` tagliato da `main`.
Leggi `CLAUDE.md` (se presente) e `docs/claude-code-log.md` prima di iniziare.
Modello precedente: `claude_2026-09-06_1427_prompt_release_day_3_0.md` (stessa struttura, stessi file).

**Due fasi.** Fase A ora: tutti i commit sul ramo `release-3-1`, build verde, hard stop.
Fase B solo su GO esplicito di Alfonso il 19 ottobre, dopo che `app.jjodel.io` serve la 3.1:
merge `--no-ff` di `release-3-1` in `main` e push. Se il GO arriva senza conferma del deploy
dell'app, fermarsi e chiederla. Nessun push del ramo prima del GO.

## Contesto (non rifare l'analisi)

Jjodel 3.1 esce il 19 ottobre 2026 su `app.jjodel.io`. Il sito oggi annuncia la 3.0 in quattro
punti: banner (`ReleaseBanner.astro`), modale (`Announcement.astro`), pagina `whats-new.astro`,
testo della card "Craft viewpoints" (`WhatYouCanDo.astro`). L'elenco delle novità è stato
verificato da Alfonso; è allineato alla schermata di benvenuto della 3.1 nell'app
(`frontend/src/components/WelcomeModal/WelcomeModal.tsx` sul tronco di `jjodel-frontend`).

Fuori perimetro, da non toccare: il generatore di codice (arriva nella 3.2), quindi la frase
"No code generation." in `Hero.astro` resta; nessun riferimento al tema scuro; `TryJjodelButton.astro`;
le voci in `src/content/activity/` (il badge Upcoming si calcola dalla data alla build, si
aggiorna da solo).

Regole di scrittura: inglese, niente trattini lunghi (U+2014 e U+2013), frasi brevi, copy qui sotto
usata alla lettera. Se una frase sembra sbagliata, segnalarla nel report invece di riscriverla.

## COSA

### Commit 1, `feat: announce Jjodel 3.1 in the banner and the announcement modal`

**`src/components/ReleaseBanner.astro`**: `<strong>Jjodel 3.0</strong> has arrived.` diventa
`<strong>Jjodel 3.1</strong> is out.`; il link resta `https://app.jjodel.io` con testo
`Try it &rarr;`. Se nello script del banner sopravvive un ramo che scrive testo con "3.0",
allinearlo allo stesso testo; nient'altro.

**`src/components/Announcement.astro`**, solo l'oggetto `announcement`:
- `enabled`: `true`
- `badge`: `'Out now'`
- `title`: `'Jjodel 3.1'`
- `headline`: `'Released on 19 October 2026. Models now run: simulate automata, statecharts, Petri nets and flowcharts, derive a viewpoint from a metamodel in one click, and draw containers.'`
- `message`: `'Jjodel 3.1 is live at app.jjodel.io. It runs in the browser, with nothing to install.'`
- `primaryAction`: `{ label: 'Open Jjodel 3.1 →', url: 'https://app.jjodel.io' }`
- `secondaryAction`: invariato (`/whats-new/`)
- `dismissKey`: `'announcement-v31'` (chiave nuova, così chi ha chiuso il modale della 3.0 vede quello nuovo)

### Commit 2, `feat: what's new page for Jjodel 3.1, keep the 3.0 list below`

**`src/pages/whats-new.astro`**. L'attuale array `features` si rinomina `features30` (contenuto
invariato) e se ne aggiunge uno nuovo, `features31`, con queste voci nell'ordine:

1. `title`: `'Simulation'`
   `description`: `'Run your models step by step. Configure the semantics of a metamodel once in the Simulation panel, picking a profile (DFA, NFA, Moore, Mealy, state machine, Petri net, flowchart, activity) or composing your own from roles. Events are model instances, guards and actions are JjEL expressions, and state attributes are finite (boolean, enum, range), so a run can later be checked by a model checker.'`
2. `title`: `'Inspecting a run'`
   `description`: `'Choose by hand or at random when more than one transition is enabled. Set watches and breakpoints on the state, step back, move through the run with the timeline slider, save a run as a replayable scenario, and see coverage on the canvas.'`
3. `title`: `'I/O board'`
   `description`: `'Drive a running model from a board of buttons, switches, sliders, a keypad, LEDs and displays bound to its events and state. A clock device presses an event at a fixed period. The same bindings can be shown as a front panel with its own themes.'`
4. `title`: `'Derive viewpoint'`
   `description`: `'Generate a complete viewpoint from a metamodel in one click, in the notation you choose: generic, ER (Chen), UML class, statechart, Petri net, flowchart or UML activity. Jjodel proposes which metaclass plays which role in the notation, you confirm or change it, and ELK lays out the result.'`
5. `title`: `'Containers and Auto layout'`
   `description`: `'A node can now contain other nodes, drawn as frames and partitions: BPMN lanes, composite states and orthogonal regions of a statechart. Auto layout in the toolbar arranges the whole graph, containers included.'`
6. `title`: `'Validation'`
   `description`: `'Write your own rules on a metamodel, run the Validate command, and see violations as dots on the offending instances.'`
7. `title`: `'Symbol Editor'`
   `description`: `'Borders per side driven by conditions, corner radius set by rules, a cloud shape, and a preview on three instances while you edit.'`
8. `title`: `'Smaller changes'`
   `description`: `'Views for edges and rows can be created from the canvas menus. Default views match the native rendering. Metaclasses with the same name in different metamodels are kept apart. Jjodie no longer proposes reserved names, and a malformed JjScript block no longer locks the tab.'`

Markup della pagina:
- `title` del `BaseLayout`: `"What's new in Jjodel 3.1 | Jjodel"`; `description`:
  `"New in Jjodel 3.1: simulation, derived viewpoints, containers and validation."`
- H1: `What's new in Jjodel 3.1`
- sottotitolo: `Jjodel 3.1 makes models executable: you configure a semantics once and run any model that conforms to the metamodel. It also derives viewpoints from metamodels and adds containers and validation rules. Released on 19 October 2026.`
- CTA: `Open Jjodel 3.1 →`, href invariato.
- sotto il `page-header`, la griglia esistente itera `features31`.
- subito dopo, una nuova `section` con `<h2>Jjodel 3.0</h2>`, un paragrafo con classe
  `status-text` che dice `Released on 15 September 2026. Three domain-specific languages, a redesigned interface, a new transformation engine and a Data Manager.`
  e la stessa griglia (stesse classi) che itera `features30`. Nessuna classe CSS nuova.
- sezione `Status`, primo paragrafo, sostituito per intero con:
  `Jjodel 3.1 is the current version, and it runs at app.jjodel.io. Projects created with earlier versions open in 3.1.`
- sezione `Documentation`: prima di aggiungere un link a una pagina della documentazione sulla
  simulazione o su Derive viewpoint, verificare in `~/jjodel-docs/src/content/docs/` che la
  pagina esista. Se esiste, aggiungerla in testa alla lista `docs-links` con lo stesso markup
  degli altri link; se non esiste, non aggiungere nulla e segnalarlo nel report.

### Commit 3, `feat: mention simulation and derived viewpoints in Craft viewpoints`

**`src/components/WhatYouCanDo.astro`**, solo il paragrafo della card "Craft viewpoints"
(riga ~175). Testo nuovo:
`A viewpoint defines how model elements look and behave. Derive one from a metamodel in a notation you pick, combine it with overlays for decoration, validation and simulation, then switch notation on the same model with a click.`
Titolo, icona, link "Learn more" e illustrazione invariati.

### Commit 4, `docs: log entry for the Jjodel 3.1 site update (P-2026-10-17-1630)`

Entry in `docs/claude-code-log.md` nel formato del file.

## DOVE

Solo questi file: `src/components/ReleaseBanner.astro`, `src/components/Announcement.astro`,
`src/pages/whats-new.astro`, `src/components/WhatYouCanDo.astro`, `docs/claude-code-log.md`.
`git add` sui file specifici, mai `git add .`.

## COME / verifica prima dell'hard stop

1. `npm run build` verde.
2. `grep -rn "3\.0" src/components/ReleaseBanner.astro src/components/Announcement.astro` non trova
   più annunci della 3.0; in `whats-new.astro` "3.0" compare solo nella sezione `Jjodel 3.0`.
3. `grep -rn -P "\x{2014}|\x{2013}" src/` vuoto sui file toccati.
4. `npm run preview` e controllo a 1280 px e a 375 px di home (banner e modale) e `/whats-new/`:
   griglie a due colonne su desktop, una su mobile, nessuno scroll orizzontale. Allegare al
   report gli screenshot o, se non è possibile, i path dei file.
5. Hard stop. Report che apre con `[P-2026-10-17-1630 · session <id>]`: hash dei commit, esito
   dei controlli, eventuali frasi da rivedere, esito della verifica sulla documentazione.

## Fase B (solo su GO del 19 ottobre)

`git checkout main && git merge --no-ff release-3-1 -m "merge: release-3-1 into main (P-2026-10-17-1630)"`,
`npm run build`, push di `main`. Controllo di `https://jjodel.io` e `https://jjodel.io/whats-new/`
dopo il deploy, con riga di esito nel log.

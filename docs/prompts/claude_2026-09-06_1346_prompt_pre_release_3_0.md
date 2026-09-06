# Sito jjodel.io: stato pre-rilascio di Jjodel 3.0 (15 settembre 2026)

> **Nome del documento prompt**: 2026-09-06 13:46

Corsia veloce. Repo `jjodel-website` (Astro 4, statico, deploy su GitHub Pages a ogni push su `main`).
Branch: `main`. Leggi `docs/claude-code-log.md` prima di iniziare.

## Contesto (non rifare l'analisi)

Jjodel 3.0 esce il **15 settembre 2026**. Oggi il sito annuncia la 3.0 con badge "Coming soon" e
la pagina `/whats-new/` elenca sei novità ferme ad aprile. La pagina What's New dei docs
(https://docs.jjodel.io/whats-new/, aggiornata il 4 settembre) è la fonte per le novità e va
seguita: Data Manager, View Designer, Forms, Jjodie e provider AI configurabili, Console a tre
modalità, salvataggio unificato con autosave.

Questo prompt copre solo lo stato **da oggi al 15 settembre**. Il cambio del giorno del rilascio
(CTA, hero, screenshot, sottodomini) arriverà con un prompt separato.

Nel repo è tracciata una cartella annidata `jjodel-website/` (22 file, residuo dello scaffold
iniziale, non usata dalla build): va rimossa.

Regole di scrittura del sito: inglese, niente trattini lunghi (né `—` né `–`), frasi brevi, niente
filler. Il repo ha già avuto un commit "remove dashes from all page content": non reintrodurli.

## COSA

### Commit 1, `feat: announce Jjodel 3.0 release date (15 September)`

**`src/components/Announcement.astro`**, solo l'oggetto `announcement` in testa al file:
- `badge`: `'Release date'`
- `title`: invariato (`'Jjodel 3.0'`)
- `headline`: `'Coming on 15 September 2026. A completely redesigned metamodeling experience with a new transformation engine, a new expression language and a new UI.'`
- `message`: `'The beta is open until the release. Try it now and help us shape Jjodel 3.0.'`
- `primaryAction` e `secondaryAction`: invariati
- `dismissKey`: `'announcement-v2'` (così chi aveva chiuso il modale precedente lo rivede una volta)

Nessuna modifica al markup, allo script o allo stile del componente.

**`src/pages/whats-new.astro`**:

1. Sottotitolo del `page-header`: `Jjodel 3.0 will be released on 15 September 2026. It introduces three domain-specific languages, a redesigned interface, a new transformation engine and a Data Manager for working with model data. The beta is available now.`

2. Array `features`: sostituire l'array attuale con questi nove elementi, nell'ordine dato.
   Mantenere la forma `{ title, description }`.

   - `JjTL: model-to-model transformations` / `Declarative transformation language that maps source metamodel elements to target metamodel elements. Two-pass execution: the first pass creates instances, the second resolves attributes and cross-type references through an automatic trace model. Guards with the where keyword.`
   - `JjEL: expression language` / `Unified expression language for queries, guards and computed values. Includes forall and exists, context binding, null-safe navigation, type checks and over 100 built-in methods. Available in the Console, in views and in transformations.`
   - `JjScript: metamodel manipulation` / `Imperative language for programmatic metamodel editing: structural commands, bulk edits, forall, let and eval. Run sequences of operations on metamodels and models from the Console.`
   - `Data Manager` / `Work with model data as tables, one per metaclass, with forms to create, edit and delete instances. Includes a containment outline, a one-hop neighborhood diagram on each row and a delete preview showing the cascade and the dangling references.`
   - `View Designer and forms` / `Views are authored declaratively from property panels: Applies to, Structure, Symbol and Form. Instance nodes get headers, attribute compartments, accent bars and a library of value renderers (swatches, chips, reference pills, booleans). The same view renders as a form with four themes.`
   - `Jjodie: AI assistance` / `An assistant integrated in the Console that generates metamodels and models through JjScript, explains views and drafts documentation. Bring your own provider: OpenAI, Anthropic, Gemini, Mistral, DeepSeek, Groq, Kimi or a local Ollama.`
   - `Redesigned UI` / `Progressive disclosure throughout the interface, with Basic and Advanced modes in every panel. New Transformation Editor for defining and running JjTL transformations. Improved edge rendering with Manhattan routing.`
   - `Megamodel view` / `A project-level diagram showing all metamodels, models, transformations and their relationships (conformsTo, inputOf, outputOf, generatedBy).`
   - `Console and saving` / `Multi-language Console with three modes (Jjodie, JjScript, JjEL) and meta-commands. A single Save project action, with autosave after 15 seconds of inactivity and at most every two minutes.`

3. Sezione `Status`, primo paragrafo: `Jjodel 3.0 will be released on 15 September 2026. Until then the beta at beta.jjodel.io is in active development: the modeling core is stable, while the Data Manager, the view designer and the languages are still receiving fixes. Projects created in the beta will open in the release.`
   Secondo paragrafo (bug report su GitHub): invariato.

4. Sezione `Documentation`: aggiungere in testa a `docs-links` un link `Full changelog ↗` verso
   `https://docs.jjodel.io/whats-new/` (stessi attributi degli altri tre link). I tre link ai
   reference restano.

Nessuna modifica allo `<style>` della pagina.

### Commit 2, `chore: remove stale nested scaffold directory`

`git rm -r jjodel-website` e nient'altro. Verificare prima con `git ls-files jjodel-website | wc -l`
che siano 22 file e che nessun file fuori da quella cartella la importi (`grep -rn "jjodel-website/" src astro.config.mjs package.json`; attesi zero risultati).

### Commit 3, `docs: log pre-release prompt and backfill gap`

`docs/claude-code-log.md`: aggiungere in testa l'entry di questo task (formato del log esistente),
più un'entry breve datata 2026-07-16 che segnala che i commit `f26701d` (workflow) e `83a0d01`
(sezione What you can do) sono stati fatti senza entry di log. Aggiungere questo prompt al commit:
`git add docs/prompts/claude_2026-09-06_1346_prompt_pre_release_3_0.md`.

## COME

- Prima di ogni edit leggi il file intero. Edit puntuali, mai riscritture.
- Dopo il commit 1 e il commit 2: `npm run build` deve essere verde. Aprire `dist/whats-new/index.html`
  e `dist/index.html` e verificare con `grep -c "—" dist/whats-new/index.html dist/index.html`
  (attesi 0 per entrambi) che non siano entrati trattini lunghi.
- Staging per file espliciti (`git add <path>`), mai `git add .`.
- Non fare push: lo fa Alfonso dopo la verifica visiva con `npm run dev`.

## HARD STOP

Dopo il commit 3 fermati e riporta: hash dei tre commit, esito della build, output dei due `grep`.

## NON FARE

- Non toccare `Hero.astro`, `TryJjodelButton.astro`, `Nav.astro`, `Footer.astro`, `index.astro`:
  il cambio delle CTA e dello screenshot è del prompt di release day.
- Non cambiare stile, classi CSS, markup del modale o della pagina.
- Non aggiungere link a pagine dei docs di cui non hai verificato l'esistenza.
- Non riformulare i testi dati qui: sono copy approvata.

## RIFERIMENTI

- https://docs.jjodel.io/whats-new/ (fonte delle novità, 4 settembre 2026)
- `docs/claude-code-log.md` (convenzioni del log)
- Commit `ca3fe3f` e `aff31f1` (rimozione trattini, da non reintrodurre)

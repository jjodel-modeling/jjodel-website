# Sito jjodel.io: attività MODELS 2026 e LangDev 2026 nel feed

> **Nome del documento prompt**: 2026-09-06 17:07

Corsia veloce. Repo `jjodel-website`. **Branch: `main`** (non `release-3-0`: queste entry vanno online
subito). Se il working tree è su `release-3-0`, fare `git switch main` prima di iniziare; il branch
`release-3-0` non si tocca. Leggi `docs/claude-code-log.md` prima di iniziare.

## Contesto (non rifare l'analisi)

Il feed della home (`ActivityFeed.astro`, 6 elementi) e la pagina `/activity/` ordinano la
collection `activity` per data decrescente e mostrano anche le date future (la entry FAME del
30 settembre è già così). Le entry sono file Markdown in `src/content/activity/` con lo schema di
`src/content/config.ts`: `title`, `type` (enum `talk | keynote | paper | release | project`),
`date`, `venue`, `speaker` opzionale, `url` opzionale, `draft`. La pagina `/research/` elenca le
entry di tipo `talk` e `keynote`.

MODELS 2026 si tiene a Málaga (Meliá Costa del Sol, Torremolinos) dal 4 al 9 ottobre 2026;
LangDev 2026 è colocato, 8 e 9 ottobre. Due interventi del gruppo Jjodel vanno nel feed.

Regole di scrittura: inglese, niente trattini lunghi (`—` e `–`), frasi brevi.

## COSA

### Commit unico, `docs: add MODELS 2026 demo and LangDev 2026 talk to activity feed`

Nuovo file **`src/content/activity/models-2026-jjodie-demo.md`**:

```md
---
title: "Jjodie: A Conversational Modeling Assistant"
type: talk
date: 2026-10-07
venue: "MODELS 2026, Tools and Demonstrations, Málaga"
speaker: "Alfonso Pierantonio"
url: "https://conf.researchr.org/home/models-2026"
draft: false
---

Live demo of Jjodie, the conversational assistant built into Jjodel. Jjodie generates metamodels and models through JjScript, explains views and drafts documentation, and works with the provider you configure. Demo sessions run from 7 to 9 October; the exact slot will be announced by the conference.
```

Nuovo file **`src/content/activity/langdev-2026-domain-knowledge-debt.md`**:

```md
---
title: "Domain Knowledge Debt in Metamodeling"
type: talk
date: 2026-10-08
venue: "LangDev 2026, colocated with MODELS 2026, Málaga"
speaker: "Alfonso Pierantonio"
url: "https://langdevcon.org/"
draft: false
---

Talk at LangDev 2026, 8 October at 14:30. Metamodels encode domain knowledge, and what they leave out accumulates as debt that surfaces later as conformance problems. The talk frames domain knowledge debt as a property of metamodels and shows how a language workbench can make it visible.
```

Copiare i due file alla lettera: la copy è approvata. Se lo schema di `config.ts` rifiuta un
campo, fermarsi e segnalarlo invece di adattare.

Poi entry in `docs/claude-code-log.md` e `git add` di questo prompt, nello stesso commit.

## COME

- `npm run build` verde; `grep -c "—" dist/index.html dist/activity/index.html dist/research/index.html`
  atteso 0 su tutti; le due entry devono comparire in testa al feed in `dist/index.html`
  (`grep -c "Jjodie: A Conversational\|Domain Knowledge Debt" dist/index.html` atteso 2).
- Staging per file espliciti: i due `.md`, il log, questo prompt. Mai `git add .`.
- Nessun push: lo fa Alfonso.

## HARD STOP

Dopo il commit: hash, esito build, output dei grep, `git branch --show-current` (atteso `main`).

## NON FARE

- Non toccare `ActivityFeed.astro`, `activity/index.astro`, `research.astro`, `config.ts`.
- Non toccare il branch `release-3-0`.
- Non modificare le entry esistenti (in particolare `fame-2026-beyond-proof-of-concept.md`).

## RIFERIMENTI

- `src/content/activity/fame-2026-beyond-proof-of-concept.md` (entry modello, stessa forma)
- `src/content/config.ts` (schema)

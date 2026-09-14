# Sito jjodel.io: allineare `release-3-0` a `main` prima del release day

> **Nome del documento prompt**: 2026-09-14 12:55

Corsia veloce. Repo `jjodel-website`, **branch `release-3-0`**. Leggi `docs/claude-code-log.md`
prima di iniziare. Segue `claude_2026-09-06_1427_prompt_release_day_3_0.md`, già eseguito su
questo branch.

## Contesto (non rifare l'analisi)

`release-3-0` contiene il lavoro del release day (CTA su `app.jjodel.io`, «Previous version (2.x)»
su `old.jjodel.io`, annuncio «Out now», What's New al passato): quattro commit, `e45655c`,
`f14d04a`, `98f232c`, `5aecfd5`. Il branch però parte da `5fb4ed6` e non conosce i quattro commit
arrivati su `main` la sera del 6/9: le attività MODELS 2026 e LangDev 2026 nel feed (`a495802`),
il componente `UpcomingBadge` (`43af29c`, `a0ac056`) e la sua entry di log (`cdf12f0`).

Un merge di `release-3-0` in `main` fatto domani così com'è funzionerebbe, ma il conflitto su
`docs/claude-code-log.md` lo affronterebbe Alfonso nel giorno sbagliato. Si risolve oggi, sul
branch di release, lasciando `main` intatto.

Regole di scrittura: inglese nei file sotto `src/`, niente trattini lunghi (`—` e `–`).

## Gate d'ingresso

Il checkout sta su `main` (questo prompt è committato lì, `278ff93`, e arriva su `release-3-0` con
il merge del passo 1). Prima di tutto `git checkout release-3-0`. Poi:
`git status --porcelain` vuoto, `git rev-parse --abbrev-ref HEAD` uguale a `release-3-0`,
`git fetch origin` e `git rev-list --count main..origin/main` uguale a `0` (nessun push su `main`
di cui il locale non sappia). Altrimenti HARD STOP.

## COSA

### Passo 1, `git merge main` dentro `release-3-0`

Merge, non rebase: i quattro commit di `release-3-0` restano con i loro SHA e la loro entry di log
li cita. Conflitto atteso in un file solo, `docs/claude-code-log.md`. Regola di risoluzione: si
tengono **tutte** le entry di entrambi i lati, in ordine newest-first per data e ora del
«Nome del documento prompt», quindi dall'alto: 17:25 (UpcomingBadge), 17:07 (attività MODELS e
LangDev), 14:27 (release day), 14:12 (countdown), 13:46 (annuncio). Nessuna entry va riscritta.
Se il conflitto tocca un file sotto `src/`, HARD STOP e riferisci: vuol dire che il release day e
l'UpcomingBadge hanno toccato la stessa riga, e la scelta è di Alfonso.

Messaggio del merge commit: `merge: bring main into release-3-0 ahead of release day`.

### Passo 2, verifica sul risultato del merge

`npm run build` verde. Poi, sul tree e su `dist/`:

- `grep -rn 'beta.jjodel.io' src` deve dare **zero** risultati (era il vincolo del prompt del 6/9;
  il merge non deve averlo rotto);
- `grep -rl 'beta.jjodel.io' dist` deve dare zero;
- `grep -c '—' dist/index.html dist/whats-new/index.html dist/activity/index.html dist/research/index.html`
  deve dare 0 su ciascuno;
- `grep -c 'data-date' dist/index.html` deve essere maggiore di 0 (l'UpcomingBadge è sopravvissuto
  al merge) e `grep -c 'old.jjodel.io' dist/index.html` maggiore di 0 (il release day pure);
- in `src/components/Announcement.astro` l'oggetto `announcement` ha `enabled: true` e
  `badge: 'Out now'`.

Riferire i numeri, non «ok».

### Passo 3, log

Entry in `docs/claude-code-log.md` sul branch `release-3-0`, formato standard, con i conteggi del
passo 2. Commit `docs: log the pre-release alignment of release-3-0`.

## HARD STOP: niente merge in `main`, niente push

Il branch resta locale. Domani, **dopo** che Alfonso ha commutato i sottodomini (`app.jjodel.io`
che serve la 3.0, `old.jjodel.io` che serve la 2.x) e solo su GO esplicito:

```
git checkout main
git merge --ff-only release-3-0
git push origin main
```

Il push su `main` fa partire GitHub Actions e pubblica su `jjodel.io`. Il fast-forward è garantito
dal merge del passo 1: se `--ff-only` rifiuta, qualcuno ha pushato su `main` nel frattempo, e si
torna al gate. Il banner della home si regola da solo: il 15 dice «arrives on 15 September 2026, today» con
il link a `app.jjodel.io`, dal 16 «Jjodel 3.0 is out» (`daysToRelease` negativo); la sua rimozione
è un task successivo.

## Fuori perimetro

Contenuti nuovi, stile, la rimozione del banner, la pagina What's New oltre quanto già fatto il
6/9, `docs.jjodel.io`.

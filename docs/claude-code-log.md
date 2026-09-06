# Claude Code log

## 2026-09-06 — docs: attività MODELS 2026 e LangDev 2026 nel feed
**Prompt**: due entry nel feed attività: demo Jjodie a MODELS 2026 (7 ottobre) e talk "Domain Knowledge Debt in Metamodeling" a LangDev 2026 (8 ottobre), entrambi di Alfonso Pierantonio a Málaga
**File toccati**: src/content/activity/models-2026-jjodie-demo.md (nuovo), src/content/activity/langdev-2026-domain-knowledge-debt.md (nuovo), docs/claude-code-log.md
**Esito**: ✅ completato su `main` (commit unico); copy dei due file usata alla lettera, tutti i campi accettati dallo schema di config.ts senza adattamenti; build verde, `grep -c "—"` = 0 su dist/index.html, dist/activity/index.html, dist/research/index.html; le due entry sono in testa al feed della home, sopra FAME 2026; nessun push
**Nome del documento prompt**: 2026-09-06 17:07

## 2026-09-06 — feat: conto alla rovescia del rilascio 3.0 sulla home
**Prompt**: countdown in giorni verso il 15 settembre 2026, in due punti: badge del modale annuncio e striscia dismissibile in testa alla home
**File toccati**: src/lib/release.ts (nuovo), src/components/Announcement.astro, src/components/ReleaseBanner.astro (nuovo), src/pages/index.astro, docs/claude-code-log.md
**Esito**: ✅ completato (tre commit: helper `155c664`, badge `0d23e01`, striscia `fa2a3b2`; build verde, `grep -c "—" dist/index.html` = 0; test di `daysToRelease`: 2026-09-06T23:30Z → 9, 2026-09-14T00:10Z → 1, 2026-09-15T12:00Z → 0, 2026-09-16T00:00Z → -1; la striscia è montata solo su index.astro, assente dalle altre 7 pagine di dist; nessun push)
**Nome del documento prompt**: 2026-09-06 14:12

## 2026-09-06 — feat: annuncio data di rilascio 3.0 e pulizia repo
**Prompt**: stato pre-rilascio Jjodel 3.0 (15 settembre 2026): modale annuncio con data, pagina /whats-new/ allineata alla What's New dei docs (nove novità), rimozione scaffold annidato
**File toccati**: src/components/Announcement.astro, src/pages/whats-new.astro, jjodel-website/ (rimossa, 22 file), docs/claude-code-log.md
**Esito**: ✅ completato (tre commit: annuncio, rimozione scaffold, log; build verde, zero trattini lunghi in dist/whats-new/index.html e dist/index.html; nessun push)
**Nome del documento prompt**: 2026-09-06 13:46

## 2026-07-16 — nota: commit senza entry di log
**Prompt**: (nessun prompt registrato)
**File toccati**: —
**Esito**: ⚠️ i commit `f26701d` (workflow updated) e `83a0d01` (feat: add What you can do with Jjodel section to home page) sono stati fatti senza la corrispondente entry di log
**Nome del documento prompt**: —

## 2026-04-20 — docs: hide LangDev talk from activity feed
**Prompt**: hide "Real-Time Rooms for Collaborative Modeling" from home feed via draft: true
**File toccati**: src/content/config.ts, src/content/activity/langdev-2025-rooms.md, src/components/ActivityFeed.astro, src/pages/activity/index.astro
**Esito**: ✅ completato (nota: il talk è ancora visibile su /research/ perché la Talks & keynotes section non era nello scope del task; richiede un prompt separato se si vuole nasconderlo anche lì)
**Nome del documento prompt**: 2026-04-20 11:30

## 2026-04-20 — feat: split-button CTA with Current/Beta choice
**Prompt**: add split-button Try Jjodel CTA with dropdown (Current version / Beta 3.0), replacing 3 existing CTAs (toolbar, hero, final)
**File toccati**: src/components/TryJjodelButton.astro, src/components/Nav.astro, src/components/Hero.astro, src/pages/index.astro
**Esito**: ✅ completato
**Nome del documento prompt**: 2026-04-20 11:30

## 2026-04-20 — docs: add FAME 2026 activity entry
**Prompt**: add FAME 2026 summer school talk ("Beyond the Proof of Concept") by Alfonso Pierantonio, Malaga 30 Sep - 2 Oct 2026
**File toccati**: src/content/activity/fame-2026-beyond-proof-of-concept.md
**Esito**: ✅ completato (note: schema non ha campi `event`/`location` distinti, nome evento + sede combinati in `venue`; enum `type` non include `lecture`, fallback a `talk` come da istruzione del prompt)
**Nome del documento prompt**: 2026-04-20 12:55

# Spelhallen

Webbspel som publiceras på https://jvallstrand.github.io/spel/ (GitHub Pages, `main`, root).

- `index.html` är spelväljaren. Varje spel ligger i en egen mapp (`kick/`, `pistkungen/`, `hastliv/`) med en egen `index.html`.
- `sw.js` är en gemensam service worker (`CACHE = 'spel-vN'`). Höj N vid varje publicering.
- Varje spel har `APP_VERSION` i foten och en Uppdatera appen-knapp med `CACHE_PREFIX='spel-'`. Höj versionen vid varje ändring.
- Spelen registrerar `../sw.js` och har en "Alla spel"-länk till `../`.
- `localStorage`-nycklar har prefix per spel (`kick:`, `pist:`, `hast:`). Byt aldrig nycklar.
- Nytt spel: ny mapp, nytt kort i `index.html`, höj versionen på spelväljaren och `CACHE`.

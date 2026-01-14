# Metin2 Quest Programming Guide

Umfassende Dokumentation für Metin2 Quest Scripting, erstellt mit Docusaurus.

## 🚀 Lokale Installation

### Voraussetzungen

- Node.js Version 18.0 oder höher
- npm oder yarn

### Installation

```bash
cd my-documentation
npm install
```

### Lokale Entwicklung

```bash
npm start
```

Dieser Befehl startet einen lokalen Entwicklungsserver und öffnet ein Browserfenster. Die meisten Änderungen werden live ohne Neustart des Servers übernommen.

### Build

```bash
npm run build
```

Dieser Befehl generiert statische Inhalte im `build` Verzeichnis, die auf jedem statischen Hosting-Service bereitgestellt werden können.

## 📦 Deployment auf GitHub Pages

### Schritt 1: Repository erstellen

1. Gehe zu [github.com](https://github.com) und erstelle ein neues Repository
2. Name: z.B. `metin2-quest-docs`
3. Wähle "Public" aus (für kostenlose GitHub Pages)
4. Erstelle das Repository **ohne** README, .gitignore oder LICENSE

### Schritt 2: Repository-Informationen in Config eintragen

Öffne `docusaurus.config.js` und ändere folgende Zeilen:

```javascript
url: 'https://dein-github-username.github.io',
baseUrl: '/dein-repository-name/',
organizationName: 'dein-github-username',
projectName: 'dein-repository-name',
```

Beispiel:
```javascript
url: 'https://johndoe.github.io',
baseUrl: '/metin2-quest-docs/',
organizationName: 'johndoe',
projectName: 'metin2-quest-docs',
```

### Schritt 3: Dateien ins Repository pushen

```bash
cd my-documentation
git init
git add .
git commit -m "Initial documentation"
git branch -M main
git remote add origin https://github.com/dein-username/dein-repository-name.git
git push -u origin main
```

### Schritt 4: GitHub Actions für Deployment

Erstelle `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: write

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 18
          cache: npm

      - name: Install dependencies
        run: npm ci
      - name: Build website
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          user_name: github-actions[bot]
          user_email: github-actions[bot]@users.noreply.github.com
```

Commit und push diese Datei:

```bash
git add .github/workflows/deploy.yml
git commit -m "Add GitHub Actions workflow"
git push
```

### Schritt 5: GitHub Pages aktivieren

1. Gehe zu deinem Repository auf GitHub
2. Klicke auf "Settings" (Einstellungen)
3. Scrolle runter zu "Pages" im linken Menü
4. Bei "Source" wähle "Deploy from a branch"
5. Bei "Branch" wähle "gh-pages" und "/ (root)"
6. Klicke auf "Save"

Nach einigen Minuten ist deine Dokumentation verfügbar unter:
`https://dein-username.github.io/dein-repository-name/`

## 📝 Dokumentationsstruktur

```
docs/
├── intro.md                    # Übersicht
├── getting-started.md          # Schnelleinstieg
├── core-concepts.md            # Grundkonzepte
├── api-reference/              # API-Dokumentation
│   ├── player-api.md
│   ├── npc-api.md
│   ├── item-api.md
│   ├── guild-api.md
│   ├── game-api.md
│   ├── party-api.md
│   ├── dungeon-api.md
│   └── other-apis.md
├── user-interface.md           # UI-Systeme
├── advanced-topics.md          # Fortgeschrittene Themen
├── best-practices.md           # Best Practices
└── reference.md                # Quick Reference
```

## 🎨 Anpassungen

### Logo ändern

Ersetze `static/img/logo.svg` mit deinem eigenen Logo.

### Farben anpassen

Bearbeite `src/css/custom.css` für eigene Farben und Styles.

### Weitere Seiten hinzufügen

Erstelle einfach neue `.md` Dateien im `docs/` Ordner und füge sie in `sidebars.js` hinzu.

## 🛠️ Befehle

- `npm start` - Startet lokalen Dev-Server
- `npm run build` - Erstellt Production-Build
- `npm run serve` - Testet Production-Build lokal
- `npm run clear` - Löscht Cache
- `npm run deploy` - Deployment via GitHub Pages (alternative Methode)

## 📚 Weitere Ressourcen

- [Docusaurus Dokumentation](https://docusaurus.io/)
- [Markdown Guide](https://www.markdownguide.org/)
- [GitHub Pages Dokumentation](https://docs.github.com/pages)

## 📄 Lizenz

Diese Dokumentation ist Teil des Metin2 Community-Projekts.

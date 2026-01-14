---
sidebar_position: 1
---

# Metin2 Quest Programming Language

**Comprehensive Reference Guide & API Documentation**

**Version:** 2.0 Extended Edition  
**Language:** Lua-based Quest Scripting  
**Target Platform:** Metin2 Server (Fliege V3 Compatible)  
**Author:** Community Documentation Project  
**Last Updated:** Januar 2026

---

## Was ist Metin2 Quest Scripting?

Metin2 verwendet eine Lua-basierte domänenspezifische Sprache (DSL) für die Erstellung von Quests, NPCs, Events und Gameplay-Mechaniken. Quest-Skripte steuern:

- **NPC-Interaktionen** - Dialoge, Shops, Dienstleistungen
- **Quest-Systeme** - Story-Quests, Daily-Quests, Achievements
- **Event-Management** - Server-Events, Wettbewerbe
- **Gameplay-Mechaniken** - Custom Features, Belohnungen, Progression
- **Welt-Interaktion** - Teleportation, Spawning, Weltzustand

## Dateiformat

Quest-Dateien können zwei Erweiterungen verwenden:
- `.quest` - Standard Quest-Dateierweiterung
- `.lua` - Lua-Skript-Erweiterung (funktional identisch)

Beide Formate werden vom Server identisch behandelt.

## Sprachmerkmale

- **Event-Driven** - Quests reagieren auf Spieleraktionen
- **State-Based** - Mehrstufige Quest-Progression
- **Persistent Data** - Quest-Flags werden in der Datenbank gespeichert
- **Type-Safe** - Eingebaute Typprüfung und Validierung
- **Integrated** - Direkter Zugriff auf Spielsysteme

## Dokumentationsstruktur

Diese Dokumentation ist in folgende Bereiche unterteilt:

1. **Getting Started** - Schnelleinstieg und erstes Quest
2. **Core Concepts** - Grundlegende Konzepte und Syntax
3. **API Reference** - Vollständige API-Dokumentation
4. **User Interface** - Dialog-Systeme und UI-Elemente
5. **Advanced Topics** - Fortgeschrittene Techniken
6. **Best Practices** - Design Patterns und Optimierung
7. **Reference** - Quick Reference und Beispiele

## Zielgruppe

Diese Dokumentation richtet sich an:
- Anfänger, die ihre ersten Quests schreiben möchten
- Erfahrene Entwickler, die API-Referenzen benötigen
- Server-Administratoren, die Custom Content erstellen
- Community-Entwickler, die Best Practices suchen

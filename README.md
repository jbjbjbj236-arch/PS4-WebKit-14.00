# Hard Time III — Browser Edition

A browser-native 3D prison-life sandbox prototype built with Three.js. This repository has been repurposed from the previous PS4 WebKit project.

## Play

Open the GitHub Pages site after the Actions deployment completes:

https://jbjbjbj236-arch.github.io/PS4-WebKit-14.00/

The game uses Three.js from jsDelivr and Google Fonts, so an internet connection is required.

## Controls

- **WASD** — Move
- **Mouse** — Look around (click the game to capture the pointer)
- **Shift** — Run
- **Space** — Jump
- **E** — Talk / interact
- **F** — Attack
- **Esc** — Pause menu

## Current prototype features

- Real-time 3D yard and cell-block environment
- Third-person player movement and mouse camera
- NPC inmates and a guard with basic roaming and hostile behavior
- Basic melee combat, health, stamina, reputation, and cash
- Character name, skin tone, and uniform customization
- Local browser save/load
- JSON mod manager with validation and a starter template
- Responsive HUD and pause menu

## Mod format

Import a JSON file through **Menu → Mod Manager**.

```json
{
  "name": "My Mod",
  "version": "1.0.0",
  "description": "A small gameplay pack",
  "type": "gameplay",
  "player": {
    "cashBonus": 10,
    "reputationBonus": 2
  },
  "world": {
    "ambientColor": "#82917e"
  }
}
```

Mods are data-only in this prototype. Arbitrary JavaScript execution is intentionally not supported.

## Development

No build step is required. Serve the repository root with any static web server, or use GitHub Pages. Three.js is imported as an ES module.

## Roadmap

- [ ] More detailed prison interiors and cell access
- [ ] NPC dialogue, relationships, schedules, and factions
- [ ] Expanded combat, inventory, and equipment
- [ ] More mod types: outfits, NPC definitions, objects, maps, and dialogue
- [ ] Mod enable/disable, dependency metadata, and import/export
- [ ] Gamepad support and improved mobile controls
- [ ] Automated browser testing and performance tuning

## Legal

Independent browser game prototype. Not affiliated with or endorsed by MDickie. Does not include proprietary Hard Time III source code or extracted game assets. Names and references are used to describe the intended genre and inspiration.

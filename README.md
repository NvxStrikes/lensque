# Lensque

Free, client-side image toolkit. Everything processes in the browser — nothing is uploaded to a server.

## Overview

Lensque is built for zero-upload image manipulation. Modern web browsers possess powerful hardware-accelerated Canvas, WebGL, and WebAssembly capabilities that make server-side image transfers redundant for core conversion, compression, and editing tasks.

All processing occurs in local volatile memory. No accounts, no subscriptions, no network transmission of image data.

## Architecture

- **Substrate**: Plain HTML5, CSS3, and ES6 JavaScript.
- **Dependencies**: Zero runtime frameworks, zero build steps, zero external CDNs for logic.
- **Processing Model**: Client-side execution via standard Web APIs (`FileReader`, `CanvasRenderingContext2D`, Web Workers).
- **Network**: Zero outgoing image payloads or analytics telemetry.

## Visual Design System

Lensque adheres to a strict neo-brutalist aesthetic:
- **Base Background**: `#0B0B0B` (near-black)
- **Primary Text**: `#EDEDED` (off-white)
- **Muted Text**: `#9A9A9A`
- **Structural Lines**: `#2A2A2A` (default), `#FFFFFF` (selective emphasis)
- **Accent**: `#F5D90A` (saturated neo-brutalist yellow)
- **Geometry**: Sharp 90-degree corners (`border-radius: 0` globally), solid 1–2px borders, hard non-blurred offset shadows (`4px 4px 0px #F5D90A`).

## Local Development

Open `index.html` in any modern web browser, or serve locally with Python:

```bash
python -m http.server 8000
```

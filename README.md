# PS4 WebKit 14.00 — research workspace

> **Status: research scaffold only. This is not a jailbreak and does not exploit a PS4.**

This repository is a clean-room investigation workspace for understanding whether components in the supplied `hen.iso` BD-J image can be reimplemented for a browser environment.

## Current findings

The supplied image is a 6,225,920-byte UDF 2.x disc image. Its visible strings include Blu-ray/BD-J structures such as `BDMV`, `index.bdmv`, `MovieObject.bdmv`, `.bdjo`, `.clpi`, `.mpls`, `.m2ts`, `.jar`, and Java class names including `AXZXkk.class`, `EkIKZR.class`, and `Hx1400.class`. This points to a Blu-ray Java application, not a browser exploit source tree.

A BD-J payload cannot be converted wholesale into JavaScript. The browser and Blu-ray runtime expose different APIs. The next valid step is to extract the JAR/class files, inspect their bytecode and dependencies, and classify each operation as portable application logic, Blu-ray-specific behavior, native/kernel functionality, or unknown behavior.

## Layout
- `index.html` — local analysis UI.
- `src/iso-inspector.js` — local ISO string/signature scanner; no upload.
- `src/browser-diagnostics.js` — harmless browser capability report.
- `docs/REVERSE_ENGINEERING.md` — analysis workflow.

## Use
Open `index.html`, select `hen.iso`, and run the scan. It reports BD-J markers and printable strings. It does **not** execute code from the ISO.

## Firmware scope
Target: PS4 system software **14.00**. Do not assume a WebKit vulnerability, sandbox escape, kernel exploit, or HEN payload exists for that firmware until supported by verifiable source code and reproducible testing. A diagnostics page is not a jailbreak.

## Integrity
- No code from the ISO is executed.
- No exploit chain is claimed or fabricated.
- Preserve upstream licenses and attribution before adapting third-party code.

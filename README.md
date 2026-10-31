# PS4 WebKit 14.00 — research workspace

> **Status: reverse-engineering scaffold. Not a jailbreak. No PS4 exploit is executed by this project.**

This repository investigates whether the supplied `hen.iso` BD-J application can be understood and whether any *portable, non-privileged application logic* can be recreated in a browser. The image has now been extracted and audited at the filesystem/JAR level; it is not a WebKit exploit source tree.

## Verified ISO findings

- UDF 2.x image, 6,225,920 bytes; SHA-256: `39da48ea6711795850d3062b4ba85a650d4b6289e6682350843db8e0f0d141c3`.
- Contains a Blu-ray BD-J application under `BDMV/JAR/00000.jar`.
- The JAR contains `org.bdj.InitXlet`, `org.bdj.Boot`, `org.bdj.OfflineRenderer`, `org.bdj.LocalResultLedger`, supporting classes, and a 562,240-byte `bonk/hen.bin` binary.
- The Xlet uses BD-J/TV APIs (including `javax.tv.xlet` and `org.havi.ui`) and AWT for its on-disc interface. These APIs do not exist in ordinary browser JavaScript.
- `NOTICE.txt` identifies the image as a “Bonk HEN 14.00 local HEN review candidate” and explicitly warns that its Hx stage may write unknown kernel objects even on a failed pairing run. **Do not run this image on a console as part of this research.**
- The JAR signature uses SHA-1 / 1024-bit RSA and current Java reports the signature algorithm as disabled/weak; numerous entries are not covered by the manifest. A signature indicator is not proof that the payload is safe or trustworthy.

See [the detailed audit](docs/ISO_AUDIT.md).

## Firmware 14.00 reality check

As of 2026-10-30, the public PS4 exploit chart and FAQ list no public userland or kernel exploit/jailbreak for 14.00. A browser page alone cannot provide the missing WebKit memory-corruption primitive, browser sandbox escape, and kernel privilege escalation. This project will not invent offsets, vulnerabilities, or a working chain.

References:
- [ConsoleMods PS4 Exploit Chart](https://consolemods.org/wiki/PS4%3AExploit_Chart)
- [ConsoleMods PS4 FAQ](https://consolemods.org/wiki/PS4%3AFAQ)

## Layout

- `index.html` — local analysis UI.
- `src/iso-inspector.js` — local string/signature scanner; no upload.
- `src/browser-diagnostics.js` — harmless browser capability report.
- `docs/ISO_AUDIT.md` — extracted contents, hashes, and safety findings.
- `docs/REVERSE_ENGINEERING.md` — workflow and portability boundaries.

## Safety and scope

- The ISO, JAR, classes, and embedded binary were inspected as data only; none were executed.
- No payload is sent to a console, and no kernel write is attempted.
- Do not translate BD-J filesystem, Xlet, or privileged native behavior into browser code and pretend it is equivalent.
- Any future browser work must remain a harmless diagnostic/probe until a public, reproducible 14.00 WebKit entry point and the missing privilege-boundary stages are independently established.
- Preserve upstream licenses and attribution before adapting third-party code.

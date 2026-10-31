# hen.iso — filesystem and payload audit

**Audit date:** 2026-10-30  
**Input:** `hen.iso`  
**Input size:** 6,225,920 bytes  
**Input SHA-256:** `39da48ea6711795850d3062b4ba85a650d4b6289e6682350843db8e0f0d141c3`

## Extraction result

The image is a readable UDF 2.x volume. The complete directory tree was extracted locally with libudfread; the original ISO was not modified. The primary application is a Blu-ray Disc Java (BD-J) Xlet.

Important paths:

| Path | Size | SHA-256 |
|---|---:|---|
| `BDMV/JAR/00000.jar` | 192,403 | `d6b16769366df24d50623afdaefab6b2299ff02bb816ea30da7839a572b3c0ed` |
| `BDMV/BDJO/00000.bdjo` | 164 | `8e49c6f853b0cf2901385ad861c63b1f2fe7e1d4b3a6d563b49f2d4b8804c786` |
| `BDMV/STREAM/00000.m2ts` | 3,975,168 | `d36550af26b87525c9e13980048216cc24f4553065ad7a90bed994819ad915d0` |
| `BDMV/index.bdmv` | 526 | `8961b424de6e476e04fcede5bcb47eb5ce0f086a5a9afd6b364ad84d5128870e` |
| `BDMV/MovieObject.bdmv` | 7,402 | `056a6201ff95054ae34730c76ee543944d54e8a935c4d95432fbaae0d04d5bf6` |
| `NOTICE.txt` | 564 | `9a54710be2443ba05f60b5695f5a806169b8479482558bad521540e5b3097575` |
| `CERTIFICATE/app.discroot.crt` | 665 | `50d8444e65bdeabae87fc2a39232759078d21b5cae3ce6f38c3ec4052efd9aa5` |
| `CERTIFICATE/bu.discroot.crt` | 665 | `18943ead1a89853c9061e577e2772a9839a3f643a3fd40430343b47ee6b30d3a` |

The JAR contains these application classes (all class-file major version 48):

- `org.bdj.InitXlet` — Xlet lifecycle, on-disc resource checks, readiness UI, and X-key handling.
- `org.bdj.Boot` — obfuscated bootstrap/command layer.
- `org.bdj.OfflineRenderer` — binary data validation and rendering/patch preparation.
- `org.bdj.LocalResultLedger` — staged result tracking and guards.
- `org.bdj.Screen` — on-screen status display.
- `org.bdj.InitXlet$Attempt` and supporting nested classes.

The JAR also contains a 562,240-byte `bonk/hen.bin` binary (SHA-256 `29ec095fbede651e29954de43411599093138791e62105aaee6fdced58edec06`), binary metadata tables under `bonk/local/`, and command-template files. The embedded binary and command templates have **not** been executed.

## Runtime dependencies

Static dependency analysis identifies standard Java classes plus BD-J-specific APIs that are absent from browser JavaScript, including:

- `javax.tv.xlet.Xlet`
- `javax.tv.xlet.XletContext`
- `javax.tv.xlet.XletStateChangeException`
- `org.havi.ui.HScene`
- `org.havi.ui.HSceneFactory`
- `org.havi.ui.HComponent`

The Xlet also uses AWT, Java resource URLs, streams, hashing, and reflection. Some ordinary parsing, validation, and display logic could be independently rewritten in JavaScript, but this does not port BD-J services or native/kernel behavior.

## Safety finding — do not run

The supplied `NOTICE.txt` says:

> Bonk HEN 14.00 local HEN review candidate

It further says the Hx stage may write unknown kernel objects even on a failed pairing run, instructs a cold reboot after failure, and says a displayed Hx success report must be independently verified. This is a direct warning that execution can alter privileged kernel state in ways not understood by this audit.

**Therefore this project will not execute the Xlet, embedded binary, templates, or any generated command sequence.** A successful Java signature check is not a safety audit.

The JAR signature metadata is also weak by modern standards: `jarsigner` reports SHA-1 and 1024-bit RSA and warns that the signature is disabled by current Java security policy; many archive entries are not covered by the manifest. Treat the archive as untrusted input.

## What this means for a browser port

The image is a BD-J/HEN payload, not a ready-made WebKit exploit. A browser implementation would need a separate, independently demonstrated WebKit entry point and a valid way across the browser sandbox and into the required privilege level. Ordinary JavaScript cannot directly reproduce the BD-J runtime or kernel writes.

The only safe current deliverable is static analysis and a browser-side UI for local inspection. No 14.00 browser jailbreak is claimed.

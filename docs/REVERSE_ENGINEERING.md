# Reverse-engineering workflow

## Current verified state (2026-10-30)

The UDF filesystem has been fully extracted and the primary JAR inspected without executing it. See [ISO_AUDIT.md](ISO_AUDIT.md) for hashes and the safety review.

The BDJO descriptor names `org.bdj.InitXlet` as the Xlet class. The JAR contains:
- `InitXlet`: BD-J Xlet lifecycle, local-resource/hash checks, readiness UI, and X-key trigger.
- `Boot`: obfuscated bootstrap and command interpreter.
- `InitXlet$Attempt`: one-shot attempt logic; bytecode calls `Boot.exec(byte[])` for the Hx/HEN stage and performs status/result checks.
- `OfflineRenderer` and `LocalResultLedger`: local binary-data validation, render/patch preparation, and staged-result tracking.
- `bonk/hen.bin`: 562,240-byte embedded binary plus metadata and command-template blobs.

The archive is a BD-J payload, not a WebKit exploit. Its Xlet depends on `javax.tv.xlet` and `org.havi.ui` APIs unavailable in an ordinary browser. The NOTICE explicitly warns that the Hx stage may write unknown kernel objects even on a failed run. **Do not execute it on a console.** This repository only analyzes it as data.

## Firmware boundary

As of 2026-10-30, the public PS4 exploit chart/FAQ do not list a public 14.00 userland or kernel exploit. A browser UI or JavaScript rewrite cannot substitute for a demonstrated WebKit memory-corruption primitive, sandbox escape, and kernel privilege escalation. See:
- https://consolemods.org/wiki/PS4%3AExploit_Chart
- https://consolemods.org/wiki/PS4%3AFAQ

## Remaining safe work

1. Preserve the original ISO and all extracted artifacts read-only; record hashes.
2. Continue static review of the Xlet's BD-J API dependencies and data formats.
3. Identify which display, parsing, and validation routines are ordinary application logic that could be independently rewritten in JavaScript.
4. Keep opaque native payloads, command templates, and kernel-facing behavior out of browser code until their purpose and safety are independently established.
5. Keep browser diagnostics clearly separate from exploit testing. Feature checks (WebAssembly, BigInt, etc.) are not vulnerability checks.

## Portability rule

Only ordinary application logic can be translated directly to JavaScript. Calls that depend on BD-J APIs need a replacement design. Native memory access, kernel patches, and privileged system operations are not provided by normal browser JavaScript.

## Do not infer

A BD-J image containing Java classes is not evidence of a WebKit exploit, a browser sandbox escape, or a kernel exploit for firmware 14.00. A UI message that claims success is not proof of kernel read/write or HEN execution.

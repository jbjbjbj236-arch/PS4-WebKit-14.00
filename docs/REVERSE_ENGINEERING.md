# Reverse-engineering workflow

## Evidence currently available
- Image size: 6,225,920 bytes.
- Container: UDF 2.x.
- Visible Blu-ray markers: BDMV, BDJO, CLIPINF, PLAYLIST, STREAM, index.bdmv, MovieObject.bdmv.
- Visible Java artifacts: 00000.jar and class-name strings AXZXkk, EkIKZR, Hx1400.

These are string-level observations, not a complete extraction or proof of what the classes do.

## Required next artifacts
1. Extract the ISO filesystem without modifying the original.
2. Copy the JAR and all referenced class files into an analysis folder.
3. Record SHA-256 hashes for every extracted artifact.
4. Inspect class-file constant pools and disassemble bytecode.
5. Record each BD-J API dependency and native interaction.
6. Build a mapping table: original operation, runtime dependency, browser equivalent (if any), confidence, test evidence.

## Portability rule
Only ordinary application logic can be translated directly to JavaScript. Calls that depend on BD-J APIs need a replacement design. Native memory access, kernel patches, and privileged system operations are not provided by normal browser JavaScript.

## Do not infer
A BD-J image containing Java classes is not evidence of a WebKit exploit, a browser sandbox escape, or a kernel exploit for firmware 14.00.

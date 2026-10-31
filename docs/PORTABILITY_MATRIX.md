# BD-J to browser portability map

This is a feasibility map for recreating harmless application/UI behavior. It is **not** a plan for translating the embedded HEN/kernel stage into JavaScript.

| Original behavior | Evidence in the supplied JAR | Possible browser replacement | Boundary |
|---|---|---|---|
| Xlet startup/shutdown | `javax.tv.xlet.Xlet` lifecycle methods | Page load and visibility lifecycle events | Browser lifecycle is not a privileged Xlet environment |
| On-screen BD-J UI | `org.havi.ui.HScene`, `HComponent`, AWT classes | DOM, CSS, Canvas | UI only |
| X-key trigger | AWT `KeyListener` | Keyboard/pointer event handlers | Event handling only |
| Read local JAR resources | Class resource URLs and streams | User-selected File API input; `fetch` for ordinary web resources | Browser cannot read the console disc root or arbitrary console files |
| Verify resource hashes | Java `MessageDigest` | `crypto.subtle.digest("SHA-256", ...)` in a secure context | Integrity check only; does not confer trust |
| Parse binary tables | `OfflineRenderer`, `LocalResultLedger` | Pure JavaScript parsers after format documentation and test vectors exist | Do not parse-and-execute opaque command templates |
| Execute Hx/HEN stage | `InitXlet$Attempt` calls `Boot.exec(byte[])`; opaque `bonk/hen.bin` and command templates are present | **No safe or equivalent browser API** | The NOTICE warns of unknown kernel writes; do not execute or port |
| Kernel/privileged effects | Explicit Hx/HEN stage and warning in `NOTICE.txt` | None in ordinary browser JavaScript | Requires separate, demonstrated privilege-boundary vulnerabilities; no 14.00 public chain is established |

## Practical conclusion

A browser rewrite can reproduce the dashboard, local file selection, hashing, display, and carefully documented pure-data validation. It cannot turn the BD-J HEN payload into a WebKit jailbreak. Browser memory corruption, a sandbox escape, and kernel privilege escalation are separate security stages; none may be assumed from the presence of a BD-J HEN image.

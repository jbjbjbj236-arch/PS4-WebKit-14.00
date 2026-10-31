import { inspectIso } from "./iso-inspector.js";
import { collectBrowserDiagnostics } from "./browser-diagnostics.js";
const fileInput = document.querySelector("#isoFile");
const scanButton = document.querySelector("#scanIso");
const fileMeta = document.querySelector("#fileMeta");
const isoResults = document.querySelector("#isoResults");
fileInput.addEventListener("change", () => {
  const file = fileInput.files?.[0];
  scanButton.disabled = !file;
  fileMeta.textContent = file ? `${file.name} · ${file.size.toLocaleString()} bytes` : "No image selected.";
  isoResults.textContent = "Ready to inspect. The file stays on this device.";
});
scanButton.addEventListener("click", async () => {
  const file = fileInput.files?.[0];
  if (!file) return;
  scanButton.disabled = true;
  isoResults.textContent = "Scanning local file…";
  try {
    const result = inspectIso(await file.arrayBuffer());
    isoResults.textContent = [
      `Size: ${result.size.toLocaleString()} bytes`,
      `BD-J markers found: ${result.markers.length ? result.markers.join(", ") : "none"}`,
      `Java class names found: ${result.classes.length ? result.classes.join(", ") : "none"}`,
      "",
      "Printable strings (first 250):",
      result.strings.join("\n") || "No printable strings found."
    ].join("\n");
  } catch (error) { isoResults.textContent = `Scan failed: ${error.message}`; }
  finally { scanButton.disabled = false; }
});
document.querySelector("#runDiagnostics").addEventListener("click", () => {
  const checks = collectBrowserDiagnostics();
  document.querySelector("#diagnosticsOutput").textContent = Object.entries(checks).map(([key,value]) => `${key}: ${value}`).join("\n");
});

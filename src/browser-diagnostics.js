export function collectBrowserDiagnostics() {
  const checks = {
    userAgent: navigator.userAgent,
    platform: navigator.platform || "not exposed",
    webAssembly: typeof WebAssembly !== "undefined",
    webAssemblyValidation: typeof WebAssembly !== "undefined" && WebAssembly.validate(new Uint8Array([0,97,115,109,1,0,0,0])),
    bigInt: typeof BigInt === "function",
    textEncoder: typeof TextEncoder !== "undefined",
    fileApi: typeof File !== "undefined" && typeof FileReader !== "undefined",
    sharedArrayBuffer: typeof SharedArrayBuffer !== "undefined",
    crossOriginIsolated: self.crossOriginIsolated === true,
    secureContext: self.isSecureContext === true
  };
  return checks;
}

const MARKERS = ["BDMV","CERTIFICATE","index.bdmv","MovieObject.bdmv","BDJO","CLIPINF","PLAYLIST","STREAM","00000.bdjo","00000.clpi","00000.jar","00000.mpls","00000.m2ts","app.discroot.crt","bu.discroot.crt","id.bdmv"];
const CLASS_NAMES = ["AXZXkk.class","EkIKZR.class","Hx1400.class"];
export function inspectIso(buffer) {
  const bytes = new Uint8Array(buffer);
  let ascii = "";
  for (const byte of bytes) ascii += byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : "\n";
  const markers = MARKERS.filter(value => ascii.includes(value));
  const classes = CLASS_NAMES.filter(value => ascii.includes(value));
  const strings = [...new Set(ascii.split(/\n+/).map(s => s.trim()).filter(s => s.length >= 5 && s.length <= 180))].slice(0, 250);
  return { size: bytes.byteLength, markers, classes, strings };
}

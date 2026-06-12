// Serialize an object for embedding inside a <script type="application/ld+json"> tag.
// Escapes the characters that could otherwise break out of the <script> element.
// The graphs are static today, but several are assembled from editable data arrays
// (team, FAQs, blog) that arrive at go-live; with the CSP allowing 'unsafe-inline'
// a stray "</script>" in that data would be an injection vector. Cheap insurance.
export function jsonLd(obj) {
  return JSON.stringify(obj)
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026')
}

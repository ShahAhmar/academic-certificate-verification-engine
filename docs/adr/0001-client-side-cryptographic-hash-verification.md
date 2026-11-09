# ADR 0001: Client-Side Cryptographic Hash Verification & Vector Print Pipeline

## Status
Accepted

## Context & Problem Statement
Academic conference attendees, journal contributors, and institutional evaluators require instantaneous verification of credentials across diverse geographic regions and network conditions. 

Evaluating credentials through heavy server-side PDF compilation engines (e.g., headless Chrome instances, Puppeteer, or server-side wkhtmltopdf) introduces substantial infrastructure overhead:
- High server memory consumption when hundreds of concurrent attendees request certificate exports simultaneously.
- Latency and vulnerability to denial-of-service during peak conference publication dates.
- Document fidelity loss when converting dynamic HTML canvases to rasterized images.

## Decision
We implemented a **Decoupled Verification & Native Vector Print Subsystem**:
1. **Cryptographic Fingerprinting:** Each credential issues a deterministic SHA-256 fingerprint generated from canonical payload fields (Recipient Name, Credential Identifier, Conferral Date, Sponsoring Consortium).
2. **Deterministic Client Matching:** The lookup engine validates input records against the cryptographic ledger directly within the client execution environment, providing sub-millisecond evaluation.
3. **Native CSS Print Media Compilation:** Instead of server-rendered raster images, PDF generation leverages native browser vector printing engines via scoped `@media print` rules, ensuring crisp vector typography, zero server load, and sub-second generation.

## Consequences

### Positive
- **Zero Server Compute Overhead:** Certificate rendering and PDF compilation occur entirely on client hardware.
- **Infinite Scalability:** Can handle traffic surges during major conference conclusion events with zero infrastructure scaling costs.
- **Vector Document Quality:** Outputted PDF documents retain text selectable vector formats rather than compressed raster images.

### Negative / Trade-Offs
- Print layout fidelity is subject to browser printing engine standards, necessitating defensive CSS normalization across WebKit, Gecko, and Blink.


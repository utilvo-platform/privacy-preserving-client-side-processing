# Threat Model & Security Architecture

## 1. Executive Summary & Scope
This document outlines the security boundaries, threat model, trust assumptions, and mitigation strategies for the browser-based zero-server client-side data processing architecture (`privacy-preserving-client-side-processing`).

## 2. Trust Model & System Boundaries
- **Client Security Perimeter**: All computation (PDF extraction, numerical parsing, chart visualization, unit conversions) executes strictly within the user's browser runtime sandbox (V8 Engine / WebAssembly isolation).
- **Zero Ingress/Egress Law**: No raw user data, documents, or payload bytes are transmitted across network interfaces to any external server or telemetry service.
- **Server Boundaries**: The server infrastructure only delivers static application bundles (HTML, JS, WebAssembly, CSS, JSON schemas) and static assets over HTTPS with HSTS enabled.

## 3. Threat Landscape & Vulnerability Analysis

### Threat T1: Malicious Server / Infrastructure Compromise
- **Attacker Goal**: Exfiltrate sensitive client data by modifying served application bundles.
- **Mitigation**: Subresource Integrity (SRI) hashes, Immutable Cache Headers, Content Security Policy (`script-src 'self'`).

### Threat T2: Cross-Site Scripting (XSS) & Injected Payloads
- **Attacker Goal**: Execute untrusted code to read local DOM data or memory.
- **Mitigation**: Strict Context-Aware Encoding, CSP (`connect-src 'none'`), WebAssembly Sandbox Isolation.

### Threat T3: Side-Channel Data Leakage & Timing Attacks
- **Attacker Goal**: Infer file contents or state via high-precision timers or browser hardware APIs.
- **Mitigation**: Disallow cross-origin workers, strip precision hardware timer access where appropriate.

## 4. Compliance & Verification Standards
- **GDPR / CCPA Alignment**: Compliance by architecture (zero data collection, zero storage, zero processing on server).
- **Auditing Protocols**: Open-source client bundle verification and local browser DevTools network tab inspection.

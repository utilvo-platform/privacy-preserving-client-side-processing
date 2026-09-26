# Security Policy & Responsible Disclosure

## 1. Supported Versions
| Version | Supported |
| ------- | --------- |
| Main Branch | :white_check_mark: |
| < 1.0.0 | :x: |

## 2. Reporting a Vulnerability
We take the security of client-side zero-server processing seriously. If you discover a security vulnerability, side-channel leak, or CSP bypass, please report it responsibly.

### Disclosure Process
1. **DO NOT** open a public GitHub issue for security vulnerabilities.
2. Email your findings to `security@utilvo.com` or submit a private security advisory on GitHub.
3. Include the following details in your report:
   - Description of the vulnerability and attack vector.
   - Proof-of-concept (PoC) code or step-by-step reproduction steps.
   - Impact assessment (e.g., CSP bypass, memory exposure, timing leak).

### Response Timeline
- **Acknowledgement**: Within 48 hours.
- **Assessment & Triage**: Within 5 business days.
- **Fix & Public Advisory**: Fixed within 30 days of verified report.

## 3. Security Principles & Architecture
- Zero Server Storage & Ingress
- Client-Side Isolation
- Subresource Integrity & CSP Security Rules

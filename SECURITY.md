# Security Policy

## Scope
This repository contains research code and a reference implementation for studying privacy-preserving client-side processing. It should be treated as research software rather than a security-certified product.

## Reporting a vulnerability
If you identify a security vulnerability in the implementation, please report it privately to the project maintainer before publicly disclosing the issue.

Please include:
* affected file or component
* vulnerability description
* reproduction steps
* potential impact
* suggested mitigation, if available

Do not include sensitive user data in a report.

## Security claims
The project does not claim that client-side execution automatically guarantees confidentiality or eliminates all security risks.

Security depends on:
* application code
* dependencies
* browser security
* operating-system security
* network behavior
* deployment configuration
* supply-chain integrity

## Research limitations
The threat model is documented in [THREAT_MODEL.md](THREAT_MODEL.md).

Security properties should be evaluated against the actual implementation and deployment rather than inferred solely from the architectural design.
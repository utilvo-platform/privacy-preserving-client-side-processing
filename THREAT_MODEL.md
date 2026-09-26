# Threat Model

## Purpose
This document defines the security and privacy assumptions used when evaluating the client-side processing architecture in this repository. The threat model prevents the architecture from making broader security claims than the implementation can support.

## Assets
Potentially sensitive client-side assets include:
* User documents
* Images
* Binary files
* Structured data
* Cryptographic keys
* Intermediate processing buffers
* Generated results

## Security objective
The primary objective is to allow selected processing operations to occur locally without requiring the raw input payload to be transmitted to a remote processing service.

This is a data-flow property, not a universal confidentiality guarantee.

## In-scope threat

### Remote processing exposure
A conventional upload-based workflow may transmit raw user files to a remote server. The architecture evaluated here attempts to avoid this transmission for workloads that can be completed entirely within the client environment.

## Out-of-scope threats
The following are outside the primary scope:
* Compromised operating systems
* Malware
* Malicious browser extensions
* Compromised browsers
* Malicious dependencies
* Supply-chain attacks
* Malicious application code
* Browser implementation vulnerabilities
* Hardware attacks
* Side-channel attacks
* Physical device compromise
* Memory-forensics attacks

## Trust assumptions
The model assumes:
1. The user obtains the application from a trusted source.
2. The browser runtime has not been compromised.
3. The operating system is not controlled by an attacker.
4. Application dependencies have not been maliciously modified.
5. The application does not intentionally exfiltrate user data.

These assumptions are important because client-side execution does not automatically establish trust in the application itself.

## Network boundary
For a genuinely local-processing workflow, raw input data should not cross the network boundary.

However, applications may still make network requests for:
* application assets
* authentication
* updates
* telemetry
* analytics
* external APIs
* third-party resources

Therefore, network behavior must be verified at the application level.

## Security conclusion
The architecture can reduce exposure caused by unnecessary server-side ingestion of raw user data. It does not constitute a complete security guarantee. Any production implementation should perform an independent security review appropriate to its threat model and use case.

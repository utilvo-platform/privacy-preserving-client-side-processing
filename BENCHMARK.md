# Benchmark Methodology

## Purpose
The benchmark evaluates the latency implications of processing data locally compared with a modeled client-to-server-to-client workflow.

The purpose is to study the architectural effect of network transfer rather than to benchmark a particular cloud provider.

## Compared models

### Local model
```text
Input ──► Client processing ──► Result
```

### Remote model
```text
Input ──► Network upload ──► Remote processing ──► Network download ──► Result
```

## Important limitation
The remote workflow is modeled as an analytical simulation baseline.

It is not a measurement of a particular cloud provider, geographic region, server configuration, or production service.

Consequently, benchmark results must not be presented as universal claims about cloud computing performance.

## Variables
Relevant variables include:
* input size
* upload bandwidth
* network latency
* processing time
* browser/device performance
* server performance
* output size

## Reproduction
Run:
```bash
node benchmark.js
```

Record:
* Node.js version
* Operating system
* CPU
* RAM
* Input parameters
* Benchmark version

## Reporting
A benchmark result should be reported with its methodology.

**Preferred:**
> "Under the benchmark parameters used in this repository, the modeled client-side workflow avoided the modeled upload latency."

**Avoid:**
> "Client-side processing is 40× faster than cloud processing."

The second statement generalizes a workload-specific simulation into a universal performance claim.

## Future work
Future benchmark versions should evaluate:
* multiple browsers
* multiple CPUs
* mobile devices
* different network conditions
* cold vs warm browser execution
* WebAssembly vs JavaScript implementations
* memory consumption
* CPU utilization
* repeated trials
* confidence intervals
* real server-side reference implementations

Such measurements would provide a stronger basis for comparing local and remote architectures.

# Benchmark & Evaluation Reproducibility Guide

## 1. System Requirements & Testbed Hardware
To reproduce the experimental benchmarks reported in the research paper and repository, ensure the following hardware and software configuration:

- **Hardware Architecture**: x86_64 / ARM64 (Apple Silicon M-series or Intel Core i7 11th Gen+ / AMD Ryzen 7+).
- **RAM**: Minimum 16 GB DDR4/DDR5.
- **Browser Runtime Environment**: Google Chrome (v120+), Mozilla Firefox (v122+), or Safari (v17+).
- **Operating System**: macOS 14+, Ubuntu 22.04 LTS+, or Windows 11.

## 2. Experimental Setup & Benchmarking Methodology
- **Sample Size ($N$)**: All benchmark metrics represent the median of $N = 50$ execution runs per payload size.
- **Warmup Runs**: 5 unrecorded execution iterations are performed prior to timing to allow V8 JIT compilation and WebAssembly optimization.
- **Garbage Collection (GC)**: Forced GC or explicit heap clear between iterations where supported.

## 3. Step-by-Step Execution Protocol
1. Open `demo.html` in your local browser or serve via static HTTP server:
   ```bash
   npx serve .
   ```
2. Open Chrome Developer Tools (`F12`), navigate to the **Console** tab.
3. Execute `benchmark.js` in the browser console context.
4. Verify output log format:
   - Client Processing Time (ms)
   - Simulated Network Ingress Time (ms)
   - Latency Reduction Factor (%)

## 4. Analytical Metrics & Baseline Comparison
- **Client Latency ($T_{\text{client}}$)**: Measured using `performance.now()` microsecond timer.
- **Cloud Baseline ($T_{\text{cloud}}$)**: Calculated as $T_{\text{network\_upload}} + T_{\text{server\_compute}} + T_{\text{network\_download}}$.
- **Speedup Factor**: $\frac{T_{\text{cloud}}}{T_{\text{client}}}$.

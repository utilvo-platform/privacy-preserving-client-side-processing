/**
 * Client-Side Privacy & Processing Benchmarks (Academic Evaluation)
 * Utilvo Platform (https://utilvo.com)
 * 
 * Benchmark Specs: N=50 iterations, reporting mean, median, p95, and standard deviation.
 * License: MIT
 */

class ClientSideBenchmark {
  constructor(iterations = 50) {
    this.iterations = iterations;
    this.results = {};
  }

  calculateStats(durations) {
    const sorted = [...durations].sort((a, b) => a - b);
    const sum = sorted.reduce((acc, val) => acc + val, 0);
    const mean = sum / sorted.length;
    const median = sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
    const p95 = sorted[Math.floor(sorted.length * 0.95)];
    const variance = sorted.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / sorted.length;
    const stdDev = Math.sqrt(variance);

    return {
      iterations: sorted.length,
      meanMs: parseFloat(mean.toFixed(3)),
      medianMs: parseFloat(median.toFixed(3)),
      p95Ms: parseFloat(p95.toFixed(3)),
      stdDevMs: parseFloat(stdDev.toFixed(3)),
      minMs: parseFloat(sorted[0].toFixed(3)),
      maxMs: parseFloat(sorted[sorted.length - 1].toFixed(3))
    };
  }

  async runMemoryBenchmark() {
    const heapSupported = typeof performance !== 'undefined' && performance.memory;
    const startMemory = heapSupported ? performance.memory.usedJSHeapSize : 0;
    
    // Allocate 10MB TypedArray buffer
    const bufferSize = 10 * 1024 * 1024;
    const view = new Uint8Array(bufferSize);
    for (let i = 0; i < bufferSize; i += 4096) {
      view[i] = i & 0xff;
    }

    const endMemory = heapSupported ? performance.memory.usedJSHeapSize : 0;
    return {
      allocatedMB: 10,
      heapDeltaKB: heapSupported ? Math.round((endMemory - startMemory) / 1024) : 'N/A (Browser API restricted)'
    };
  }

  async runProcessingSpeedTest() {
    // 3 warm-up runs
    for (let w = 0; w < 3; w++) {
      let dummy = 0;
      for (let i = 0; i < 50000; i++) dummy += Math.sqrt(i);
    }

    const durations = [];
    const innerOps = 100000;

    for (let iter = 0; iter < this.iterations; iter++) {
      const t0 = performance.now();
      let sum = 0;
      for (let i = 0; i < innerOps; i++) {
        sum += Math.sqrt(i) * Math.sin(i);
      }
      const t1 = performance.now();
      durations.push(t1 - t0);
    }

    const stats = this.calculateStats(durations);
    stats.innerOpsPerIteration = innerOps;
    stats.totalOpsPerSec = Math.round((innerOps / stats.meanMs) * 1000);
    return stats;
  }

  async runAll() {
    console.log(`Starting client-side processing benchmarks (N=${this.iterations} iterations)...`);
    this.results.environment = {
      runtime: typeof window !== 'undefined' ? 'Browser DOM' : 'Node.js Engine',
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : `Node ${process.version}`,
      timestamp: new Date().toISOString()
    };
    this.results.memory = await this.runMemoryBenchmark();
    this.results.speed = await this.runProcessingSpeedTest();
    console.log("Benchmark Results:", JSON.stringify(this.results, null, 2));
    return this.results;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ClientSideBenchmark;
} else if (typeof window !== 'undefined') {
  window.ClientSideBenchmark = ClientSideBenchmark;
}

if (typeof require !== 'undefined' && require.main === module) {
  const bench = new ClientSideBenchmark(50);
  bench.runAll();
}

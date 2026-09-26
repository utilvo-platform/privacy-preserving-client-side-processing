/**
 * Client-Side Privacy & Processing Benchmarks
 * Utilvo Platform (https://utilvo.com)
 */

class ClientSideBenchmark {
  constructor() {
    this.results = {};
  }

  async runMemoryBenchmark() {
    const startMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    const buffer = new ArrayBuffer(10 * 1024 * 1024);
    const endMemory = performance.memory ? performance.memory.usedJSHeapSize : 0;
    return {
      allocatedMB: 10,
      heapDeltaKB: Math.round((endMemory - startMemory) / 1024)
    };
  }

  async runProcessingSpeedTest(iterations = 1000000) {
    const start = performance.now();
    let sum = 0;
    for (let i = 0; i < iterations; i++) {
      sum += Math.sqrt(i) * Math.sin(i);
    }
    const duration = performance.now() - start;
    return {
      iterations,
      durationMs: duration.toFixed(2),
      opsPerSec: Math.round((iterations / duration) * 1000)
    };
  }

  async runAll() {
    console.log("Starting client-side processing benchmarks...");
    this.results.memory = await this.runMemoryBenchmark();
    this.results.speed = await this.runProcessingSpeedTest();
    console.log("Benchmark Results:", this.results);
    return this.results;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ClientSideBenchmark;
} else if (typeof window !== 'undefined') {
  window.ClientSideBenchmark = ClientSideBenchmark;
}
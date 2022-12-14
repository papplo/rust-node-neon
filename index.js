const lib = require("./index.node");
const { performance, PerformanceObserver } = require("perf_hooks")
console.log('Starting call of functions!');

const perfObserver = new PerformanceObserver((items) => {
  items.getEntries().forEach((entry) => {
    console.log(entry)
  })
})

perfObserver.observe({ entryTypes: ["measure"], buffer: true })

// Loop over n amount and run lib script "stream" to calculate an array with 1000 random floats
performance.mark("example-start")

const res = []
for (let n =0; n < 30000;  n++) {
    res.push({
        x: Date.now(), y: lib.stream(10)
    })
};
performance.mark("example-end")
performance.measure("Rust-Neon stream() call", "example-start", "example-end")
const used = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);

// Loop over n amount and generate 1000 random floats;
performance.mark("example-2-start");
const resJs = [];
for (let n = 0; n < 30000; n++){
    const randomList = Array.from({length: 1000}).map((_, index) => Math.random() * index);
    resJs.push({
        x: Date.now(),
        y: randomList
    })
}
performance.mark('example-2-end');
performance.measure("NodeJS Vanilla call", "example-2-start", "example-2-end");
const used2 = process.memoryUsage().heapUsed / 1024 / 1024;
console.log(`The script uses approximately ${Math.round(used2 * 100) / 100} MB`);

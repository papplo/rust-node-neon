const { stream } = require("./index.node");
const { performance, PerformanceObserver } = require("perf_hooks");

new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry)
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    })
}).observe({ entryTypes: ["function"] })

// Loop over n amount and run lib script "stream" to calculate an array with 1000 random floats
async function lib(cycles = 30000) {
    const res = [];
    for (let n = 0; n < cycles; n++) {
        res.push({
            c: Date.now(),
            y: stream(10)
        })
    }
};

// Loop over n amount and generate 1000 random floats;
async function native(cycles = 30000) {
    const resJs = [];
    for (let n = 0; n < cycles; n++) {
        const randomList = Array.from({ length: 1000 }).map((_, index) => Math.random() * index);
        resJs.push({
            x: Date.now(),
            y: randomList
        })
    }
};

const runLib = performance.timerify(lib);
const runNative = performance.timerify(native);

console.log('Starting call of functions!');
runNative(30000);
runLib(30000);






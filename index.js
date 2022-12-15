const { stream } = require("./index.node");
const { performance, PerformanceObserver } = require("perf_hooks");

new PerformanceObserver((items) => {
    items.getEntries().forEach((entry) => {
        console.log(entry)
        const used = process.memoryUsage().heapUsed / 1024 / 1024;
        console.log(`The script uses approximately ${Math.round(used * 100) / 100} MB`);
    })
}).observe({ entryTypes: ["function"] })

// async function lib(cycles = 30000) {
//     const res = [];
//     for (let n = 0; n < cycles; n++) {
//         res.push({
//             c: Date.now(),
//             y: stream(10)
//         })
//     }
//     console.log(res)
// };

// Loop over items (15) float values and repeat with a time difference 1000/16ms for a length of ticks.
async function lib(items = 15 , ticks = 15) {
    stream(items, ticks)
    // console.log(stream(items, ticks))
}

// Loop over n amount and generate 1000 random floats;
async function native(items = 15, ticks = 15) {
    const resJs = [];
    for (let n = 0; n < ticks; n++) {
        const randomList = Array.from({ length: items }).map((_, index) => Math.random() * index);
        resJs.push({
            x: new Date(Date.now()).toISOString(),
            y: randomList
        })
    }
    console.log(resJs)
};

const runLib = performance.timerify(lib)
const runNative = performance.timerify(native);
console.log('Starting call of functions!');
runNative(1000, 2000);
// runLib(1000, 2000)






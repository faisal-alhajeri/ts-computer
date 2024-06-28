import { HackCliRunner } from "./cli";

const [_, __, fileName] = process.argv;

const runner = new HackCliRunner(fileName);

async function run() {
  // runner.machine.loadRAM({
  //   binary: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]],
  // });
  console.time("run");
  await runner.run({ rounds: 2000 });
  console.log({
    s: runner.machine.inspectRAM({ offset: 0, length: 4 }),
    sp1: runner.machine.inspectRAM({ offset: 256, length: 2 }),
  });
  console.timeEnd("run");
}

run();

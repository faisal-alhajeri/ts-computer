import { HackCliRunner } from "./cli";

const [_, __, fileName] = process.argv;

const runner = new HackCliRunner(fileName);

async function run() {
  // runner.machine.loadRAM({
  //   binary: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0]],
  // });
  await runner.run({ rounds: 100 });
  console.log({
    sp1: runner.machine.inspectRAM({ offset: 256 }),
    sp2: runner.machine.inspectRAM({ offset: 257 }),
    sp3: runner.machine.inspectRAM({ offset: 258 }),
    sp4: runner.machine.inspectRAM({ offset: 259 }),
    sp5: runner.machine.inspectRAM({ offset: 260 }),
    sp6: runner.machine.inspectRAM({ offset: 261 }),
  });
}

run();

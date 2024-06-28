import { HackCliRunner } from "../cli";

const [_, __, fileName] = process.argv;

const runner = new HackCliRunner(fileName);

function runSync() {
  console.time("runSync");
  runner.runSync({ rounds: 2000 });
  console.log({
    s: runner.machine.inspectRAM({ offset: 0, length: 4 }),
    sp1: runner.machine.inspectRAM({ offset: 256, length: 2 }),
  });
  console.timeEnd("runSync");
}

runSync();

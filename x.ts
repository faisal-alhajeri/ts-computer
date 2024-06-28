const rounds = 5000000;

function runSync() {
  console.time("sync");

  let i = 0;
  while (i < rounds) {
    const y = someSyncCalc(i);
    someSyncCalc(i);
    i++;
  }
  console.timeEnd("sync");
}

async function someSyncCalc(i: number) {
  const y = i + 2;
}

async function runAsync() {
  console.time("AAAsync");

  let i = 0;
  while (i < rounds) {
    const y = await someAsyncCalc(i);
    await someAsyncCalc(i);
    i++;
  }
  console.timeEnd("AAAsync");
}

async function someAsyncCalc(i: number) {
  const y = i + 2;
}
runAsync();
runSync();

import { CLI } from "./cli";
const [_, __, fileName] = process.argv;
console.log({ fileName });

const cli = new CLI(fileName);
cli.run();

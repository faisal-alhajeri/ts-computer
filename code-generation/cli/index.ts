import { CLI } from "./cli";
const [_, __, fileName] = process.argv;

const cli = new CLI(fileName);
cli.run();

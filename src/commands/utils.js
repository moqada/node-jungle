import chalk from 'chalk';

export function defaultOutputHelp(program) {
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

export function errorAndExit(error) {
  console.log(chalk.red(error));
  process.exit(1);
}

export function noCommandAndExit(name) {
  return cmd => {
    const msg = `${name}: '${cmd}' is not a ${name} command. See '${name} --help'.`;
    console.error(chalk.red(msg));
    process.exit(1);
  };
}

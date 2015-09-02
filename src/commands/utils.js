import chalk from 'chalk';


export const DEFAULT_TABLE_OPTIONS = {
  chars: {
    top: '', 'top-mid': '', 'top-left': '', 'top-right': '',
    bottom: '', 'bottom-mid': '', 'bottom-left': ' ', 'bottom-right': ' ',
    left: ' ', 'left-mid': '',
    mid: '-', 'mid-mid': ' ',
    right: '', 'right-mid': '',
    middle: ' '
  },
  style: {compact: true, head: ['gray'], 'padding-right': 0, 'padding-left': 0}
};


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

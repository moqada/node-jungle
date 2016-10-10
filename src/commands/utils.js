import chalk from 'chalk';


/* eslint-disable object-property-newline */
export const DEFAULT_TABLE_OPTIONS = {
  chars: {
    bottom: '', 'bottom-left': ' ', 'bottom-mid': '', 'bottom-right': ' ',
    left: ' ', 'left-mid': '',
    mid: '-', 'mid-mid': ' ',
    middle: ' ',
    right: '', 'right-mid': '',
    top: '', 'top-left': '', 'top-mid': '', 'top-right': ''
  },
  style: {compact: true, head: ['gray'], 'padding-left': 0, 'padding-right': 0}
};

/* eslint-enable */


/**
 * Output help
 *
 * @param {Object} program commander object
 */
export function defaultOutputHelp(program) {
  if (!process.argv.slice(2).length) {
    program.outputHelp();
  }
}

/**
 * Exit code 1 when raised error
 *
 * @param {Error|string} error error
 */
export function errorAndExit(error) {
  console.log(chalk.red(error));
  process.exit(1);
}

/**
 * Output error message when unknown sub commands
 *
 * @param {string} name sub command name
 * @return {Function}
 */
export function noCommandAndExit(name) {
  return cmd => {
    const msg = `${name}: '${cmd}' is not a ${name} command. See '${name} --help'.`;
    console.error(chalk.red(msg));
    process.exit(1);
  };
}

import chalk from 'chalk';
import Table from 'cli-table';
import program from 'commander';
import {
  DEFAULT_TABLE_OPTIONS,
  defaultOutputHelp,
  errorAndExit,
  noCommandAndExit
} from './utils';
import Jungle from '../';

const STATUS_STYLES = {
  RUNNING: chalk.green,
  STARTING: chalk.green,
  BOOTSTRAPPING: chalk.green,
  WAITING: chalk.green,
  TERMINATED_WITH_ERRORS: chalk.red,
  '*': chalk.gray.dim
};


/**
 * Colorized by state name
 *
 * @param {string} stateName state name
 * @return {string}
 */
function coloredStatus(stateName) {
  const statusStyle = STATUS_STYLES[stateName] || STATUS_STYLES['*'];
  return statusStyle(stateName);
}


program.option('-r, --region <name>', 'Region name');
program.action(noCommandAndExit('jungle emr'));

program.command('ls [name]')
.description('List Elastic Mapreduce Clusters')
.option('-t, --table', 'Table style output')
.action((name, options) => {
  const jungle = new Jungle({region: options.parent.region});
  jungle.emr.getClusters({name}).then(clusters => {
    const rows = clusters.map(e => {
      return [
        e.Name,
        e.Id,
        coloredStatus(e.Status.State)
      ];
    });
    if (options.table) {
      const table = new Table(Object.assign({
        head: ['Name', 'Id', 'Status']
      }, DEFAULT_TABLE_OPTIONS));
      table.push(...rows);
      console.log(table.toString());
    } else {
      rows.forEach(row => console.log(row.join('\t')));
    }
  }).catch(errorAndExit);
});

program.parse(process.argv);
defaultOutputHelp(program);

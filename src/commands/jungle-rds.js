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
  available: chalk.green,
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
program.action(noCommandAndExit('jungle rds'));

program.command('ls [name]')
.description('List RDS DB Instances')
.option('-t, --table', 'Table style output')
.action((name, options) => {
  const jungle = new Jungle({region: options.parent.region});
  jungle.rds.getInstances({name}).then(instances => {
    const rows = instances.map(i => {
      return [
        i.DBInstanceIdentifier,
        coloredStatus(i.DBInstanceStatus),
        i.Engine,
        i.DBInstanceClass,
        i.DBSubnetGroup.DBSubnetGroupName
      ];
    });
    if (options.table) {
      const table = new Table(Object.assign({
        head: ['Identifier', 'State', 'Engine', 'Class', 'Subnet']
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

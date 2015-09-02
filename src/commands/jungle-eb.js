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
  Green: chalk.green,
  '*': chalk.gray.dim
};


function coloredStatus(stateName) {
  const statusStyle = STATUS_STYLES[stateName] || STATUS_STYLES['*'];
  return statusStyle(stateName);
}


program.option('-r, --region <name>', 'Region name');
program.action(noCommandAndExit('jungle eb'));

program.command('ls [name]')
.description('List ElasticBeanstalk Environments')
.option('-t, --table', 'Table style output')
.action((name, options) => {
  const jungle = new Jungle({region: options.parent.region});
  jungle.eb.getEnvironments({name}).then(environments => {
    const rows = environments.map(e => {
      return [
        e.EnvironmentName,
        e.ApplicationName,
        coloredStatus(e.Health),
        e.CNAME
      ];
    });
    if (options.table) {
      const table = new Table(Object.assign({
        head: ['Name', 'App', 'Health', 'CNAME']
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

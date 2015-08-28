import chalk from 'chalk';
import Table from 'cli-table';
import debugModule from 'debug';
import program from 'commander';
import {defaultOutputHelp, errorAndExit, noCommandAndExit} from './utils';
import Jungle from '../';
import {getTagValue} from '../utils';

const debug = debugModule('jungle:cli');

const DEFAULT_TABLE_OPTIONS = {
  chars: {
    top: '', 'top-mid': '', 'top-left': '', 'top-right': '',
    bottom: '', 'bottom-mid': '', 'bottom-left': ' ', 'bottom-right': ' ',
    left: ' ', 'left-mid': '',
    mid: '-', 'mid-mid': '+',
    right: '', 'right-mid': '',
    middle: '|'
  },
  style: {compact: true, head: ['gray']}
};

const STATUS_STYLES = {
  stopped: chalk.red,
  running: chalk.green,
  '*': chalk.gray.dim
};


function coloredStatus(stateName) {
  const statusStyle = STATUS_STYLES[stateName] || STATUS_STYLES['*'];
  return statusStyle(stateName);
}


program.option('-r, --region <name>', 'Region name');
program.action(noCommandAndExit('jungle ec2'));

program.command('ls [name]')
.description('List EC2 Instances')
.option('-t, --table', 'Table style output')
.action((name, options) => {
  const jungle = new Jungle(options.parent.region);
  jungle.ec2.getInstances(name).then(instances => {
    const rows = instances.map(i => {
      return [
        getTagValue(i.Tags, 'Name') || '',
        coloredStatus(i.State.Name),
        i.InstanceId,
        i.PrivateIpAddress || '',
        i.PublicIpAddress || ''
      ];
    });
    if (options.table) {
      const table = new Table(Object.assign({
        head: ['Name', 'State', 'InstanceId', 'PrivateIp', 'PublicIp']
      }, DEFAULT_TABLE_OPTIONS));
      table.push(...rows);
      console.log(table.toString());
    } else {
      rows.forEach(row => console.log(row.join('\t')));
    }
  }).catch(errorAndExit);
});

program.command('up <instanceId>')
.description('Start EC2 instance')
.option('--dry-run', 'dryrun')
.action((instanceId, options) => {
  debug(instanceId);
  debug(options.opts());
  const jungle = new Jungle(options.parent.region);
  jungle.ec2.startInstances([instanceId], options.dryRun).then(result => {
    const ids = result.Instances.map(i => i.InstanceId);
    debug(`starting ${ids.join(', ')}...`);
  }).catch(errorAndExit);
});

program.command('down <instanceId>')
.description('Stop EC2 instance')
.option('--dry-run', 'dryrun')
.action((instanceId, options) => {
  debug(instanceId);
  debug(options.opts());
  const jungle = new Jungle(options.parent.region);
  jungle.ec2.stopInstances([instanceId], options.dryRun).then(result => {
    const ids = result.Instances.map(i => i.InstanceId);
    debug(`starting ${ids.join(', ')}...`);
  }).catch(errorAndExit);
});

program.parse(process.argv);
defaultOutputHelp(program);

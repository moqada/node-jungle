import chalk from 'chalk';
import debugModule from 'debug';
import program from 'commander';
import {defaultOutputHelp, errorAndExit, noCommandAndExit} from './utils';
import Jungle from '../';
import {getTagValue} from '../utils';

const debug = debugModule('jungle:cli');


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
.action((name, options) => {
  const jungle = new Jungle(options.parent.region);
  jungle.ec2.getInstances(name).then(instances => {
    instances.forEach(i => {
      const cols = [
        getTagValue(i.Tags, 'Name') || null,
        coloredStatus(i.State.Name),
        i.InstanceId,
        i.PrivateIpAddress || null,
        i.PublicIpAddress || null
      ];
      console.log(cols.join('\t'));
    });
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

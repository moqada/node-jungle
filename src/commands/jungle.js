import program from 'commander';
import pkg from '../../package.json';
import {defaultOutputHelp} from './utils';


program
.version(pkg.version)
.description('AWS operation CLI');

program.command('ec2', 'EC2 Group');
program.command('elb', 'ELB Group');

program.parse(process.argv);
defaultOutputHelp(program);

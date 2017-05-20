# node-jungle

[![Greenkeeper badge](https://badges.greenkeeper.io/moqada/node-jungle.svg)](https://greenkeeper.io/)

[![NPM version][npm-image]][npm-url]
[![NPM downloads][npm-download-image]][npm-download-url]
[![Build Status][travis-image]][travis-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![DevDependency Status][daviddm-dev-image]][daviddm-dev-url]
[![License][license-image]][license-url]

node.js port of [jungle](https://github.com/achiku/jungle)


## Installation

```
npm install -g node-jungle
```

## Configuration

You can create the credential file yourself. By default, its location is at `~/.aws/credentials`

```
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
```

You may also want to set a default region. This can be done in the configuration file. By default, its location is at `~/.aws/config`

```
[default]
region = us-east-1
```


## Usage

### EC2

Listing all EC2 instances

```
jungle ec2 ls
```

Filtering EC2 instances by Name tag

```
jungle ec2 ls blog-web-server-01
```

Filtering EC2 instances by Name tag using wildcard

```
jungle ec2 ls '*web*'
```

Listing EC2 instances and output table style

```
jungle ec2 ls -t
```

Starting instance

```
jungle ec2 up i-xxxxxx
```

Stopping instance

```
jungle ec2 down i-xxxxxx
```


### Elastic Beanstalk

Listing all Elastic Beanstalk environments

```
jungle eb ls
```

`jungle eb ls` has same options as `jungle ec2 ls`.
But, filtering target is EnvironmentName. 


### Elastic MapReduce

Listing all Elastic MapReduce Clusters

```
jungle emr ls
```

`jungle emr ls` has same options as `jungle ec2 ls`.
But, filtering target is Name.


### RDS

Listing all RDS instances

```
jungle rds ls
```

`jungle rds ls` has same options as `jungle ec2 ls`.
But, filtering target is DB Indentifier.


## Todo

- [ ] Add ec2 ssh command
- [ ] Add ELB Sub commands
- [ ] Refactor Internal libs
- [x] Add docs (#17)
- [ ] Add tests
- [ ] Replace command to `jg` from `jungle`
- [ ] Add update-notifier


[npm-url]: https://www.npmjs.com/package/node-jungle
[npm-image]: https://img.shields.io/npm/v/node-jungle.svg?style=flat-square
[npm-download-url]: https://www.npmjs.com/package/node-jungle
[npm-download-image]: https://img.shields.io/npm/dt/node-jungle.svg?style=flat-square
[travis-url]: https://travis-ci.org/moqada/node-jungle
[travis-image]: https://img.shields.io/travis/moqada/node-jungle.svg?style=flat-square
[daviddm-url]: https://david-dm.org/moqada/node-jungle
[daviddm-image]: https://img.shields.io/david/moqada/node-jungle.svg?style=flat-square
[daviddm-dev-url]: https://david-dm.org/moqada/node-jungle#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/node-jungle.svg?style=flat-square
[license-url]: http://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/node-jungle.svg?style=flat-square

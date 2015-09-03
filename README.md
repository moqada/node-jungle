# node-jungle

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

Starting instance

```
jungle ec2 up i-xxxxxx
```

Stopping instance

```
jungle ec2 down i-xxxxxx
```


## Configuration

You can create the credential file yourself. By default, its location is at `~/.aws/credentials`

```
[default]
aws_access_key_id = YOUR_ACCESS_KEY
aws_secret_access_key = YOUR_SECRET_KEY
```

You should be set specific region by [aws-sdk-js](https://github.com/aws/aws-sdk-js) restriction. You cannot use `~/.aws/config`.

Environment variables:

```
export AWS_REGION=ap-northeast-1
```

Or

`--region` or `-r` option per commands:

```
jungle ec2 ls --region=ap-northeast-1
```


[npm-url]: https://www.npmjs.com/package/node-jungle
[npm-image]: https://img.shields.io/npm/v/node-jungle.svg
[npm-download-url]: https://www.npmjs.com/package/node-jungle
[npm-download-image]: https://img.shields.io/npm/dm/node-jungle.svg
[travis-url]: https://travis-ci.org/moqada/node-jungle
[travis-image]: https://img.shields.io/travis/moqada/node-jungle.svg
[daviddm-url]: https://david-dm.org/moqada/node-jungle
[daviddm-image]: https://img.shields.io/david/moqada/node-jungle.svg
[daviddm-dev-url]: https://david-dm.org/moqada/node-jungle#info=devDependencies
[daviddm-dev-image]: https://img.shields.io/david/dev/moqada/node-jungle.svg
[license-url]: http://opensource.org/licenses/MIT
[license-image]: https://img.shields.io/npm/l/node-jungle.svg

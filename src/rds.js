import AWS from 'aws-sdk';
import debugModule from 'debug';
import minimatch from 'minimatch';

const debug = debugModule('jungle:lib');

export default class RDS {
  constructor(opts = {}) {
    this._sdk = new AWS.RDS(opts);
  }

  getInstances({name, rawFilters} = {}) {
    const params = rawFilters || [];
    debug('params', params);
    return new Promise((resolve, reject) => {
      this._sdk.describeDBInstances(params, (err, response) => {
        debug(err);
        debug(response);
        if (err) {
          reject(err);
        } else if (name) {
          resolve(response.DBInstances.filter(i => {
            return minimatch(i.DBInstanceIdentifier, name, {
              nobrace: true,
              noglobstar: true,
              noext: true
            });
          }));
        } else {
          resolve(response.DBInstances);
        }
      });
    });
  }
}

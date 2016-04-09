import debugModule from 'debug';
import minimatch from 'minimatch';
import Service from './service';

const debug = debugModule('jungle:lib');


/**
 * RDS
 */
export default class RDS extends Service {

  /**
   * Return Instance list
   *
   * @param {Object} [opts] Options
   * @param {string} [opts.name] name for filter
   * @param {Object} [opts.rawFilters] filter
   * @return {Promise}
   */
  getInstances(opts = {}) {
    const {name, rawFilters} = opts;
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

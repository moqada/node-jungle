import debugModule from 'debug';
import {filterObjects} from './utils';
import Service from './service';

const debug = debugModule('jungle:lib');


/**
 * ElasticBeanstalk
 */
export default class EB extends Service {

  /**
   * SDK name
   *
   * @return {string}
   */
  static get SDKName() {
    return 'ElasticBeanstalk';
  }

  /**
   * Return Application list
   *
   * @param {Object} [opts] Options
   * @param {string} [opts.name] application name
   * @param {Object} [opts.rawFilters] filter for params
   * @return {Promise}
   */
  getApplications(opts = {}) {
    const {name, rawFilters} = opts;
    const params = rawFilters || {};
    debug('params', params);
    return new Promise((resolve, reject) => {
      this._sdk.describeApplications(params, (err, response) => {
        debug(err);
        debug(response);
        if (err) {
          reject(err);
        } else {
          resolve(filterObjects([
            {key: 'ApplicationName', query: name}
          ], response.Applications));
        }
      });
    });
  }

  /**
   * Return Environment list
   *
   * @param {Object} [opts] Options
   * @param {string} [opts.name] environment name
   * @param {string} [opts.appName] application name
   * @param {string} [opts.cname] cname
   * @param {Object} [opts.rawFilters] filter for params
   * @return {Promise}
   */
  getEnvironments(opts = {}) {
    const {name, appName, cname, rawFilters} = opts;
    const params = rawFilters || {};
    return new Promise((resolve, reject) => {
      this._sdk.describeEnvironments(params, (err, response) => {
        debug(err);
        debug(response);
        if (err) {
          reject(err);
        } else {
          resolve(filterObjects([
            {key: 'EnvironmentName', query: name},
            {key: 'ApplicationName', query: appName},
            {key: 'CNAME', query: cname}
          ], response.Environments));
        }
      });
    });
  }
}

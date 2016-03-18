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
   * @param {string} [name] application name
   * @param {Object} [rawFilters] filter for params
   * @return {Promise}
   */
  getApplications({name, rawFilters} = {}) {
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
   * @param {string} [name] environment name
   * @param {string} [appName] application name
   * @param {string} [cname] cname
   * @param {Object} [rawFilters] filter for params
   * @return {Promise}
   */
  getEnvironments({name, appName, cname, rawFilters} = {}) {
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

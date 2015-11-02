import debugModule from 'debug';
import {filterObjects} from './utils';
import Service from './service';

const debug = debugModule('jungle:lib');


/**
 * Elastic MapReduce
 */
export default class EMR extends Service {

  /**
   * Parse param options
   *
   * @param {string} stateName state name
   * @param {Object} rawParams params
   * @return {Object}
   */
  parseParamOptions(stateName, rawParams) {
    let params = {};
    if (stateName) {
      params.ClusterStates = Array.isArray(stateName) ? stateName : [stateName];
    }
    if (rawParams) {
      params = Object.assign(params, rawParams);
    }
    return params;
  }

  /**
   * Return Cluster list
   *
   * @param {string} [name] name for filter
   * @param {string} [stateName] state for filter
   * @param {Object} [rawParams] options
   * @return {Promise}
   */
  getClusters({name, stateName, rawParams} = {}) {
    const params = this.parseParamOptions(stateName, rawParams);
    debug('params', params);
    return new Promise((resolve, reject) => {
      this._sdk.listClusters(params, (err, response) => {
        debug(err);
        debug(response);
        if (err) {
          reject(err);
        } else {
          resolve(filterObjects([
            {key: 'Name', query: name}
          ], response.Clusters));
        }
      });
    });
  }
}

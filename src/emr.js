import debugModule from 'debug';
import {filterObjects} from './utils';
import Service from './service';

const debug = debugModule('jungle:lib');


export default class EMR extends Service {

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

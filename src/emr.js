import debugModule from 'debug';
import {filterObjects} from './utils';
import Service from './service';

const debug = debugModule('jungle:lib');


export default class EMR extends Service {

  getClusters({name, rawFilters} = {}) {
    const params = rawFilters || {};
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

import debugModule from 'debug';
import {filterObjects} from './utils';
import Service from './service';

const debug = debugModule('jungle:lib');


export default class EB extends Service {

  static get SDKName() {
    return 'ElasticBeanstalk';
  }

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

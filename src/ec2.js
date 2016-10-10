import debugModule from 'debug';
import Service from './service';

const debug = debugModule('jungle:lib');


/**
 * EC2
 */
export default class EC2 extends Service {

  /**
   * Parse filter options
   *
   * @param {string} name name for filter
   * @param {string} stateName state for filter
   * @param {Object} rawFilters filter
   * @return {Object[]}
   */
  static parseFilterOptions(name, stateName, rawFilters) {
    let filters = [];
    if (name) {
      filters.push({
        Name: 'tag:Name',
        Values: Array.isArray(name) ? name : [name]
      });
    }
    if (stateName) {
      filters.push({
        Name: 'instance-state-name',
        Values: Array.isArray(stateName) ? stateName : [stateName]
      });
    }
    if (rawFilters) {
      filters = filters.concat(rawFilters);
    }
    return filters;
  }

  /**
   * Return Instance list
   *
   * @param {string} [name] name for filter
   * @param {string} [stateName] state for filter
   * @param {Object} [rawFilters] filter
   * @return {Promise}
   */
  getInstances({name, stateName, rawFilters}) {
    const Filters = this.parseFilterOptions(name, stateName, rawFilters);
    const params = Filters.length > 0 ? {Filters} : [];
    debug('params', params);
    return new Promise((resolve, reject) => {
      this._sdk.describeInstances(params, (err, response) => {
        debug(err);
        debug(response);
        if (err) {
          reject(err);
        } else {
          resolve(response.Reservations.reduce((prev, reservation) => {
            return prev.concat(reservation.Instances);
          }, []));
        }
      });
    });
  }

  /**
   * Start instance
   *
   * @param {string[]} instanceIds instance id list
   * @param {boolean} [dryRun] flag for dryRun
   * @return {Promise}
   */
  startInstances(instanceIds, dryRun = false) {
    return new Promise((resolve, reject) => {
      const params = {
        DryRun: dryRun,
        InstanceIds: instanceIds
      };
      this._sdk.startInstances(params, (err, response) => {
        debug(err);
        debug(response);
        if (err) {
          if (err.code === 'DryRunOperation') {
            resolve({
              Instances: instanceIds.map(id => {
                return {
                  CurrentState: {},
                  InstanceId: id,
                  PreviousState: {}
                };
              }),
              dryRun: true
            });
          } else {
            reject(err);
          }
        } else {
          resolve({
            Instances: response.StartingInstances,
            dryRun: false
          });
        }
      });
    });
  }

  /**
   * Stop instance
   *
   * @param {string[]} instanceIds instance id list
   * @param {boolean} [dryRun] flag for dryRun
   * @return {Promise}
   */
  stopInstances(instanceIds, dryRun = false) {
    debug(instanceIds);
    return new Promise((resolve, reject) => {
      const params = {
        DryRun: dryRun,
        InstanceIds: instanceIds
      };
      this._sdk.stopInstances(params, (err, response) => {
        debug(err);
        debug(response);
        if (err) {
          if (err.code === 'DryRunOperation') {
            resolve({
              Instances: instanceIds.map(id => {
                return {
                  CurrentState: {},
                  InstanceId: id,
                  PreviousState: {}
                };
              }),
              dryRun: true
            });
          } else {
            reject(err);
          }
        } else {
          resolve({
            Instances: response.StoppingInstances,
            dryRun: false
          });
        }
      });
    });
  }
}

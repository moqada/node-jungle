import AWS from 'aws-sdk';
import debugModule from 'debug';

const debug = debugModule('jungle:lib');


export default class EC2 {

  constructor(opts = {}) {
    this._sdk = new AWS.EC2(opts);
  }

  parseFilterOptions(name, stateName, rawFilters) {
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

  startInstances(instanceIds, dryRun = false) {
    return new Promise((resolve, reject) => {
      const params = {
        InstanceIds: instanceIds,
        DryRun: dryRun
      };
      this._sdk.startInstances(params, (err, response) => {
        debug(err);
        debug(response);
        if (err) {
          if (err.code === 'DryRunOperation') {
            resolve({
              Instances: instanceIds.map(id => {
                return {
                  InstanceId: id,
                  CurrentState: {},
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

  stopInstances(instanceIds, dryRun = false) {
    debug(instanceIds);
    return new Promise((resolve, reject) => {
      const params = {
        InstanceIds: instanceIds,
        DryRun: dryRun
      };
      this._sdk.stopInstances(params, (err, response) => {
        debug(err);
        debug(response);
        if (err) {
          if (err.code === 'DryRunOperation') {
            resolve({
              Instances: instanceIds.map(id => {
                return {
                  InstanceId: id,
                  CurrentState: {},
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

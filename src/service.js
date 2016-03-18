import AWS from 'aws-sdk';


/**
 * Service
 */
export default class Service {
  /**
   * Constructor
   *
   * @param {Object} [opts={}] - Options
   */
  constructor(opts = {}) {
    const sdkName = this.constructor.SDKName || this.constructor.name;
    this._sdk = new AWS[sdkName](opts);
  }
}

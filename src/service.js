import AWS from 'aws-sdk';


export default class Service {
  constructor(opts = {}) {
    const sdkName = this.constructor.SDKName || this.constructor.name;
    this._sdk = new AWS[sdkName](opts);
  }
}

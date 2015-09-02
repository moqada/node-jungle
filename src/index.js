import EB from './eb';
import EC2 from './ec2';
import RDS from './rds';


export default class Jungle {

  constructor(sdkCommonOpts = {}) {
    this.sdkCommonOpts = sdkCommonOpts;
  }

  get eb() {
    if (!this._eb) {
      this._eb = new EB(this.sdkCommonOpts);
    }
    return this._eb;
  }

  get ec2() {
    if (!this._ec2) {
      this._ec2 = new EC2(this.sdkCommonOpts);
    }
    return this._ec2;
  }

  get rds() {
    if (!this._rds) {
      this._rds = new RDS(this.sdkCommonOpts);
    }
    return this._rds;
  }
}

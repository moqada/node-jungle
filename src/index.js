import EC2 from './ec2';
import RDS from './rds';


export default class Jungle {

  constructor({accessKeyId, secretAccessKey, region} = {}) {
    this.region = region;
    this.accessKeyId = accessKeyId;
    this.secretAccessKey = secretAccessKey;
  }

  get ec2() {
    if (!this._ec2) {
      this._ec2 = new EC2({
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        region: this.region
      });
    }
    return this._ec2;
  }

  get rds() {
    if (!this._rds) {
      this._rds = new RDS({
        accessKeyId: this.accessKeyId,
        secretAccessKey: this.secretAccessKey,
        region: this.region
      });
    }
    return this._rds;
  }
}

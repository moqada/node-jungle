import EC2 from './ec2';


export default class Jungle {

  constructor(region) {
    this.region = region;
  }

  get ec2() {
    if (!this._ec2) {
      this._ec2 = new EC2(this.region);
    }
    return this._ec2;
  }
}

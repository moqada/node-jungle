import AWS from 'aws-sdk';
import loader from 'aws-sdk-config-loader';

import EB from './eb';
import EC2 from './ec2';
import EMR from './emr';
import RDS from './rds';

loader(AWS);


/**
 * Jungle
 */
export default class Jungle {

  /**
   * Constructor
   *
   * @param {Object} [sdkCommonOpts={}] - Options
   */
  constructor(sdkCommonOpts = {}) {
    this.sdkCommonOpts = sdkCommonOpts;
  }

  /**
   * ElasticBeanstalk
   *
   * @return {EB}
   */
  get eb() {
    if (!this._eb) {
      this._eb = new EB(this.sdkCommonOpts);
    }
    return this._eb;
  }

  /**
   * EC2
   *
   * @return {EC2}
   */
  get ec2() {
    if (!this._ec2) {
      this._ec2 = new EC2(this.sdkCommonOpts);
    }
    return this._ec2;
  }

  /**
   * EMR
   *
   * @return {EMR}
   */
  get emr() {
    if (!this._emr) {
      this._emr = new EMR(this.sdkCommonOpts);
    }
    return this._emr;
  }

  /**
   * RDS
   *
   * @return {RDS}
   */
  get rds() {
    if (!this._rds) {
      this._rds = new RDS(this.sdkCommonOpts);
    }
    return this._rds;
  }
}

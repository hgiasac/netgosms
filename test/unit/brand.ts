import { expect } from 'chai';
import 'mocha';
import { NetGoSMSClient } from '../../src';

// tslint:disable
describe('Test NetGo SMS client', () => {

  it('Test negative send brand', (done) => {

    const client = NetGoSMSClient({

      username: 'test',
      password: 'test',
    });

    const params = {
      phoneNumber: '0901000000',
      message: 'Test message',
      brand: 'Test'
    };

    client.sendBrand(params).catch((err) => {
      expect(err.errors.length).to.equal(1);
      expect(err.errors[0].code).to.equal('-1');
      done();
    });
  });

});

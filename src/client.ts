import * as Joi from 'joi';
import { createClient } from 'soap';
import { BrandRequestSchema, SettingSchema } from './schema';

import { BrandRequest, IBrandRequestInput, ISMSClientSetting } from './model';
const errorResources = require('../resources/error');

export interface INetGoSMSClient {
  sendBrand: (params: IBrandRequestInput) => Promise<number>;
}

export function NetGoSMSClient(settings: ISMSClientSetting): INetGoSMSClient {

  const validateResult = Joi.validate(settings, SettingSchema, { abortEarly: false });

  if (validateResult.error) {
    throw validateResult.error;
  }

  const options = <ISMSClientSetting> validateResult.value;
  options.url = options.url || 'http://gws.netgo.vn/service1.asmx?WSDL';

  function sendBrand(params: IBrandRequestInput): Promise<number> {

    return new Promise((resolve, reject) => {

    params.username = params.username || options.username;
    params.password = params.password || options.password;
    params.brand = params.brand || options.brand;

    return Joi.validate(params, BrandRequestSchema, { abortEarly: false }, (validateError, value) => {

        if (validateError) {
          return reject(validateError);
        }

        createClient(options.url, {}, (err, client) => {

          if (err) {
            return reject(err);
          }

          const model = BrandRequest(value);

          (<any> client).doSendBrand(model, (err, result) => {
            if (err) {
              return reject(err);
            }

            const code = result.doSendBrandResult;

            if (code < 0) {
              const message = errorResources[code.toString()] || 'Unknown error';
              // send request failed, return error
              return reject({
                errors: [{
                  code,
                  message,
                }]
              });
            }

            return resolve(code);
          });
        });
      });
  });
  }

  return {
    sendBrand,
  };
}

import * as Joi from 'joi';

export const SettingSchema = Joi.object({
  url: Joi.string().allow(['', null]),
  username: Joi.string().required(),
  password: Joi.string().required(),
  brand: Joi.string()
});

export const BrandRequestSchema = Joi.object({
  phoneNumber: Joi.string().required().regex(/^[0-9]{10,15}$/),
  message: Joi.string().required().min(5).max(442),
  brand: Joi.string().min(2).max(11),
  typeUrl: Joi.boolean(),
  realtime: Joi.boolean(),
  username: Joi.string().required(),
  password: Joi.string().required()
});

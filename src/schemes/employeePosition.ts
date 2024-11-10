import Joi from 'joi';

export const positionIdSchema = Joi.object({
  positionId: Joi.number().integer().positive().required(),
});

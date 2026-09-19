import { celebrate, Joi } from 'celebrate';

const validateProductBody = celebrate({
  body: Joi.object().keys({
    title: Joi.string().min(2).max(30).required(),
    description: Joi.string().required(),
    image: Joi.object().keys({
      fileName: Joi.string().required(),
      originalName: Joi.string().required(),
    }),
    category: Joi.string().required(),
    price: Joi.number().allow(null),
  }),
});

export default validateProductBody;

import { celebrate, Joi } from 'celebrate';

const validateOrderBody = celebrate({
  body: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().items(Joi.object().keys({
      title: Joi.string().min(2).max(30).required(),
      image: Joi.object().keys({
        fileName: Joi.string().required(),
        originalName: Joi.string().required(),
      }),
      category: Joi.string().required(),
      description: Joi.string().required(),
      price: Joi.number().allow(null),
    }).min(1).required()),
  }),
});

export default validateOrderBody;

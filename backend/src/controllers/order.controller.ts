import { Request, Response, NextFunction } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product.model';
import BadRequestError from '../errors/bad-request-error';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const { total, items } = req.body;

  return Product.find({ _id: { $in: items } })
    .then((products) => {
      if (products.length !== items.length) {
        return next(new BadRequestError('Товары не найдены'));
      }

      const hasUnavailable = products.some((item) => !item.price);
      if (hasUnavailable) {
        return next(new BadRequestError('Товары не продаются'));
      }

      const sum = products.reduce((acc, item) => acc + (item.price ?? 0), 0);
      if (sum !== total) {
        return next(new BadRequestError('Сумма заказа неверная'));
      }

      return res.send({
        id: faker.string.uuid(),
        total: sum,
      });
    })
    .catch(next);
};

export default createOrder;

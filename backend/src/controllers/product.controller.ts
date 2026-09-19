import { Request, Response, NextFunction } from 'express';
import { Error as MongooseError } from 'mongoose';
import Product from '../models/product.model';
import ConflictError from '../errors/conflict-error';
import BadRequestError from '../errors/bad-request-error';

const createProduct = (req: Request, res: Response, next: NextFunction) => {
  const {
    title,
    description,
    image,
    category,
    price,
  } = req.body;

  return Product.create({
    title,
    description,
    image,
    category,
    price,
  })
    .then((product) => res.status(201).send(product))
    .catch((err) => {
      if (err instanceof Error && err.message.includes('E11000')) {
        return next(
          new ConflictError('Товар с таким названием уже существует'),
        );
      }
      if (err instanceof MongooseError.ValidationError) {
        return next(new BadRequestError(err.message));
      }
      return next(err);
    });
};

export default createProduct;

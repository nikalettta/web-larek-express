import express, { Request, Response } from 'express';
import Product from '../models/product.model';
import createProduct from '../controllers/product.controller';
import validateProductBody from '../validators/product.validator';

const productRouter = express.Router();

productRouter.get('/', (_req: Request, res: Response) => {
  Product.find({})
    .then((products) => res.send({ items: products, total: products.length }))
    .catch((err) => res.status(400).send({ message: err.message }));
});

productRouter.post('/', validateProductBody, createProduct);

export default productRouter;

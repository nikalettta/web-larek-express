import express from 'express';
import { createProduct, getAllProducts } from '../controllers/product.controller';
import validateProductBody from '../validators/product.validator';

const productRouter = express.Router();

productRouter.get('/', getAllProducts);

productRouter.post('/', validateProductBody, createProduct);

export default productRouter;

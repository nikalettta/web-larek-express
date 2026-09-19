import express from 'express';
import createOrder from '../controllers/order.controller';
import validateOrderBody from '../validators/order.validator';

const orderRouter = express.Router();

orderRouter.post('/', validateOrderBody, createOrder);

export default orderRouter;

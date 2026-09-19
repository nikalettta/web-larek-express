import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import { PORT, DB_ADDRESS } from './config';
import productRouter from './routes/product.routes';
import orderRouter from './routes/order.routes';
import errorHandler from './middlewares/error-handler';
import notFoundHandler from './middlewares/not-found';
import { requestLogger, errorLogger } from './middlewares/logger';

const app = express();
app.use(cors());
app.use(express.json());
mongoose.connect(DB_ADDRESS)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

app.use(express.static(path.join(__dirname, 'public')));

app.use(requestLogger);

app.use('/product', productRouter);
app.use('/order', orderRouter);

app.use(errorLogger);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});

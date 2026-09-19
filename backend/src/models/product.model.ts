import mongoose from 'mongoose';

interface IProduct {
  title: string,
  image: { fileName: string, originalName: string; },
  category: string,
  description: string,
  price: number | null,
}

const productSchema = new mongoose.Schema<IProduct>({
  title: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
    unique: true,
  },
  image: {
    fileName: {
      type: String,
      require: true,
    },
    originalName: {
      type: String,
      require: true,
    },
  },
  category: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    required: false,
  },
  price: {
    type: Number,
    required: false,
    default: null,
  },
});

export default mongoose.model<IProduct>('product', productSchema);

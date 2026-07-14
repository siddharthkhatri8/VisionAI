import { Product } from "./product.model.js";

export const createProduct = async (
  payload: any,
  userId: string
) => {
  // Check if SKU already exists
  const existingProduct = await Product.findOne({
    sku: payload.sku,
  });

  if (existingProduct) {
    throw new Error("SKU already exists");
  }

  return await Product.create({
    ...payload,
    createdBy: userId,
  });
};

export const getProducts = async () => {
  return await Product.find({
    isActive: true,
  }).sort({
    createdAt: -1,
  });
};
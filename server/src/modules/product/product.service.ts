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

export const getProducts = async (
  search?: string,
  page: number = 1,
  limit: number = 10
) => {
  const query: any = {
    isActive: true,
  };

  if (search) {
    query.$or = [
      {
        name: {
          $regex: search,
          $options: "i",
        },
      },
      {
        brand: {
          $regex: search,
          $options: "i",
        },
      },
      {
        sku: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  const skip = (page - 1) * limit;

  const products = await Product.find(query)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Product.countDocuments(query);

  return {
    products,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

export const getProductById = async (
  id: string
) => {
  return await Product.findById(id);
};

export const updateProduct = async (
  id: string,
  payload: any
) => {
  return await Product.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
    }
  );
};

export const deleteProduct = async (
  id: string
) => {
  return await Product.findByIdAndUpdate(
    id,
    {
      isActive: false,
    },
    {
      new: true,
    }
  );
};

export const getLowStockProducts = async () => {
  return await Product.find({
    isActive: true,
    $expr: {
      $lte: ["$stock", "$minimumStock"],
    },
  });
};
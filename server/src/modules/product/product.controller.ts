import { Request, Response } from "express";
import { createProduct } from "./product.service.js";
import { getProducts, getProductById, updateProduct, deleteProduct, getLowStockProducts, } from "./product.service.js";

export const addProduct = async (
  req: Request,
  res: Response
) => {
  try {
    const product = await createProduct(
      req.body,
      req.user!.id
    );

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message:
        error instanceof Error
          ? error.message
          : "Something went wrong",
    });
  }
};

export const getAllProducts = async (
  req: Request,
  res: Response
) => {
  const page = Number(req.query.page) || 1;

  const limit = Number(req.query.limit) || 10;

  const search = req.query.search as string;

  const data = await getProducts(
    search,
    page,
    limit
  );

  res.json({
    success: true,
    ...data,
  });
};

export const getProduct = async (
  req: Request,
  res: Response
) => {
  const product = await getProductById(
    req.params.id
  );

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  res.json({
    success: true,
    data: product,
  });
};

export const editProduct = async (
  req: Request,
  res: Response
) => {
  const product = await updateProduct(
    req.params.id,
    req.body
  );

  res.json({
    success: true,
    message: "Product updated successfully",
    data: product,
  });
};

export const removeProduct = async (
  req: Request,
  res: Response
) => {
  await deleteProduct(req.params.id);

  res.json({
    success: true,
    message: "Product deleted successfully",
  });
};

export const lowStockProducts = async (
  req: Request,
  res: Response
) => {
  const products = await getLowStockProducts();

  res.status(200).json({
    success: true,
    message: "Low stock products fetched successfully",
    data: products,
  });
};



import { Request, Response } from "express";
import { createProduct } from "./product.service.js";
import { getProducts } from "./product.service.js";

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
  const products = await getProducts();

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    data: products,
  });
};

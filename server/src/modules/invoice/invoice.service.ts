import { Invoice } from "./invoice.model.js";
import { Product } from "../product/product.model.js";

export const createInvoice = async (
  payload: any,
  userId: string
) => {
  let subtotal = 0;

  const items = [];

  for (const item of payload.items) {
    const product = await Product.findById(item.product);

    if (!product) {
      throw new Error("Product not found");
    }

    if (product.stock < item.quantity) {
      throw new Error(`${product.name} is out of stock`);
    }

    const total = product.sellingPrice * item.quantity;

    subtotal += total;

    items.push({
      product: product._id,
      quantity: item.quantity,
      price: product.sellingPrice,
      total,
    });

    // Reduce stock
    product.stock -= item.quantity;
    await product.save();
  }

  const discount = payload.discount || 0;

  const taxableAmount = subtotal - discount;

  const gst = taxableAmount * 0.18;

  const grandTotal = taxableAmount + gst;

  return await Invoice.create({
    customer: payload.customer,
    prescription: payload.prescription,
    items,
    subtotal,
    discount,
    gst,
    grandTotal,
    createdBy: userId,
  });
};

export const getInvoices = async () => {
  return await Invoice.find()
    .populate("customer")
    .populate("items.product")
    .populate("prescription")
    .sort({
      createdAt: -1,
    });
};
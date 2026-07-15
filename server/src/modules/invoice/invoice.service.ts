import { Invoice } from "./invoice.model.js";
import { Product } from "../product/product.model.js";
import { PaymentStatus } from "./invoice.interface.js";

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

    // Reduce the stock
    product.stock -= item.quantity;
    await product.save();
  }

  const discount = payload.discount || 0;

  const taxableAmount = subtotal - discount;

  const gst = Number((taxableAmount * 0.18).toFixed(2));

const grandTotal = Number(
  (taxableAmount + gst).toFixed(2)
);

  return await Invoice.create({
    customer: payload.customer,
    prescription: payload.prescription,
    items,
    subtotal,
    discount,
    gst,
    grandTotal,
    paymentStatus: PaymentStatus.PENDING,
    paidAmount: 0,
    dueAmount: grandTotal,
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

export const getInvoiceById = async (id: string) => {
  return await Invoice.findById(id)
    .populate("customer")
    .populate("prescription")
    .populate("items.product")
    .populate("createdBy", "fullName email");
};

export const getCustomerInvoices = async (
  customerId: string
) => {
  return await Invoice.find({
    customer: customerId,
  })
    .populate("items.product")
    .populate("prescription")
    .sort({
      createdAt: -1,
    });
};

export const updatePayment = async (
  invoiceId: string,
  paidAmount: number
) => {
  const invoice = await Invoice.findById(invoiceId);

  if (!invoice) {
    throw new Error("Invoice not found");
  }

  invoice.paidAmount += paidAmount;

  invoice.dueAmount =
    invoice.grandTotal - invoice.paidAmount;

  if (invoice.dueAmount <= 0) {
    invoice.paymentStatus = PaymentStatus.PAID;
    invoice.dueAmount = 0;
  } else if (invoice.paidAmount > 0) {
    invoice.paymentStatus = PaymentStatus.PARTIAL;
  }

  await invoice.save();

  return invoice;
};
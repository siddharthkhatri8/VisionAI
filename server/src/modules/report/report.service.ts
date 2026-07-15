import { Invoice } from "../invoice/invoice.model.js";

export const getDailySalesReport = async () => {
  const today = new Date();

  const start = new Date(today);
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setHours(23, 59, 59, 999);

  const invoices = await Invoice.find({
    createdAt: {
      $gte: start,
      $lte: end,
    },
  });

  const totalSales = invoices.reduce(
    (sum, invoice) => sum + invoice.grandTotal,
    0
  );

  return {
    totalInvoices: invoices.length,
    totalSales,
    invoices,
  };
};
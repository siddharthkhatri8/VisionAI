import { Customer } from "../customer/customer.model.js";
import { Product } from "../product/product.model.js";
import { Invoice } from "../invoice/invoice.model.js";

export const getDashboardData = async () => {
  // Total Customers
  const totalCustomers = await Customer.countDocuments({
    isActive: true,
  });

  // Total Products
  const totalProducts = await Product.countDocuments({
    isActive: true,
  });

  // Total Invoices
  const totalInvoices = await Invoice.countDocuments();

  // Low Stock Products
  const lowStockProducts = await Product.countDocuments({
    isActive: true,
    $expr: {
      $lte: ["$stock", "$minimumStock"],
    },
  });

  // Revenue
  const revenue = await Invoice.aggregate([
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$grandTotal",
        },
      },
    },
  ]);

  const totalRevenue =
    revenue.length > 0 ? revenue[0].totalRevenue : 0;

  // Today's Sales
  const today = new Date();

  const start = new Date(today);
  start.setHours(0, 0, 0, 0);

  const end = new Date(today);
  end.setHours(23, 59, 59, 999);

  const todaySales = await Invoice.aggregate([
    {
      $match: {
        createdAt: {
          $gte: start,
          $lte: end,
        },
      },
    },
    {
      $group: {
        _id: null,
        sales: {
          $sum: "$grandTotal",
        },
      },
    },
  ]);

  return {
    totalCustomers,
    totalProducts,
    totalInvoices,
    lowStockProducts,
    totalRevenue,
    todaySales:
      todaySales.length > 0
        ? todaySales[0].sales
        : 0,
  };
};
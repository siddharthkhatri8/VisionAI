import PDFDocument from "pdfkit";
import { Response } from "express";

export const generateInvoicePDF = (
  invoice: any,
  res: Response
) => {
  const doc = new PDFDocument();

  res.setHeader(
    "Content-Type",
    "application/pdf"
  );

  res.setHeader(
    "Content-Disposition",
    `inline; filename=invoice-${invoice._id}.pdf`
  );

  doc.pipe(res);

  doc.fontSize(24).text("VisionAI Optical", {
    align: "center",
  });

  doc.moveDown();

  doc.fontSize(16).text(`Invoice #${invoice._id}`);

  doc.text(`Customer: ${invoice.customer.fullName}`);

  doc.text(
    `Date: ${invoice.createdAt.toDateString()}`
  );

  doc.moveDown();

  doc.fontSize(18).text("Products");

  invoice.items.forEach((item: any) => {
    doc.text(
      `${item.product.name}
Qty: ${item.quantity}
Price: ₹${item.price}
Total: ₹${item.total}`
    );

    doc.moveDown();
  });

  doc.text(`Subtotal : ₹${invoice.subtotal}`);

  doc.text(`Discount : ₹${invoice.discount}`);

  doc.text(`GST : ₹${invoice.gst}`);

  doc.fontSize(18).text(
    `Grand Total : ₹${invoice.grandTotal}`
  );

  doc.end();
};
import { Customer } from "./customer.model.js";

export const createCustomer = async (
  payload: any,
  userId: string
) => {
  return await Customer.create({
    ...payload,
    createdBy: userId,
  });
};

export const getCustomers = async (query: any) => {
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const search = query.search || "";

  const skip = (page - 1) * limit;

  const filter = {
    isActive: true,
    $or: [
      { fullName: { $regex: search, $options: "i" } },
      { phone: { $regex: search, $options: "i" } },
      { email: { $regex: search, $options: "i" } },
    ],
  };

  const customers = await Customer.find(filter)
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Customer.countDocuments(filter);

  return {
    customers,
    meta: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
};

export const getCustomerById = async (id: string) => {
  const customer = await Customer.findById(id);

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

export const updateCustomer = async (
  id: string,
  payload: Partial<ICustomer>
) => {
  const customer = await Customer.findByIdAndUpdate(
    id,
    payload,
    {
      new: true,
      runValidators: true,
    }
  );

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};

export const deleteCustomer = async (
  id: string
) => {
  const customer = await Customer.findByIdAndUpdate(
    id,
    {
      isActive: false,
    },
    {
      new: true,
    }
  );

  if (!customer) {
    throw new Error("Customer not found");
  }

  return customer;
};
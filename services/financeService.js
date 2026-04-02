import Finance from "../models/financeModel.js";
import { ApiError } from "../utils/apiError.js";

// CREATE
export const createFinanceService = async (data, user) => {
  const record = await Finance.create({
    ...data,
    userId: user.id
  });

  return record;
};

// GET ALL (RBAC LOGIC 🔥)
export const getFinanceService = async (query, user) => {
  let filter = {};

  // 🔥 RBAC logic
  if (user.role !== "admin") {
    filter.userId = user.id;
  }

  // Filtering
  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  if (query.fromDate && query.toDate) {
    filter.date = {
      $gte: new Date(query.fromDate),
      $lte: new Date(query.toDate)
    };
  }

  const records = await Finance.find(filter).sort({ createdAt: -1 });

  return records;
};

// GET SINGLE
export const getSingleFinanceService = async (id, user) => {
  const record = await Finance.findById(id);

  if (!record) throw new ApiError(404, "Record not found");

  // 🔥 RBAC check
  if (user.role !== "admin" && record.userId.toString() !== user.id) {
    throw new ApiError(403, "Unauthorized");
  }

  return record;
};

// UPDATE
export const updateFinanceService = async (id, data, user) => {
  const record = await Finance.findById(id);

  if (!record) throw new ApiError(404, "Record not found");

  if (user.role !== "admin" && record.userId.toString() !== user.id) {
    throw new ApiError(403, "Unauthorized");
  }

  Object.assign(record, data);
  await record.save();

  return record;
};

// DELETE
export const deleteFinanceService = async (id, user) => {
  const record = await Finance.findById(id);

  if (!record) throw new ApiError(404, "Record not found");

  if (user.role !== "admin" && record.userId.toString() !== user.id) {
    throw new ApiError(403, "Unauthorized");
  }

  await record.deleteOne();
};
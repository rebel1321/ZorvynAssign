import Finance from "../models/financeModel.js";

export const getDashboardSummaryService = async (user) => {
  let matchStage = {};

  // Dashboard visible to all authenticated users
  const result = await Finance.aggregate([
    { $match: matchStage },

    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" }
      }
    }
  ]);

  let income = 0;
  let expense = 0;

  result.forEach((item) => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense
  };
};
export const getCategoryBreakdownService = async (user) => {
  let matchStage = {};

  // Dashboard visible to all authenticated users
  const result = await Finance.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" }
      }
    }
  ]);

  return result;
};
export const getMonthlyTrendsService = async (user) => {
  let matchStage = {};

  // Dashboard visible to all authenticated users
  const result = await Finance.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          year: { $year: "$date" }
        },
        total: { $sum: "$amount" }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } }
  ]);

  return result;
};
export const getRecentActivityService = async (user) => {
  let filter = {};

  // Dashboard visible to all authenticated users
  const records = await Finance.find(filter)
    .sort({ createdAt: -1 })
    .limit(5);

  return records;
};
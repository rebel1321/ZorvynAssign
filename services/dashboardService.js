import Finance from "../models/financeModel.js";

export const getDashboardSummaryService = async (user) => {
  let matchStage = {};

  // 🔥 RBAC
  if (user.role !== "admin") {
    matchStage.userId = user.id;
  }

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

  if (user.role !== "admin") {
    matchStage.userId = user.id;
  }

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

  if (user.role !== "admin") {
    matchStage.userId = user.id;
  }

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

  if (user.role !== "admin") {
    filter.userId = user.id;
  }

  const records = await Finance.find(filter)
    .sort({ createdAt: -1 })
    .limit(5);

  return records;
};
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  getDashboardSummaryService,
  getCategoryBreakdownService,
  getMonthlyTrendsService,
  getRecentActivityService
} from "../services/dashboardService.js";

export const getDashboardSummary = asyncHandler(async (req, res) => {
  const data = await getDashboardSummaryService(req.user);
  successResponse(res, "Dashboard summary fetched", data);
});

export const getCategoryBreakdown = asyncHandler(async (req, res) => {
  const data = await getCategoryBreakdownService(req.user);
  successResponse(res, "Category breakdown fetched", data);
});

export const getMonthlyTrends = asyncHandler(async (req, res) => {
  const data = await getMonthlyTrendsService(req.user);
  successResponse(res, "Monthly trends fetched", data);
});

export const getRecentActivity = asyncHandler(async (req, res) => {
  const data = await getRecentActivityService(req.user);
  successResponse(res, "Recent activity fetched", data);
});
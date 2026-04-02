import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/apiResponse.js";
import {
  createFinanceService,
  getFinanceService,
  getSingleFinanceService,
  updateFinanceService,
  deleteFinanceService
} from "../services/financeService.js";

export const createFinance = asyncHandler(async (req, res) => {
  const record = await createFinanceService(req.body, req.user);
  successResponse(res, "Record created", record);
});

export const getFinance = asyncHandler(async (req, res) => {
  const records = await getFinanceService(req.query, req.user);
  successResponse(res, "Records fetched", records);
});

export const getSingleFinance = asyncHandler(async (req, res) => {
  const record = await getSingleFinanceService(req.params.id, req.user);
  successResponse(res, "Record fetched", record);
});

export const updateFinance = asyncHandler(async (req, res) => {
  const record = await updateFinanceService(
    req.params.id,
    req.body,
    req.user
  );
  successResponse(res, "Record updated", record);
});

export const deleteFinance = asyncHandler(async (req, res) => {
  await deleteFinanceService(req.params.id, req.user);
  successResponse(res, "Record deleted");
});
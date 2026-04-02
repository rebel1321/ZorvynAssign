import express from "express";
import {
  getDashboardSummary,
  getCategoryBreakdown,
  getMonthlyTrends,
  getRecentActivity
} from "../controller/dashboardController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Dashboard
 *   description: Dashboard Analytics APIs
 */

/**
 * @swagger
 * /api/dashboard/summary:
 *   get:
 *     summary: Get total income, expenses, and net balance
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard summary fetched successfully
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               message: Dashboard summary fetched
 *               data:
 *                 totalIncome: 50000
 *                 totalExpense: 20000
 *                 netBalance: 30000
 */
router.get("/summary", authMiddleware, getDashboardSummary);

/**
 * @swagger
 * /api/dashboard/categories:
 *   get:
 *     summary: Get category-wise financial breakdown
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Category breakdown fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id: salary
 *                   total: 50000
 *                 - _id: food
 *                   total: 10000
 */
router.get("/categories", authMiddleware, getCategoryBreakdown);

/**
 * @swagger
 * /api/dashboard/trends:
 *   get:
 *     summary: Get monthly financial trends
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Monthly trends fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - _id:
 *                     month: 4
 *                     year: 2026
 *                   total: 30000
 */
router.get("/trends", authMiddleware, getMonthlyTrends);

/**
 * @swagger
 * /api/dashboard/recent:
 *   get:
 *     summary: Get recent financial activity
 *     tags: [Dashboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Recent activity fetched
 *         content:
 *           application/json:
 *             example:
 *               success: true
 *               data:
 *                 - amount: 5000
 *                   type: income
 *                   category: salary
 *                   date: 2026-04-01
 */
router.get("/recent", authMiddleware, getRecentActivity);

export default router;
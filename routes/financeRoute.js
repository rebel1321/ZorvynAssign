import express from "express";
import {
  createFinance,
  getFinance,
  getSingleFinance,
  updateFinance,
  deleteFinance
} from "../controller/financeController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { allowRoles } from "../middleware/roleMiddleware.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Finance
 *   description: Financial Records Management
 */

/**
 * @swagger
 * /api/finance:
 *   post:
 *     summary: Create a new finance record (Admin only)
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [amount, type, category, date]
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 5000
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *                 example: income
 *               category:
 *                 type: string
 *                 example: salary
 *               date:
 *                 type: string
 *                 format: date
 *                 example: 2026-04-01
 *               notes:
 *                 type: string
 *                 example: Monthly salary
 *     responses:
 *       200:
 *         description: Record created successfully
 *       403:
 *         description: Forbidden
 */
router.post("/", authMiddleware, allowRoles("admin"), createFinance);

/**
 * @swagger
 * /api/finance:
 *   get:
 *     summary: Get all finance records (RBAC applied)
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: type
 *         schema:
 *           type: string
 *           enum: [income, expense]
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *     responses:
 *       200:
 *         description: List of finance records
 */
router.get("/", authMiddleware, allowRoles("admin", "analyst"), getFinance);

/**
 * @swagger
 * /api/finance/{id}:
 *   get:
 *     summary: Get a single finance record by ID
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Finance record fetched
 *       404:
 *         description: Record not found
 */
router.get("/:id", authMiddleware, allowRoles("admin", "analyst"), getSingleFinance);

/**
 * @swagger
 * /api/finance/{id}:
 *   put:
 *     summary: Update a finance record (Admin only)
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *               type:
 *                 type: string
 *                 enum: [income, expense]
 *               category:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *     responses:
 *       200:
 *         description: Record updated successfully
 *       403:
 *         description: Forbidden
 */
router.put("/:id", authMiddleware, allowRoles("admin"), updateFinance);

/**
 * @swagger
 * /api/finance/{id}:
 *   delete:
 *     summary: Delete a finance record (Admin only)
 *     tags: [Finance]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Record deleted successfully
 *       403:
 *         description: Forbidden
 */
router.delete("/:id", authMiddleware, allowRoles("admin"), deleteFinance);

export default router;
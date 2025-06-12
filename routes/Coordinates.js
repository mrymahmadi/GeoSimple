const CoordinatesCtrl = require("../src/controller/CoordinatesController");
const rateLimit = require("../src/middlewares/rateLimit");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /coordinates/addPoint:
 *   post:
 *     summary: افزودن یک نقطه جدید
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [lon, lat]
 *             properties:
 *               lon:
 *                 type: number
 *                 description: UTM lon
 *               lat:
 *                 type: number
 *                 description: UTM lat
 *             example:
 *               lon: 450000
 *               lat: 3800000
 *     responses:
 *       "201":
 *         description: نقطه جدید ثبت شد
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Point'
 *       "400":
 *         description: خطای فرمت ورودی (lon یا lat فرمت نادرست)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: مختصات وارد شده فرمت درستی ندارند.
 *       "500":
 *         description: خطای داخلی سرور
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: خطای سرور
 */

router.post("/addPoint", CoordinatesCtrl.newPoint);

/**
 * @swagger
 * /coordinates/addPolygon:
 *   post:
 *     summary: افزودن محدوده جدید (Polygon)
 *     tags:
 *       - Coordinates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coordinates
 *             properties:
 *               coordinates:
 *                 type: array
 *                 description: آرایه‌ای از حلقه‌ها (rings)، هر حلقه آرایه‌ای از مختصات [x, y] در EPSG:32639
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *               example:
 *                 coordinates:
 *                   - - [450000, 3800000]
 *                     - [450100, 3800000]
 *                     - [450100, 3800100]
 *                     - [450000, 3800000]
 *     responses:
 *       "201":
 *         description: محدوده جدید با موفقیت اضافه شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "محدوده جدید با موفقیت اضافه شد"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     area:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: "Polygon"
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: array
 *                             items:
 *                               type: number
 *       "400":
 *         description: خطای ورودی
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "مختصات اولیه با مختصات آخر مساوی نیست. این فرمت قانون ثبت محدوده است."
 *       "500":
 *         description: خطای داخلی سرور
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "خطای سرور"
 *                 err:
 *                   type: object
 */
router.post("/addPolygon", CoordinatesCtrl.addPolygon);

/**
 * @swagger
 * /coordinates/addCircle:
 *   post:
 *     summary: ثبت یک دایره جدید با داده‌های مختصات و شعاع
 *     tags:
 *       - Coordinates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - lon
 *               - lat
 *               - radius
 *             properties:
 *               lon:
 *                 type: number
 *                 description: طول جغرافیایی در سیستم EPSG:32639
 *                 example: 450000
 *               lat:
 *                 type: number
 *                 description: عرض جغرافیایی در سیستم EPSG:32639
 *                 example: 3800000
 *               radius:
 *                 type: number
 *                 description: شعاع دایره به متر
 *                 example: 50
 *     responses:
 *       "201":
 *         description: دایره با موفقیت ثبت شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "با موفقیت ثبت شد"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                     center:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: "Point"
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: number
 *                     radius:
 *                       type: number
 *                       example: 50
 *       "400":
 *         description: خطای ورودی — داده‌های لازم ارسال نشده‌اند
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "دیتاهای مورد انتظار دریافت نشد"
 *       "500":
 *         description: خطای داخلی سرور
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "خطای سرور"
 */
router.post("/addCircle", CoordinatesCtrl.saveCircle);

/**
 * @swagger
 * /coordinates/addLineString:
 *   post:
 *     summary: افزودن مسیر جدید (LineString)
 *     tags:
 *       - Coordinates
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - coordinates
 *             properties:
 *               coordinates:
 *                 type: array
 *                 description: آرایه‌ای از مختصات [x, y] (EPSG:32639)؛ حداقل دو نقطه لازم است
 *                 items:
 *                   type: array
 *                   items:
 *                     type: number
 *                 minItems: 2
 *                 example:
 *                   - [450000, 3800000]
 *                   - [450050, 3800050]
 *     responses:
 *       "201":
 *         description: مسیر جدید با موفقیت اضافه شد
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "مسیر جدید اضافه شد"
 *                 data:
 *                   type: object
 *                   properties:
 *                     _id:
 *                       type: string
 *                       example: "605c1234abcd5678ef901234"
 *                     path:
 *                       type: object
 *                       properties:
 *                         type:
 *                           type: string
 *                           example: "LineString"
 *                         coordinates:
 *                           type: array
 *                           items:
 *                             type: array
 *                             items:
 *                               type: number
 *                       example:
 *                         type: "LineString"
 *                         coordinates:
 *                           - [-0.58, 44.84]
 *                           - [-0.57, 44.85]
 *       "400":
 *         description: خطای ورودی — داده‌های لازم ارسال نشده‌اند یا آرایه غیرمجاز
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "ورودی باید یک ارایه از چند مختصات باشد"
 *       "500":
 *         description: خطای داخلی سرور
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 response:
 *                   type: string
 *                   example: "خطای سرور"
 */

router.post("/addLineString", CoordinatesCtrl.addLinestring);

module.exports = router;

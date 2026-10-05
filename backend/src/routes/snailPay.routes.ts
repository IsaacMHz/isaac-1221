import { Router } from "express";

import { recharge } from "../controllers/snailPay.controller.js";

const router = Router();

router.post("/recharge", recharge);

export default router;
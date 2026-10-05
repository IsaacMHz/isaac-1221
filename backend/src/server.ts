import express from "express";
import cors from "cors";

import snailPayRoutes from "./routes/snailPay.routes.js";

const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use("/api/snailpay", snailPayRoutes);

app.listen(Number(PORT), "0.0.0.0", () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`,
  );
});
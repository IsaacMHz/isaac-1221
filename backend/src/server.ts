import express from "express";

import snailPayRoutes from "./routes/snailPay.routes.js";

const app = express();

const PORT = 3000;

app.use(express.json());

app.use("/api/snailpay", snailPayRoutes);

app.listen(PORT, () => {
  console.log(
    `Servidor ejecutándose en http://localhost:${PORT}`,
  );
});
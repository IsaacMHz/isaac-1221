import express from "express"

const app = express()
const PORT = 3000

app.use(express.json())

app.get("/api/health", (_req, res) => {
  res.json({
    status: "ok",
    message: "SnailRaces API funcionando",
  })
})

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`)
})
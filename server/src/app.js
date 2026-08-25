const express = require("express");
const cors = require("cors");

const accountRoutes = require("./routes/account.routes");
const investigationRoutes = require("./routes/investigation.routes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "FraudLens API",
  });
});

app.use("/api/accounts", accountRoutes);

app.use("/api/investigations", investigationRoutes);

module.exports = app;
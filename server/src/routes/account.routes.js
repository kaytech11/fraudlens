const express = require("express");

const {
  getAccount,
  getTransactions,
} = require("../controllers/account.controller");

const router = express.Router();

router.get("/:accountId", getAccount);

router.get("/:accountId/transactions", getTransactions);

module.exports = router;
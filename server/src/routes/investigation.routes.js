const express = require("express");

const {
  getConnections,
  getSharedDeviceConnections,
  getRiskIndicators,
  getSuspiciousConnectionResults
} = require("../controllers/investigation.controller");

const router = express.Router();

router.get(
  "/accounts/:accountId/connections",
  getConnections
);

router.get(
  "/accounts/:accountId/shared-devices",
  getSharedDeviceConnections
);

router.get(
  "/accounts/:accountId/risk",
  getRiskIndicators
);

router.get(
  "/accounts/:accountId/suspicious-connections",
  getSuspiciousConnectionResults
);

module.exports = router;
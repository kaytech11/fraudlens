const {
  getConnectedAccounts,
  getSharedDevices,
  getAccountRiskIndicators,
  getSuspiciousConnections,
} = require("../services/investigation.service");

async function getConnections(req, res) {
  try {
    const { accountId } = req.params;

    const limit = Math.min(
      Number(req.query.limit) || 10,
      50
    );

    const connections = await getConnectedAccounts(
      accountId,
      limit
    );

    return res.json({
      accountId,
      connections,
    });
  } catch (error) {
    console.error("Get connections error:", error.message);

    return res.status(500).json({
      message: "Failed to retrieve account connections",
    });
  }
}

async function getSharedDeviceConnections(req, res) {
  try {
    const { accountId } = req.params;

    const devices = await getSharedDevices(accountId);

    return res.json({
      accountId,
      sharedDevices: devices,
    });
  } catch (error) {
    console.error("Get shared devices error:", error.message);

    return res.status(500).json({
      message: "Failed to retrieve shared devices",
    });
  }
}

async function getRiskIndicators(req, res) {
  try {
    const { accountId } = req.params;

    const indicators =
      await getAccountRiskIndicators(accountId);

    if (!indicators) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    return res.json(indicators);
  } catch (error) {
    console.error("Get risk indicators error:", error.message);

    return res.status(500).json({
      message: "Failed to retrieve risk indicators",
    });
  }
}

async function getSuspiciousConnectionResults(req, res) {
  try {
    const { accountId } = req.params;

    const connections =
      await getSuspiciousConnections(accountId);

    return res.json({
      accountId,
      suspiciousConnections: connections,
    });
  } catch (error) {
    console.error(
      "Get suspicious connections error:",
      error.message
    );

    return res.status(500).json({
      message:
        "Failed to retrieve suspicious connections",
    });
  }
}

module.exports = {
  getConnections,
  getSharedDeviceConnections,
  getRiskIndicators,
  getSuspiciousConnectionResults
};
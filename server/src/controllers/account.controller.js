const {
  getAccountById,
  getAccountTransactions,
} = require("../services/account.service");

async function getAccount(req, res) {
  try {
    const { accountId } = req.params;

    const account = await getAccountById(accountId);

    if (!account) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    return res.json(account);
  } catch (error) {
    console.error("Get account error:", error.message);

    return res.status(500).json({
      message: "Failed to retrieve account",
    });
  }
}

async function getTransactions(req, res) {
  try {
    const { accountId } = req.params;

    const transactions = await getAccountTransactions(accountId);

    return res.json({
      accountId,
      transactions,
    });
  } catch (error) {
    console.error("Get transactions error:", error.message);

    return res.status(500).json({
      message: "Failed to retrieve transactions",
    });
  }
}

module.exports = {
  getAccount,
  getTransactions,
};
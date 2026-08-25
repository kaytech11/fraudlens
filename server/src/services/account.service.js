const driver = require("../config/database");

const {
  GET_ACCOUNT_BY_ID,
} = require("../queries/account.queries");

const {
  GET_ACCOUNT_TRANSACTIONS,
} = require("../queries/transaction.queries");

async function getAccountById(accountId) {
  const session = driver.session();

  try {
    const result = await session.run(
      GET_ACCOUNT_BY_ID,
      {
        accountId,
      }
    );

    if (result.records.length === 0) {
      return null;
    }

    return result.records[0].toObject();
  } finally {
    await session.close();
  }
}

async function getAccountTransactions(accountId) {
  const session = driver.session();

  try {
    const result = await session.run(
      GET_ACCOUNT_TRANSACTIONS,
      {
        accountId,
      }
    );

    return result.records.map((record) => record.toObject());
  } finally {
    await session.close();
  }
}

module.exports = {
  getAccountById,
  getAccountTransactions,
};
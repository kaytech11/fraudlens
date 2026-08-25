const driver = require("../config/database");

function toNumber(value) {
  if (value === null || value === undefined) {
    return 0;
  }

  if (typeof value === "number") {
    return value;
  }

  if (typeof value.toNumber === "function") {
    return value.toNumber();
  }

  return Number(value);
}

const {
  GET_CONNECTED_ACCOUNTS,
  GET_SHARED_DEVICES,
  GET_TRANSACTION_PATH,
  GET_ACCOUNT_RISK_INDICATORS,
  GET_SUSPICIOUS_CONNECTIONS,
} = require("../queries/investigation.queries");

async function getConnectedAccounts(accountId, limit = 10) {
  const session = driver.session();

  try {
    const result = await session.run(
      GET_CONNECTED_ACCOUNTS,
      {
        accountId,
        limit,
      }
    );

    return result.records.map((record) => ({
      accountId: record.get("accountId"),
      hops: record.get("hops").toNumber(),
    }));
  } finally {
    await session.close();
  }
}

async function getSharedDevices(accountId) {
  const session = driver.session();

  try {
    const result = await session.run(
      GET_SHARED_DEVICES,
      {
        accountId,
      }
    );

    return result.records.map((record) => record.toObject());
  } finally {
    await session.close();
  }
}

async function getAccountRiskIndicators(accountId) {
  const session = driver.session();

  try {
    const result = await session.run(
      GET_ACCOUNT_RISK_INDICATORS,
      {
        accountId,
      }
    );

    if (result.records.length === 0) {
      return null;
    }

    const record = result.records[0];

    return {
      accountId: record.get("accountId"),
      customerName: record.get("customerName"),
      customerRiskLevel: record.get("customerRiskLevel"),

      transactionCount: toNumber(
        record.get("transactionCount")
      ),

      totalTransactionAmount: toNumber(
        record.get("totalTransactionAmount")
      ),

      sharedDeviceCount: toNumber(
        record.get("sharedDeviceCount")
      ),

      connectedCustomers: toNumber(
        record.get("connectedCustomers")
      ),

      connectedAccounts: toNumber(
        record.get("connectedAccounts")
      ),
    };
  } finally {
    await session.close();
  }
}

async function getSuspiciousConnections(accountId) {
  const session = driver.session();

  try {
    const result = await session.run(
      GET_SUSPICIOUS_CONNECTIONS,
      {
        accountId,
      }
    );

    return result.records.map((record) => ({
      accountId: record.get("accountId"),
      accountNumber: record.get("accountNumber"),
      customerId: record.get("customerId"),
      customerName: record.get("customerName"),
      riskLevel: record.get("riskLevel"),
    }));
  } finally {
    await session.close();
  }
}

module.exports = {
  getConnectedAccounts,
  getSharedDevices,
  getAccountRiskIndicators,
  getSuspiciousConnections,
};
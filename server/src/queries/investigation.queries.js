const GET_CONNECTED_ACCOUNTS = `
  MATCH path =
    (start:Account {id: $accountId})
    -[:SENT|RECEIVED_BY*1..4]-
    (connected:Account)

  WHERE start <> connected

  RETURN DISTINCT
    connected.id AS accountId,
    length(path) AS hops

  ORDER BY hops
  LIMIT $limit
`;

const GET_SHARED_DEVICES = `
  MATCH (account:Account)-[:SENT]->(transaction:Transaction)
        -[:USED_DEVICE]->(device:Device)

  MATCH (otherCustomer:Customer)-[:USES]->(device)

  MATCH (otherCustomer)-[:OWNS]->(otherAccount:Account)

  WHERE account.id = $accountId
    AND otherAccount.id <> account.id

  RETURN DISTINCT
    device {
      .id,
      .type,
      .fingerprint
    } AS device,

    otherCustomer {
      .id,
      .name,
      .riskLevel
    } AS customer,

    otherAccount {
      .id,
      .accountNumber,
      .status
    } AS account
`;

const GET_TRANSACTION_PATH = `
  MATCH path =
    (start:Account {id: $fromAccountId})
    -[:SENT|RECEIVED_BY*1..6]-
    (target:Account {id: $toAccountId})

  RETURN path
  LIMIT 1
`;

module.exports = {
  GET_CONNECTED_ACCOUNTS,
  GET_SHARED_DEVICES,
  GET_TRANSACTION_PATH,
};

const GET_ACCOUNT_RISK_INDICATORS = `
  MATCH (customer:Customer)-[:OWNS]->(account:Account)
  WHERE account.id = $accountId

  CALL {
    WITH account
    OPTIONAL MATCH (account)-[:SENT]->(transaction:Transaction)
    RETURN
      count(DISTINCT transaction) AS transactionCount,
      coalesce(sum(DISTINCT transaction.amount), 0) AS totalTransactionAmount
  }

  CALL {
    WITH account
    OPTIONAL MATCH (account)-[:SENT]->(:Transaction)-[:USED_DEVICE]->(device:Device)
      <-[:USES]-(otherCustomer:Customer)
    RETURN
      count(DISTINCT device) AS sharedDeviceCount,
      count(DISTINCT otherCustomer) AS connectedCustomers
  }

  CALL {
    WITH account
    OPTIONAL MATCH (account)-[:SENT|RECEIVED_BY*1..4]-(connected:Account)
    WHERE connected <> account
    RETURN count(DISTINCT connected) AS connectedAccounts
  }

  RETURN
    account.id AS accountId,
    customer.name AS customerName,
    customer.riskLevel AS customerRiskLevel,
    transactionCount,
    totalTransactionAmount,
    sharedDeviceCount,
    connectedCustomers,
    connectedAccounts
`;

const GET_SUSPICIOUS_CONNECTIONS = `
  MATCH (start:Account {id: $accountId})
        -[:SENT|RECEIVED_BY*1..4]-
        (connected:Account)

  MATCH (customer:Customer)-[:OWNS]->(connected)

  WHERE start <> connected

  RETURN DISTINCT
    connected.id AS accountId,
    connected.accountNumber AS accountNumber,
    customer.id AS customerId,
    customer.name AS customerName,
    customer.riskLevel AS riskLevel

  ORDER BY
    CASE customer.riskLevel
      WHEN "HIGH" THEN 1
      WHEN "MEDIUM" THEN 2
      ELSE 3
    END
`;

module.exports = {
  GET_CONNECTED_ACCOUNTS,
  GET_SHARED_DEVICES,
  GET_TRANSACTION_PATH,
  GET_ACCOUNT_RISK_INDICATORS,
  GET_SUSPICIOUS_CONNECTIONS,
};
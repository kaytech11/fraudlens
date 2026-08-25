const GET_ACCOUNT_TRANSACTIONS = `
  MATCH (account:Account)-[:SENT]->(transaction:Transaction)
  WHERE account.id = $accountId

  OPTIONAL MATCH (transaction)-[:RECEIVED_BY]->(receiver:Account)
  OPTIONAL MATCH (transaction)-[:USED_DEVICE]->(device:Device)
  OPTIONAL MATCH (transaction)-[:AT_MERCHANT]->(merchant:Merchant)
  OPTIONAL MATCH (transaction)-[:AT_LOCATION]->(location:Location)

  RETURN
    transaction {
      .id,
      .amount,
      .currency,
      .timestamp,
      .channel,
      .status,
      .type
    } AS transaction,

    receiver {
      .id,
      .accountNumber
    } AS receiver,

    device {
      .id,
      .type
    } AS device,

    merchant {
      .id,
      .name,
      .category
    } AS merchant,

    location {
      .id,
      .city,
      .country
    } AS location

  ORDER BY transaction.timestamp DESC
`;

module.exports = {
  GET_ACCOUNT_TRANSACTIONS,
};
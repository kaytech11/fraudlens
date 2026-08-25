const GET_ACCOUNT_BY_ID = `
  MATCH (customer:Customer)-[:OWNS]->(account:Account)
  WHERE account.id = $accountId
  RETURN
    account {
      .id,
      .accountNumber,
      .type,
      .currency,
      .status,
      .createdAt
    } AS account,
    customer {
      .id,
      .name,
      .email,
      .riskLevel
    } AS customer
`;

module.exports = {
  GET_ACCOUNT_BY_ID,
};
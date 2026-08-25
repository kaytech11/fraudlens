const driver = require("../src/config/database");

async function verifyGraph() {
  const session = driver.session();

  try {
    console.log("\n--- NODE COUNTS ---");

    const counts = await session.run(`
      MATCH (n)
      RETURN labels(n)[0] AS label, count(n) AS count
      ORDER BY label
    `);

    for (const record of counts.records) {
      console.log(
        `${record.get("label")}: ${record.get("count").toNumber()}`
      );
    }

    console.log("\n--- SAMPLE ACCOUNT RELATIONSHIP ---");

    const account = await session.run(
      `
      MATCH (c:Customer)-[:OWNS]->(a:Account)
      WHERE a.id = $accountId
      RETURN c.name AS customer, a.id AS account
      `,
      {
        accountId: "A001",
      }
    );

    for (const record of account.records) {
      console.log(
        `${record.get("account")} belongs to ${record.get("customer")}`
      );
    }

    console.log("\n--- SHARED DEVICES ---");

    const sharedDevices = await session.run(`
      MATCH (c1:Customer)-[:USES]->(d:Device)<-[:USES]-(c2:Customer)
      WHERE c1.id < c2.id
      RETURN
        d.id AS device,
        c1.name AS customer1,
        c2.name AS customer2
      ORDER BY device
    `);

    for (const record of sharedDevices.records) {
      console.log(
        `${record.get("device")}: ${record.get("customer1")} <-> ${record.get("customer2")}`
      );
    }

    console.log("\n--- MULTI-HOP ACCOUNT CONNECTION ---");

    const connections = await session.run(
      `
      MATCH path =
        (start:Account {id: $accountId})
        -[:SENT|RECEIVED_BY*1..4]-
        (connected:Account)
      WHERE start <> connected
      RETURN DISTINCT
        connected.id AS connectedAccount,
        length(path) AS hops
      ORDER BY hops
      LIMIT 10
      `,
      {
        accountId: "A001",
      }
    );

    for (const record of connections.records) {
      console.log(
        `A001 -> ${record.get("connectedAccount")} (${record.get("hops")} hops)`
      );
    }

  } catch (error) {
    console.error("Graph verification failed:");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

verifyGraph();
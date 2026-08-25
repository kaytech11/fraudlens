const driver = require("../src/config/database");

const constraints = [
  `CREATE CONSTRAINT customer_id_unique IF NOT EXISTS
   FOR (c:Customer)
   REQUIRE c.id IS UNIQUE`,

  `CREATE CONSTRAINT account_id_unique IF NOT EXISTS
   FOR (a:Account)
   REQUIRE a.id IS UNIQUE`,

  `CREATE CONSTRAINT transaction_id_unique IF NOT EXISTS
   FOR (t:Transaction)
   REQUIRE t.id IS UNIQUE`,

  `CREATE CONSTRAINT device_id_unique IF NOT EXISTS
   FOR (d:Device)
   REQUIRE d.id IS UNIQUE`,

  `CREATE CONSTRAINT merchant_id_unique IF NOT EXISTS
   FOR (m:Merchant)
   REQUIRE m.id IS UNIQUE`,

  `CREATE CONSTRAINT location_id_unique IF NOT EXISTS
   FOR (l:Location)
   REQUIRE l.id IS UNIQUE`,
];

async function setupDatabase() {
  const session = driver.session();

  try {
    for (const query of constraints) {
      await session.run(query);
    }

    console.log("Database constraints created successfully.");
  } catch (error) {
    console.error("Failed to create database constraints:");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

setupDatabase();
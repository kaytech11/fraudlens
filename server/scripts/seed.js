const driver = require("../src/config/database");

const customers = [
  {
    id: "C001",
    name: "David Adeyemi",
    email: "david@example.com",
    riskLevel: "LOW",
  },
  {
    id: "C002",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    riskLevel: "LOW",
  },
  {
    id: "C003",
    name: "Michael Okafor",
    email: "michael@example.com",
    riskLevel: "MEDIUM",
  },
  {
    id: "C004",
    name: "Daniel Williams",
    email: "daniel@example.com",
    riskLevel: "HIGH",
  },
  {
    id: "C005",
    name: "Grace Ibrahim",
    email: "grace@example.com",
    riskLevel: "LOW",
  },
  {
    id: "C006",
    name: "James Brown",
    email: "james@example.com",
    riskLevel: "MEDIUM",
  },
  {
    id: "C007",
    name: "Aisha Bello",
    email: "aisha@example.com",
    riskLevel: "HIGH",
  },
  {
    id: "C008",
    name: "Samuel Adekunle",
    email: "samuel@example.com",
    riskLevel: "LOW",
  },
  {
    id: "C009",
    name: "Emily Carter",
    email: "emily@example.com",
    riskLevel: "MEDIUM",
  },
  {
    id: "C010",
    name: "Victor Mensah",
    email: "victor@example.com",
    riskLevel: "HIGH",
  },
];

const accounts = [
  {
    id: "A001",
    accountNumber: "100001",
    type: "CHECKING",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A002",
    accountNumber: "100002",
    type: "CHECKING",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A003",
    accountNumber: "100003",
    type: "SAVINGS",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A004",
    accountNumber: "100004",
    type: "CHECKING",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A005",
    accountNumber: "100005",
    type: "SAVINGS",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A006",
    accountNumber: "100006",
    type: "CHECKING",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A007",
    accountNumber: "100007",
    type: "CHECKING",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A008",
    accountNumber: "100008",
    type: "SAVINGS",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A009",
    accountNumber: "100009",
    type: "CHECKING",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A010",
    accountNumber: "100010",
    type: "CHECKING",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A011",
    accountNumber: "100011",
    type: "SAVINGS",
    currency: "NGN",
    status: "ACTIVE",
  },
  {
    id: "A012",
    accountNumber: "100012",
    type: "CHECKING",
    currency: "NGN",
    status: "ACTIVE",
  },
];

const devices = [
  {
    id: "D001",
    type: "MOBILE",
    fingerprint: "device-fp-001",
  },
  {
    id: "D002",
    type: "MOBILE",
    fingerprint: "device-fp-002",
  },
  {
    id: "D003",
    type: "WEB",
    fingerprint: "device-fp-003",
  },
  {
    id: "D004",
    type: "MOBILE",
    fingerprint: "device-fp-004",
  },
  {
    id: "D005",
    type: "WEB",
    fingerprint: "device-fp-005",
  },
  {
    id: "D006",
    type: "MOBILE",
    fingerprint: "device-fp-006",
  },
];

const merchants = [
  {
    id: "M001",
    name: "QuickMart",
    category: "RETAIL",
  },
  {
    id: "M002",
    name: "TravelHub",
    category: "TRAVEL",
  },
  {
    id: "M003",
    name: "GameZone",
    category: "GAMING",
  },
  {
    id: "M004",
    name: "TechWorld",
    category: "ELECTRONICS",
  },
  {
    id: "M005",
    name: "FoodExpress",
    category: "FOOD",
  },
];

const locations = [
  {
    id: "L001",
    city: "Lagos",
    country: "Nigeria",
  },
  {
    id: "L002",
    city: "Abuja",
    country: "Nigeria",
  },
  {
    id: "L003",
    city: "Port Harcourt",
    country: "Nigeria",
  },
  {
    id: "L004",
    city: "Ibadan",
    country: "Nigeria",
  },
  {
    id: "L005",
    city: "Kano",
    country: "Nigeria",
  },
];

const transactions = [
  {
    id: "T001",
    amount: 250000,
    currency: "NGN",
    timestamp: "2026-08-20T09:15:00Z",
    channel: "MOBILE",
    status: "COMPLETED",
    type: "TRANSFER",
    sender: "A001",
    receiver: "A004",
    device: "D001",
    merchant: null,
    location: "L001",
  },
  {
    id: "T002",
    amount: 85000,
    currency: "NGN",
    timestamp: "2026-08-20T10:20:00Z",
    channel: "WEB",
    status: "COMPLETED",
    type: "TRANSFER",
    sender: "A002",
    receiver: "A005",
    device: "D002",
    merchant: null,
    location: "L002",
  },
  {
    id: "T003",
    amount: 45000,
    currency: "NGN",
    timestamp: "2026-08-20T11:30:00Z",
    channel: "POS",
    status: "COMPLETED",
    type: "PURCHASE",
    sender: "A003",
    receiver: "A003",
    device: "D003",
    merchant: "M001",
    location: "L001",
  },
  {
    id: "T004",
    amount: 180000,
    currency: "NGN",
    timestamp: "2026-08-20T12:10:00Z",
    channel: "MOBILE",
    status: "COMPLETED",
    type: "TRANSFER",
    sender: "A004",
    receiver: "A007",
    device: "D001",
    merchant: null,
    location: "L001",
  },
  {
    id: "T005",
    amount: 120000,
    currency: "NGN",
    timestamp: "2026-08-20T13:00:00Z",
    channel: "MOBILE",
    status: "COMPLETED",
    type: "TRANSFER",
    sender: "A007",
    receiver: "A010",
    device: "D001",
    merchant: null,
    location: "L001",
  },
  {
    id: "T006",
    amount: 65000,
    currency: "NGN",
    timestamp: "2026-08-20T13:45:00Z",
    channel: "WEB",
    status: "COMPLETED",
    type: "TRANSFER",
    sender: "A006",
    receiver: "A008",
    device: "D003",
    merchant: null,
    location: "L003",
  },
  {
    id: "T007",
    amount: 30000,
    currency: "NGN",
    timestamp: "2026-08-20T14:15:00Z",
    channel: "POS",
    status: "COMPLETED",
    type: "PURCHASE",
    sender: "A005",
    receiver: "A005",
    device: "D002",
    merchant: "M005",
    location: "L002",
  },
  {
    id: "T008",
    amount: 420000,
    currency: "NGN",
    timestamp: "2026-08-21T08:30:00Z",
    channel: "MOBILE",
    status: "COMPLETED",
    type: "TRANSFER",
    sender: "A009",
    receiver: "A012",
    device: "D004",
    merchant: null,
    location: "L004",
  },
  {
    id: "T009",
    amount: 95000,
    currency: "NGN",
    timestamp: "2026-08-21T09:10:00Z",
    channel: "WEB",
    status: "COMPLETED",
    type: "TRANSFER",
    sender: "A010",
    receiver: "A011",
    device: "D005",
    merchant: null,
    location: "L005",
  },
  {
    id: "T010",
    amount: 275000,
    currency: "NGN",
    timestamp: "2026-08-21T10:00:00Z",
    channel: "MOBILE",
    status: "COMPLETED",
    type: "TRANSFER",
    sender: "A012",
    receiver: "A004",
    device: "D004",
    merchant: null,
    location: "L004",
  },
];

async function seedDatabase() {
  const session = driver.session();

  try {
    console.log("Seeding FraudLens graph...");

    await session.run(`
      MATCH (n)
      DETACH DELETE n
    `);

    await session.run(
      `
      UNWIND $customers AS customer
      CREATE (c:Customer)
      SET c = customer
      `,
      { customers }
    );

    await session.run(
      `
      UNWIND $accounts AS account
      CREATE (a:Account)
      SET a = account
      `,
      { accounts }
    );

    await session.run(
      `
      UNWIND $devices AS device
      CREATE (d:Device)
      SET d = device
      `,
      { devices }
    );

    await session.run(
      `
      UNWIND $merchants AS merchant
      CREATE (m:Merchant)
      SET m = merchant
      `,
      { merchants }
    );

    await session.run(
      `
      UNWIND $locations AS location
      CREATE (l:Location)
      SET l = location
      `,
      { locations }
    );

    await session.run(`
      MATCH (c:Customer {id: "C001"}), (a:Account {id: "A001"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C002"}), (a:Account {id: "A002"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C003"}), (a:Account {id: "A003"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C004"}), (a:Account {id: "A004"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C005"}), (a:Account {id: "A005"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C006"}), (a:Account {id: "A006"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C007"}), (a:Account {id: "A007"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C008"}), (a:Account {id: "A008"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C009"}), (a:Account {id: "A009"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C010"}), (a:Account {id: "A010"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C003"}), (a:Account {id: "A011"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C007"}), (a:Account {id: "A012"})
      CREATE (c)-[:OWNS]->(a)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C001"}), (d:Device {id: "D001"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C004"}), (d:Device {id: "D001"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C007"}), (d:Device {id: "D004"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C009"}), (d:Device {id: "D004"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C002"}), (d:Device {id: "D002"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C003"}), (d:Device {id: "D003"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C005"}), (d:Device {id: "D005"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C006"}), (d:Device {id: "D006"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C008"}), (d:Device {id: "D006"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C010"}), (d:Device {id: "D005"})
      CREATE (c)-[:USES]->(d)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C001"}), (l:Location {id: "L001"})
      CREATE (c)-[:LOCATED_AT]->(l)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C002"}), (l:Location {id: "L002"})
      CREATE (c)-[:LOCATED_AT]->(l)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C003"}), (l:Location {id: "L003"})
      CREATE (c)-[:LOCATED_AT]->(l)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C004"}), (l:Location {id: "L001"})
      CREATE (c)-[:LOCATED_AT]->(l)
    `);

    await session.run(`
      MATCH (c:Customer {id: "C007"}), (l:Location {id: "L004"})
      CREATE (c)-[:LOCATED_AT]->(l)
    `);

    for (const transaction of transactions) {
      await session.run(
        `
        MATCH (sender:Account {id: $sender})
        MATCH (receiver:Account {id: $receiver})
        MATCH (device:Device {id: $device})
        MATCH (location:Location {id: $location})
        CREATE (sender)-[:SENT]->(t:Transaction {
          id: $id,
          amount: $amount,
          currency: $currency,
          timestamp: datetime($timestamp),
          channel: $channel,
          status: $status,
          type: $type
        })
        CREATE (t)-[:RECEIVED_BY]->(receiver)
        CREATE (t)-[:USED_DEVICE]->(device)
        CREATE (t)-[:AT_LOCATION]->(location)
        `,
        transaction
      );

      if (transaction.merchant) {
        await session.run(
          `
          MATCH (t:Transaction {id: $transactionId})
          MATCH (m:Merchant {id: $merchantId})
          CREATE (t)-[:AT_MERCHANT]->(m)
          `,
          {
            transactionId: transaction.id,
            merchantId: transaction.merchant,
          }
        );
      }
    }

    console.log("FraudLens graph seeded successfully.");
    console.log(`Customers: ${customers.length}`);
    console.log(`Accounts: ${accounts.length}`);
    console.log(`Devices: ${devices.length}`);
    console.log(`Merchants: ${merchants.length}`);
    console.log(`Locations: ${locations.length}`);
    console.log(`Transactions: ${transactions.length}`);
  } catch (error) {
    console.error("Failed to seed database:");
    console.error(error.message);
    process.exitCode = 1;
  } finally {
    await session.close();
    await driver.close();
  }
}

seedDatabase();
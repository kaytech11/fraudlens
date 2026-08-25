const {
    GET_ACCOUNT_RISK_INDICATORS,
} = require("../src/queries/investigation.queries");

const driver = require("../src/config/database");

const {
    GET_ACCOUNT_BY_ID,
} = require("../src/queries/account.queries");

const {
    GET_ACCOUNT_TRANSACTIONS,
} = require("../src/queries/transaction.queries");

const {
    GET_CONNECTED_ACCOUNTS,
    GET_SHARED_DEVICES,
} = require("../src/queries/investigation.queries");

async function testQueries() {
    const session = driver.session();

    try {

        console.log("\n=== RISK INDICATORS ===");

        const riskResult = await session.run(
            GET_ACCOUNT_RISK_INDICATORS,
            {
                accountId: "A001",
            }
        );

        for (const record of riskResult.records) {
            console.log(record.toObject());
        }

        console.log("\n=== ACCOUNT QUERY ===");

        const accountResult = await session.run(
            GET_ACCOUNT_BY_ID,
            {
                accountId: "A001",
            }
        );

        for (const record of accountResult.records) {
            console.log(record.toObject());
        }

        console.log("\n=== TRANSACTION QUERY ===");

        const transactionResult = await session.run(
            GET_ACCOUNT_TRANSACTIONS,
            {
                accountId: "A001",
            }
        );

        console.log(
            `Transactions found: ${transactionResult.records.length}`
        );

        for (const record of transactionResult.records) {
            console.log(record.toObject());
        }

        console.log("\n=== CONNECTED ACCOUNTS ===");

        const connectedResult = await session.run(
            GET_CONNECTED_ACCOUNTS,
            {
                accountId: "A001",
                limit: 10,
            }
        );

        for (const record of connectedResult.records) {
            console.log(record.toObject());
        }

        console.log("\n=== SHARED DEVICES ===");

        const deviceResult = await session.run(
            GET_SHARED_DEVICES,
            {
                accountId: "A001",
            }
        );

        for (const record of deviceResult.records) {
            console.log(record.toObject());
        }

        console.log("\nAll query tests completed successfully.");
    } catch (error) {
        console.error("\nQuery test failed:");
        console.error(error.message);
        process.exitCode = 1;
    } finally {
        await session.close();
        await driver.close();
    }
}

testQueries();
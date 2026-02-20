const client = require("./client");
const { createItem } = require("./index"); // Assuming your db functions are exported here

async function dropTables() {
    try {
        console.log("Dropping tables...");
        await client.query("DROP TABLE IF EXISTS items;");
        await client.query("DROP TABLE IF EXISTS orders;");
        await client.query("DROP TABLE IF EXISTS customers;");
    } catch (error) {
        console.log("oh nose, failed dropping tables!", error);
        throw error;
    }
}

async function createTables() {
    try {
        console.log("Creating tables...");
        // Creating customers first since orders might reference it later
        await client.query(`
            CREATE TABLE customers (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
            
            CREATE TABLE items (
                id SERIAL PRIMARY KEY,
                name VARCHAR(255),
                price DECIMAL,
                image TEXT,
                description TEXT
            );
        `);
    } catch (error) {
        console.log("oh nose! Couldn't create tables", error);
        throw error;
    }
}

async function createInitialData() {
    try {
        console.log("Seeding initial items...");

        await createItem({
            name: "Pepsi",
            price: 5,
            description: "A refreshing cola."
        });

        await createItem({
            name: "Sprite",
            price: 10,
            description: "Crisp lemon-lime soda."
        });

        console.log("Database seeded successfully!");
    } catch (error) {
        console.log("oh nose! Couldn't create data", error);
        throw error;
    }
}

async function rebuild() {
    try {
        await client.connect();
        await dropTables();
        await createTables();
        await createInitialData();
    } catch (error) {
        console.log("oh nose! failed rebuilding database", error);
    } finally {
        await client.end();
    }
}

rebuild();
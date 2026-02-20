const { Pool } = require("pg"); // Changed from Client to Pool
require("dotenv").config();

const isProduction = process.env.NODE_ENV === "production";

const DATABASE_URL = process.env.DATABASE_URL || "postgres://localhost:5432/restaurant";

const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: isProduction ? { rejectUnauthorized: false } : false,
});

module.exports = pool;
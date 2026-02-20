const client = require("./client");

async function getAllItems() {
    try {
        const { rows } = await client.query("SELECT * FROM items;");
        return rows;
    } catch (error) {
        console.error("oh nose! couldn't get items", error);
        throw error;
    }
}

async function createItem({ name, price, image, description }) {
    try {
        // We use $1, $2, etc. to prevent SQL injection
        const { rows: [item] } = await client.query(`
            INSERT INTO items(name, price, image, description)
            VALUES ($1, $2, $3, $4)
            RETURNING *;
        `, [name, price, image, description]);

        return item;
    } catch (error) {
        console.error("oh nose! couldn't create item", error);
        throw error;
    }
}

async function deleteItem(id) {
    try {
        const { rows: [item] } = await client.query(`
            DELETE FROM items
            WHERE id = $1
            RETURNING *;
        `, [id]);

        return item;
    } catch (error) {
        console.error("oh nose! couldn't delete item", error);
        throw error;
    }
}

module.exports = {
    getAllItems,
    createItem,
    deleteItem
};
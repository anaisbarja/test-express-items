const express = require("express");
const router = express.Router();

const {
    getAllItems,
    createItem,
    deleteItem
} = require("../db");

router.get("/", async (req, res) => {
    try {
        const items = await getAllItems();
        res.send({ items });
    } catch (error) {
        console.error("Error fetching items:", error);
        res.status(500).send({ message: "Could not retrieve items." });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, price, image, description } = req.body;

        const newItem = await createItem({
            name, price, image, description
        });

        res.send({
            message: "Success!",
            item: newItem
        });
    } catch (error) {
        console.error("Oh nose!", error);
        res.send({ message: "Oh nose!" });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        await deleteItem(id);
        res.send({ message: "Success!" });
    } catch (error) {
        console.error("Oh nose!", error);
        res.send({ message: "Oh nose!" });
    }
});

module.exports = router;
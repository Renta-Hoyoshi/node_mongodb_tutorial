const express = require("express");
const app = express();
const PORT = 5000;

app.listen(PORT, () => {
    console.log("Server Started.")
});

app.get("/", (req, res) => {
    res.send("hoyoshi test")
});

const customers = [
    {title: "tanaka", id: 1},
    {title: "saitou", id: 2},
    {title: "hoyoshi", id: 3},
    {title: "hashimoto", id: 4},
    {title: "ando", id: 5},
];

app.get("/api/customers", (req, res) => {
    res.send(customers);
});

app.post("/api/customers", (req, res) => {
    const customer = {
        title: req.body.title,
        id: customers.length + 1,
    };
    customers.push(customer);
    res.send(customer);
});


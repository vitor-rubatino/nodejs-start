const express = require('express');

const app = express();

app.get("/first-route", (req, res) => {
    //return string message
    //return res.send("Accessed the first route");
    return res.json({
        message: "Accessed the first route using nodemon",
    });
})

app.listen(4002, () => console.log("O servidor está rodando na porta 4002"));
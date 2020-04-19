const apiRoutes = require("./api");
const express = require("express");
const app = express();
const port = 8080;

const BASE_API_URL = "/api";

// app.get("/", (req, res) => res.send("Hello World!"));

app.use(BASE_API_URL, apiRoutes);

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

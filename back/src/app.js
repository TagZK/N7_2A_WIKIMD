const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const knex = require("knex");
const knexService = require("feathers-knex");

const dbConfig = require("../knexfile.js");
const database = knex(dbConfig.development);

// To enable all CORS request -> For allowing the front to make a request to the back
const cors = require("cors");

// Create a feathers instance.
const app = express(feathers());
// Enable REST transport
app.configure(express.rest());

// Enable all CORS request
app.use(cors());

// JSON body parser middleware
app.use(express.json());

// Feathers/Knex REST services
app.use("/api/pages", knexService({ Model: database, name: "pages" }));

// Start the server on port 3030
app.listen(3030, () => console.log("Listening on port 3030"));

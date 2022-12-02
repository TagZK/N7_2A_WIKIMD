const feathers = require("@feathersjs/feathers");
const express = require("@feathersjs/express");
const knex = require("knex");
const knexService = require("feathers-knex");

const dbConfig = require("../knexfile.js");
const database = knex(dbConfig.development);

// Create a feathers instance.
const app = express(feathers());
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: "http://localhost:3000",
      methods: ["GET", "POST", "PATCH"]
    }
});

// To enable all CORS request -> For allowing the front to make a request to the back
const cors = require("cors");

// Enable REST transport
app.configure(express.rest());

// Enable all CORS request
app.use(cors());

// JSON body parser middleware
app.use(express.json());

// Feathers/Knex REST services
app.use("/api/pages", knexService({ Model: database, name: "pages" }));

//Sockets
io.on('connection', (socket) =>{
    console.log(`Connecté au client ${socket.id}`);

    socket.on('patch', (item) =>{
        console.log(`received patch from ${socket.id}`);
        io.emit('patched', item);
    });

    socket.on('disconnect', (reason) => {
        console.log(`Déconnecté du client ${socket.id}`);
    });

    socket.on('post', (item) => {
        console.log(`received post from ${socket.id}`);
        io.emit('posted', item);
    });
});

// Start the server on port 3030
//app.listen(3030, () => console.log("Listening on port 3030"));
server.listen(3030, () => console.log("Listening on port 3030 (server)") )

const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = process.env.PORT || 8080;

const WebSocket = require("ws");
const wss = new WebSocket.Server({ server: server }); //{ port: process.env.PORT || 8080 }

// let messages = [];

wss.on("connection", (ws) => {
  console.log("New Client Connected");

  //   ws.send({"Hello Client!"});

  ws.on("message", (message, isBinary) => {
    console.log("Received: " + message);

    wss.clients.forEach(function each(client) {
      //Broadcast a message to all connected clients
      if (client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: isBinary });
      }
    });
  });
});

server.listen(port, () => {
  console.log(`Server online on: ws://localhost:${port}`);
});

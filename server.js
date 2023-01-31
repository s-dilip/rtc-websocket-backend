const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

// let messages = [];

server.on("connection", (ws) => {
  console.log("New Client Connected");

  ws.send("Hello Client!");

  ws.on("message", (message, isBinary) => {
    console.log("Received: " + message);

    server.clients.forEach(function each(client) {
      //Broadcast a message to all connected clients
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message, { binary: isBinary });
      }
    });
  });
});

const WebSocket = require("ws");
const server = new WebSocket.Server({ port: 8080 });

// let messages = [];

server.on("connection", (ws) => {
  console.log("New Client Connected");

  ws.send("Hello Client!");

  ws.on("message", (message) => {
    console.log("Recieved: " + message);
    // messages.push({ id: 0, text: message });
  });
});

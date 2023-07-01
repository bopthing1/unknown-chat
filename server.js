const express = require("express");
const socketio = require("socket.io");
const http = require("http");
const Client = require("@replit/database");

const PORT = 9000;

const app = express();
const server = http.createServer(app);
const io = socketio(server, {
	cors: {
		origin: "*",
		methods: ["GET", "POST"],
	},
});
const client = new Client();

async function getMessages() {
	return client.list("M_") || [];
}

io.on("connection", async (socket) => {
	console.log("New user connected");

	socket.emit("renderAllMessages", await getMessages());

	socket.on("sendMessage", async (message) => {
		console.log("new message: " + JSON.stringify(message));

		await client.set("M_", {
			content: message.content,
			author: message.author,
			date: message.date,
		});

		io.sockets.emit("renderMessage", message);
	});
});

server.listen(PORT, async () => {
	console.log(`Server running on port ${PORT}`);
});

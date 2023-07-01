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
	const messages = await client.list("M_");
	let results = [];

	for (let i = 0; i < messages.length; i++) {
		const message = await client.get(messages[i]);

		console.log("message: " + JSON.stringify(message));

		results.push(message);
	}

	return results;
}

io.on("connection", async (socket) => {
	console.log("New user connected");

	socket.emit("renderAllMessages", await getMessages());

	socket.on("message", async (message) => {
		console.log("new message: " + JSON.stringify(message));

		if (message.message.length > 200) {
			console.warn("message too long");

			socket.emit("alert", "message too long");

			return;
		}

		await client.set("M_" + message.id, {
			content: message.message,
			author: message.author,
			date: message.date,
			id: message.id,
		});

		io.sockets.emit("renderMessage", message);
	});
});

server.listen(PORT, async () => {
	console.log(`Server running on port ${PORT}`);
});

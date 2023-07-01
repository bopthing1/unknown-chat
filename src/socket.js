import { io } from "socket.io-client";
const REPL_URL = "https://unknown-chat-server.bopthing1.repl.co";

export let socket;

export function init() {
	socket = io(REPL_URL);

	socket.on("alert", (msg) => {
		alert("⚠️ " + msg);
	});

	console.log("connected");
}

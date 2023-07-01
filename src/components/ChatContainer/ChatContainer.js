import "./ChatContainer.css";
import Message from "../Message/Message";
import { socket } from "../../socket";
import { useState } from "react";

export default function ChatContainer() {
	const [messages, setMessages] = useState([]);

	socket.on("renderAllMessages", (messages) => {
		// console.log(messages);

		setMessages(messages);
	});

	socket.on("renderMessage", (message) => {
		const newMessages = [...messages, message];

		console.log(message);

		setMessages(newMessages);
	});

	return (
		<div className="chat-container">
			{messages.map((m) => {
				return (
					<Message
						id={m.id || "wwhat"}
						author={m.author}
						content={m.content || m.message}
						key={m.id}
					/>
				);
			})}
		</div>
	);
}

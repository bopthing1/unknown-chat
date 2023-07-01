import "./ChatContainer.css";
import Message from "../Message/Message";
import { socket } from "../../socket";
import { useState } from "react";

export default function ChatContainer() {
	const [messages, setMessages] = useState([]);

	socket.on("renderAllMessages", (messages) => {
		setMessages(messages);
	});

	socket.on("renderMessage", (message) => {
		const newMessages = [...messages, message];

		setMessages(newMessages);
	});

	return (
		<div className="chat-container">
			{messages.map((m) => {
				return (
					<Message
						author={"unknown " + Math.random() * 10000}
						content={"uu"}
						key={m}
					/>
				);
			})}
		</div>
	);
}

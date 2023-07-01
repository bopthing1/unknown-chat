import "./Chatbox.css";
import { useState } from "react";
import { socket } from "../../socket";

export default function Chatbox() {
	const [value, setValue] = useState("");

	function onSubmit(e) {
		e.preventDefault();

		socket.emit("message", {
			message: value,
			author: "unknown " + Math.floor(Math.random() * 10000),
			date: new Date().toISOString(),
		});

		setValue("");
	}

	return (
		<div className="chatbox">
			<form className="chatbox-form" onSubmit={onSubmit}>
				<input
					className="chatbox-input"
					type="text"
					required
					placeholder="chat here"
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
			</form>
		</div>
	);
}

import "./Chatbox.css";
import { useState } from "react";
import { socket } from "../../socket";

export default function Chatbox() {
	const [value, setValue] = useState("");

	function onSubmit(e) {
		e.preventDefault();

		const id = Math.floor(Math.random() * 99999999999);

		socket.emit("message", {
			message: value,
			author: "unknown " + id,
			date: new Date().toISOString(),
			id: id,
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
					maxLength={200}
					onChange={(e) => setValue(e.target.value)}
				/>
			</form>
		</div>
	);
}

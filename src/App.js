import React from "react";
import "./App.css";
import "./index.css";
import Navbar from "./components/Navbar/Navbar";
import ChatContainer from "./components/ChatContainer/ChatContainer";
import Chatbox from "./components/Chatbox/Chatbox";

function App() {
	return (
		<>
			<Navbar />
			<ChatContainer />
			<Chatbox />
		</>
	);
}

export default App;

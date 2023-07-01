import "./Message.css";

export default function Message(props) {
	return (
		<div class="message" id={props.id}>
			<p class="author">{props.author}</p>
			<p class="content">{props.content}</p>
		</div>
	);
}

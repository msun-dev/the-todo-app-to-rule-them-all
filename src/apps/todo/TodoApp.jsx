// Graphics
import "./TodoApp.css"

// Things
import React, { useState } from "react"

function TodoApp() {
	// Global
	const [todos, setTodos] = useState([]);
	// Todo
	const [text, setText] = useState("");
	const [completionState, setCompletion] = useState(false);

	function handleChange(e) {
		setText(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		setTodos([...todos, text]);
		setText("");
	}

	function handleDelete(index) {
		const newList = [...todos];
		newList.splice(index, 1);
		setTodos(newList);
	}

	return (
		<div className="todo-app">
			<h1>TODO list:</h1>
			<form className="todo-form">
				<input type="text" value={text} onChange={handleChange}/>
				<button onClick={handleSubmit}>Add Entry</button>
			</form>
			<ul className="todo-list">
				{todos.map((todo, index) => (
						<li key={index}>{todo}
							<button onClick={() => handleDelete(index)}>Delete</button>
						</li>
					))}
			</ul>
		</div>
	);
}

export default TodoApp;

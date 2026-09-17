// Graphics
//import './TodoApp.css'

// Things
import React, { useState } from 'react'


function TodoApp() {
	const [todos, setTodos] = useState([]);
	const [inputValue, setInputValue] = useState('');

	function handleChange(e) {
		setInputValue(e.target.value);
	}

	function handleSubmit(e) {
		e.preventDefault();
		setTodos([...todos, inputValue]);
		setInputValue('');
	}

	function handleDelete(index) {
		const newList = [...todos];
		newList.splice(index, 1);
		setTodos(newList);
	}

	return (
		<div>
			<h1>TODO list:</h1>
			<form>
				<input type='text' value={inputValue} onChange={handleChange}/>
				<button onClick={handleSubmit}>Add Entry</button>
			</form>
			<ul>
				{todos.map((todo, index) => (
						<li key={index}>{todo}
							<button onClick={() => handleDelete(index)}>Delete</button>
						</li>
					))}
			</ul>
		</div>
	)
}

export default TodoApp;

// Graphics
import "./NotesApp.css";

// Things
import React, { useState } from "react";

const noteObject = {
	title : "",
	text  : ""
};

function NotesApp() {
	// Note
	const [note, setNote] = useState(noteObject);
	// Global
	const [notes, setNotes] = useState([]);
	const [editNoteIndex, setEditNoteIndex] = useState(null);

	function handleTitleChange(e) {
		setNote({ ...note, title: e.target.value });
	}

	function handleTextChange(e) {
		setNote({ ...note, text: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();
		if (!note.title.trim() && !note.text.trim()) return;

		if (editNoteIndex !== null) {
			const updatedNotes = notes.map((n, i) =>
				i === editNoteIndex ? { ...note } : n
			);
			setNotes(updatedNotes);
			setEditNoteIndex(null);
		} else {
			setNotes([...notes, { ...note }]);
		}
		setNote(noteObject);
	}

	function handleEdit(index) {
		setNote({ ...notes[index] });
		setEditNoteIndex(index);
	}

	function handleRemove(index) {
		const updatedNotes = notes.filter((_, i) => i !== index);
		setNotes(updatedNotes);

		if (editNoteIndex === index) {
			setEditNoteIndex(null);
			setNote(noteObject);
		} else if (editNoteIndex !== null && index < editNoteIndex) {
			setEditNoteIndex(editNoteIndex - 1);
		}
	}

	function handleEditCancel() {
		setEditNoteIndex(null);
		setNote(initialNote);
	}

	function handleSearch() {
		
	}

	return (
		<div className="notes-app">
			<h1>Notes list:</h1>
			<form onSubmit={handleSubmit} className="notes-form">
				<input type="text" placeholder="Title"
				       value={note.title}onChange={handleTitleChange}/>
				<textarea rows="5" columns="40" placeholder="Text"
				          value={note.text} onChange={handleTextChange}>
				</textarea>
				<button type="submit">
					{ editNoteIndex !== null ? "Save Note" : "Add Note" }
				</button>
				{ editNoteIndex !== null && (
					<button type="button" onClick={handleEditCancel}>
						Cancel
					</button>
				)}
			</form>
			<ul className="notes-list">
				{notes.map((n, index) => (
					<li key={index}>
						<strong>{n.title}</strong>
						<p>{n.text}</p>
						<button onClick={() => handleEdit(index)}>Edit</button>
						<button onClick={() => handleRemove(index)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default NotesApp;

// Graphics
import "./NotesApp.css";

// Things
import React, { useState } from "react";

const noteObject = {
	title : "",
	text  : ""
};

const STATES = {
	WRITE: "write",
	EDIT:  "edit"
}

function NotesApp() {
	// Global
	const [state, setState] = useState(STATES.WRITE);
	const [notes, setNotes] = useState([]);
	const [editNoteIndex, setEditNoteIndex] = useState(null);
	const [searchQuery, setSearchQuery] = useState("");
	// Note
	const [note, setNote] = useState(noteObject);

	// Write
	function handleTitleChange(e) {
		setNote({ ...note, title: e.target.value });
	}

	function handleTextChange(e) {
		setNote({ ...note, text: e.target.value });
	}

	function handleSubmit(e) {
		e.preventDefault();

		switch(state) {
			case STATES.WRITE:
				if (!note.title.trim() && !note.text.trim())
					return;
				if (editNoteIndex !== null) {
					const updatedNotes = notes.map(
						(n, i) => i === editNoteIndex ? { ...note } : n
					);
					setNotes(updatedNotes);
					setEditNoteIndex(null);
				} else {
					setNotes([...notes, { ...note }]);
				}
				setNote(noteObject);
				break;

			case STATES.EDIT:
				setNotes(notes.map((n, i) => i === editNoteIndex ? { ...note } : n));
				setEditNoteIndex(null);
				setNote(noteObject);
				setState(STATES.WRITE);
				break;

			default:
				console.log("How did I get there?");
		}
	}

	// Edit
	function handleEditCancel() {
		setEditNoteIndex(null);
		setNote(noteObject);
		setState(STATES.WRITE);
	}

	// Search
	function handleSearch(value) {
		setSearchQuery(value)
	}

	const filteredNotes = notes
		.map((n, index) => ({ ...n, index}))
		.filter((n) =>
			n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
			n.text.toLowerCase().includes(searchQuery.toLowerCase())
	);

	// Notes list
	function handleEdit(index) {
		setState(STATES.EDIT);
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


	return (
		<div className="notes-app">
			<h1>Notes list:</h1>

			{ // Textareas
			}
			<textarea className="notes-form no-resize" rows="1" columns="40" placeholder="Title"
             value={note.title} onChange={handleTitleChange}/>
			<textarea className="notes-form" rows="5" columns="40" placeholder="Text"
             value={note.text} onChange={handleTextChange}/>

			{ // Buttons
			}
			<div className="button-row">
				{ state === STATES.WRITE ? ( <>
				<button type="button" onClick={handleSubmit}>Add Note</button>
				</> ) : null }
				{ state === STATES.EDIT ? ( <>
				<button type="button" onClick={handleSubmit}>Save Changes</button>
				<button type="button" onClick={handleEditCancel}>Cancel</button>
				</> ) : null }
			</div>

			{ // Search field
			}
			<textarea className="notes-form no-resize" rows="1" columns="40"
                placeholder="Search"
                value={searchQuery} onChange={(e) => handleSearch(e.target.value)}/>

			{ // Notes list
			}
			<ul className="notes-list">
				{filteredNotes.map((n) => (
					<li key={n.index}>
						<strong>{n.title}</strong>
						<button onClick={() => handleEdit(n.index)}>Edit</button>
						<button onClick={() => handleRemove(n.index)}>Delete</button>
					</li>
				))}
			</ul>
		</div>
	);
}

export default NotesApp;

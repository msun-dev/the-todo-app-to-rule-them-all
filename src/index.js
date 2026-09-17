// react stuff
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// apps
import './index.css';
import TodoApp from './apps/todo/TodoApp.jsx';
import NotesApp from './apps/notes/NotesApp.js';

// root
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<TodoApp class='app-block' />
		<NotesApp />
	</StrictMode>
);

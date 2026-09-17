// react stuff
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

// apps
import './index.css';
import TodoApp from './apps/todo/TodoApp.jsx';
//import NotepadApp from './apps/notepad/NotepadApp.jsx';

// root
createRoot(document.getElementById('root')).render(
	<StrictMode>
		<TodoApp />
	</StrictMode>
);

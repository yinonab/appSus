import { NotePreview } from './NotePreview.jsx'


const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote }) {
    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview notes={notes} note={note} />
                </li>
            )}
        </ul>)
}

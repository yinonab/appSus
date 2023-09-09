import { NotePreview } from './NotePreview.jsx'


const { Link } = ReactRouterDOM

export function NoteList({ notes, onRemoveNote,onSaveEditedContent,onMoveToArchive }) {
    // debugger
    return (
        <ul className="note-list">
            {notes.map(note =>
                <li key={note.id}>
                    <NotePreview notes={notes} note={note} onRemoveNote={onRemoveNote} onSaveEditedContent={onSaveEditedContent}  onMoveToArchive={onMoveToArchive} />
                </li>
            )}
        </ul>)
}

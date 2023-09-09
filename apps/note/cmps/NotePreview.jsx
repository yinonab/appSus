
import { noteService } from "../services/note.service.js"

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NotePreview({ note, onRemoveNote, onSaveEditedContent, onMoveToArchive }) {
    const { style, type, info, title } = note
    const defaultBackgroundColor = '#ddd'
    const backgroundColor = style ? style.backgroundColor || defaultBackgroundColor : defaultBackgroundColor

    const [editedTitle, setEditedTitle] = useState(info.title)
    const [editedText, setEditedText] = useState(info.txt)
    const [editedtime, setEditedtime] = useState(new Date().toLocaleString())
    const handleSave = () => {
        // Call the onSaveEditedContent function and pass the updated content
        onSaveEditedContent(note, { title: editedTitle, txt: editedText,time: editedtime });

    }

    return (
        <div>
            <article key={note.id} className="note-container" style={{ backgroundColor }}>
                {type === 'NoteTxt' && (
                    <div>
                        <h2 contentEditable="true" suppressContentEditableWarning={true} className="note-title" onInput={(e) => setEditedTitle(e.target.innerText)}>{editedTitle}</h2>
                        <p contentEditable="true" suppressContentEditableWarning={true} onInput={(e) => setEditedText(e.target.innerText)}>{editedText}</p>
                        <h5>{editedtime}</h5>
                    </div>
                )}
                {type === 'NoteImg' && (
                    <h2 contentEditable="true" suppressContentEditableWarning={true} className="note-title" onInput={(e) => setEditedTitle(e.target.innerText)}>{editedTitle}</h2>
                )}
                {type === 'NoteTodos' && (
                    <div>
                        <h2 contentEditable="true" suppressContentEditableWarning={true} className="note-title" onInput={(e) => setEditedTitle(e.target.innerText)}>{editedTitle}</h2>
                        <ul className="note-content">
                            {info.todos.map((todo, index) => (
                                <li className="note-content" key={index}>
                                    <input type="checkbox" />
                                    {/* Place the text within the same list item */}
                                    <p contentEditable="true" suppressContentEditableWarning={true} onInput={(e) => setEditedText(e.target.innerText)}>{todo.txt}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}


                <section>
                    <button className="btn" onClick={() => onRemoveNote(note.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M15 4V3H9v1H4v2h1v13c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V6h1V4h-5zm2 15H7V6h10v13z"/><path d="M9 8h2v9H9zm4 0h2v9h-2z"/></svg>
                        </button>
                    <button className="btn" onClick={() =>  onMoveToArchive(note.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M20.54 5.23l-1.39-1.68C18.88 3.21 18.47 3 18 3H6c-.47 0-.88.21-1.16.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V6.5c0-.48-.17-.93-.46-1.27zM6.24 5h11.52l.83 1H5.42l.82-1zM5 19V8h14v11H5zm11-5.5l-4 4-4-4 1.41-1.41L11 13.67V10h2v3.67l1.59-1.59L16 13.5z"/></svg>
                        </button>
                    <button className="btn" onClick={handleSave}>Close</button>
                    {/* <button><Link to={`/note/${note.id}`}>Details</Link></button> */}
                    {/* <button><Link to={`/note/${note.id}`}>Edit</Link></button> */}

                </section>
            </article>
        </div>
    );
}



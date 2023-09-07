
import { noteService } from "../services/note.service.js"

const { Link } = ReactRouterDOM
const { useState, useEffect } = React

export function NotePreview({ note, onRemoveNote, onSaveEditedContent }) {
    const { style, type, info, title } = note
    const defaultBackgroundColor = '#ddd'
    const backgroundColor = style ? style.backgroundColor || defaultBackgroundColor : defaultBackgroundColor

    const [editedTitle, setEditedTitle] = useState(info.title);
    const [editedText, setEditedText] = useState(info.txt);
    const handleSave = () => {
        // Call the onSaveEditedContent function and pass the updated content
        onSaveEditedContent(note, { title: editedTitle, txt: editedText });

    };

    return (
        <div>
            <article key={note.id} className="note-container" style={{ backgroundColor }}>
                {type === 'NoteTxt' && (
                    <div>
                        <h2 contentEditable="true" suppressContentEditableWarning={true} className="note-title" onInput={(e) => setEditedTitle(e.target.innerText)}>{editedTitle}</h2>
                        <p contentEditable="true" suppressContentEditableWarning={true} onInput={(e) => setEditedText(e.target.innerText)}>{editedText}</p>
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
                    <button onClick={handleSave}>Save</button>
                    <button onClick={() => onRemoveNote(note.id)}>❌</button>
                    {/* <button><Link to={`/note/${note.id}`}>Details</Link></button> */}
                    {/* <button><Link to={`/note/${note.id}`}>Edit</Link></button> */}

                </section>
            </article>
        </div>
    );
}



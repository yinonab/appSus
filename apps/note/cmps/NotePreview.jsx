
const { Link } = ReactRouterDOM

export function NotePreview({ note, onRemoveNote }) {
    const { style, type, info, title } = note
    const defaultBackgroundColor = '#ddd'
    const backgroundColor = style ? style.backgroundColor || defaultBackgroundColor : defaultBackgroundColor

    return (
        <div>
            <article key={note.id} className="note-container" style={{ backgroundColor }}>
                {type === 'NoteTxt' && (
                    <div>
                        <h2 className="note-title">{info.txt}</h2>
                        <h2 className="note-title">{title}</h2>
                    </div>
                )}
                {type === 'NoteImg' && (
                    <h2 className="note-title">{info.title}</h2>
                )}
                {type === 'NoteTodos' && (
                    <div>
                        <h2 className="note-title">{info.title}</h2>
                        <ul className="note-content ">
                            {info.todos.map((todo, index) => (
                                <li className="note-content " key={index}>
                                    <input className="check" type="checkbox" />
                                    <label>{todo.txt}</label>
                                </li>
                            ))}
                        </ul>

                    </div>
                )}
                <section>

                    <button onClick={() => onRemoveNote(note.id)}>❌</button>
                    <button><Link to={`/note/${note.id}`}>Details</Link></button>
                    {/* <button><Link to={`/note/${note.id}`}>Edit</Link></button> */}

                </section>
            </article>
        </div>
    );
}



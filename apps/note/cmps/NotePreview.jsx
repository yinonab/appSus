export function NotePreview({ note }) {
    const { style, type, info } = note
    const defaultBackgroundColor = '#ddd'
    const backgroundColor = style ? style.backgroundColor || defaultBackgroundColor : defaultBackgroundColor

    return (
        <div>
            <article key={note.id} className="note-container" style={{ backgroundColor }}>
                {type === 'NoteTxt' && (
                    <h2 className="note-title">{info.txt}</h2>
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
                    <button className="note-button" onClick={() => onRemoveNote(note.id)}></button>
                    {/* <button><Link to={`/note/${note.id}`}>Details</Link></button>
                        <button><Link to={`/note/edit/${note.id}`}>Edit</Link></button> */}
                </section>
            </article>
        </div>
    );
}



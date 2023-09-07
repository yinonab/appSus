import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function NoteEdit({ note, onSetNote }) {

    const [showTitleInput, setShowTitleInput] = useState(false);
    const [noteToEdit, setNoteToEdit] = useState(note)
    const params = useParams()

    useEffect(() => {
        onSetNote(noteToEdit)
        if (params.noteId) loadNote()
    }, [noteToEdit])

    function loadNote() {
        noteService.get(params.noteId)
            .then(setNoteToEdit)
            .catch(err => console.log('err:', err))
    }

    function handleChange({ target }) {
        const field = target.name;
        let value = target.value;

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || '';
                break;

            case 'checkbox':
                value = target.checked;
                break;

            default:
                break;
        }

        setNoteToEdit(prevNoteToEdit => {
            const info = { ...prevNoteToEdit.info };
            info[field] = value;
            return { ...prevNoteToEdit, info };
        });
    }



    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                // Clear the input fields after saving
                setNoteToEdit({ ...note, info: { title: '' }, info: { txt: '' } })
                setShowTitleInput(false); // Reset the showTitleInput state
                showSuccessMsg(`Added/Edited successfully! ${noteToEdit.id}`)
            })
            .catch(err => {
                console.log('err:', err);
                showErrorMsg('Problem Adding/Editing ' + noteToEdit.id)
            });
    }


    const handleTitleClick = () => {
        setShowTitleInput(true);
    };
    const { txt, title } = noteToEdit.info

    return (
        <section className="note-edit">
            <form className="edit-form" onSubmit={onSaveNote} >
                {showTitleInput && (
                    <div>
                        <label htmlFor="info"></label>
                        <input className="input"
                            onChange={handleChange}
                            placeholder="    Title"
                            value={title}
                            type="text"
                            name="title"
                            id="title"
                        />
                    </div>
                )}
                <label htmlFor="info"></label>
                <input className="input" onChange={handleChange}
                    onClick={handleTitleClick}
                    placeholder="    Take a note..." value={txt}
                    type="text" name="txt" id="txt" />
                <div className="btn-footer">
                    {/* <button><i class="fa-light fa-palette"></i></button> */}
                    <button className="Close"></button>
                </div>





                {/* <label htmlFor="listPrice">Price: </label>
                <input onChange={handleChange} value={amount} type="number" name="listPrice" id="listPrice" /> */}

            </form>
        </section>
    )
}



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
    const handleTitleClick = () => {
        setShowTitleInput(true);
    };
    function handleChange({ target }) {
        console.log('target:', target)
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value || ''
                break;

            case 'checkbox':
                value = target.checked
                break

            default:
                break;
        }

        if (field === 'info') {
            const info = { ...noteToEdit.info }
            console.log('field:', field)
            console.log('info:', info)
            info.txt = value
            console.log('txt:', txt)

            setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: info }))
            return
        }
        setNoteToEdit(prevNoteToEdit => ({ ...prevNoteToEdit, [field]: value }))
    }


    function onSaveNote(ev) {
        ev.preventDefault()
        noteService.save(noteToEdit)
            .then(() => {
                // navigate('/note')
                onSetNote(noteToEdit)
                showSuccessMsg(`Added/Edited successfully! ${noteToEdit.id}`)
            })
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Problem Adding/Editing ' + noteToEdit.id)
            })
    }
    const { info: { txt },title } = noteToEdit
    return (
        <section className="note-edit">
            <form onSubmit={onSaveNote} >
                {showTitleInput && (
                    <div>
                        <label htmlFor="title"></label>
                        <input
                            onChange={handleChange}
                            placeholder="Title"
                            value={title}
                            type="text"
                            name="title"
                            id="title"
                        />
                    </div>
                )}
                <label htmlFor="info"></label>
                <input onChange={handleChange} onClick={handleTitleClick} placeholder="Take a note..." value={txt} type="text" name="info" id="info" />

                

                {/* <label htmlFor="listPrice">Price: </label>
                <input onChange={handleChange} value={amount} type="number" name="listPrice" id="listPrice" /> */}

                <button>Save</button>
            </form>
        </section>
    )
}



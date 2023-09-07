import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteEdit } from "../views/EditNote.jsx"


const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [note, setNote] = useState(noteService.getEmptyNote())

    useEffect(() => {
        console.log('mount')
        noteService.query().then(setNotes)
    }, [note])

    function onRemoveNote(noteId) {
        noteService.remove(noteId).then(() => {
            setNotes(prevNotes => prevNotes.filter(note => note.id !== noteId))
            showSuccessMsg(`Note Removed! ${noteId}`)
        })
        .catch(err => {
            console.log('err:', err)
            showErrorMsg('Problem Removing ' + noteId)
        })
    }
    function onSetNote(note) {
        setNote(prevNote => ({ ...prevNote, ...note }))
    }

    console.log('render')
    if (!notes) return <div>Loading...</div>
    return (<section className="note-index">
        {/* <BookFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
        {/* <Link to="/note" >Add Book</Link> */}
        <NoteEdit note={note} onSetNote={onSetNote} />
        <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </section>)
}

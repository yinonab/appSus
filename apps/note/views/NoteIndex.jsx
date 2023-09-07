import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteEdit } from "../views/EditNote.jsx"
import { NoteFilter } from "../views/NoteFilter.jsx"


const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())

    useEffect(() => {
        noteService.query().then(setNotes);
    }, [note]);

    useEffect(() => {
        noteService.query(filterBy).then(setNotes);
    }, [filterBy]);

    // function onSaveNote(note){
    //     noteService.save(note).then(savedNote=>{
    //         const updatedNoted= notes.map(n=> n.id === savedNote.id? savedNote : n);
    //         setNotes(updatedNoted)
    //     })
    // }

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
    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    if (!notes) return <div>Loading...</div>
    return (<section className="note-index">
        <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
        {/* <Link to="/note" >Add Book</Link> */}
        <NoteEdit note={note} onSetNote={onSetNote} />
        <NoteList notes={notes} onRemoveNote={onRemoveNote} />
    </section>)
}

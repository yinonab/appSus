import { noteService } from "../services/note.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { NoteList } from "../cmps/NoteList.jsx"
import { NoteEdit } from "../views/EditNote.jsx"
import { NoteFilter } from "../views/NoteFilter.jsx"
import { FilterSide } from "./FilterSide.jsx"
// import { NotePreview } from "../cmps/NotePreview.jsx"


const { useState, useEffect } = React
const { Link } = ReactRouterDOM

export function NoteIndex() {

    const [notes, setNotes] = useState(null)
    const [note, setNote] = useState(noteService.getEmptyNote())
    const [filterBy, setFilterBy] = useState(noteService.getDefaultFilter())
    const [showDeleted, setShowDeleted] = useState(false);


    useEffect(() => {
        noteService.query().then(setNotes);
    }, [note]);

    useEffect(() => {
        noteService.query({ ...filterBy, showDeleted }).then(setNotes);
    }, [filterBy, showDeleted]);

    // function onSaveNote(note){
    //     noteService.save(note).then(savedNote=>{
    //         const updatedNoted= notes.map(n=> n.id === savedNote.id? savedNote : n);
    //         setNotes(updatedNoted)
    //     })
    // }

    function onRemoveNote(noteId) {
        noteService.get(noteId).then((deletedNote) => {
            deletedNote.isDeleted = true;
            noteService.save(deletedNote).then(() => {
                setNotes((prevNotes) =>
                    prevNotes.map((note) =>
                        note.id === noteId ? { ...note, isDeleted: true } : note
                    )
                );
    
                // Update filterBy to trigger the useEffect
                setFilterBy((prevFilter) => ({
                    ...prevFilter,
                    _dummyKey: Math.random(), // Change _dummyKey to force re-render
                }));
    
                showSuccessMsg(`Note Deleted!`);
            });
        });
    }
    
    function toggleShowActive() {
        setShowDeleted(false);
    }

    // Function to toggle showing deleted notes
    function toggleShowDeleted() {
        setShowDeleted(true);
    }
    function onSetNote(note) {
        setNote(prevNote => ({ ...prevNote, ...note }))
    }
    function onSetFilterBy(filterBy) {
        console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    function onSaveEditedContent(note, editedContent) {
        console.log('variable:', note, editedContent)
        note.info.title = editedContent.title;
        note.info.txt = editedContent.txt;
        note.time = Date.now();
        noteService.save(note)
        showSuccessMsg(`Note Updated!`)
        // Implement the logic to save edited content here
        // This function should update the notes data with the edited content
        console.log(`Saving edited content for noteId ${note}:`, editedContent);
    }
    if (!notes) return <div>Loading...</div>
    return (
        <section className="note-index">
            <aside className="header">
                <FilterSide />
            </aside>
            <main className="main">
                <NoteFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
                <NoteEdit note={note} onSetNote={onSetNote} />
                <div>
                <button onClick={toggleShowActive}>Show Active Notes</button>
            <button onClick={toggleShowDeleted}>Show Deleted Notes</button>
                </div>
                <NoteList
                    notes={notes}
                    onSaveEditedContent={onSaveEditedContent}
                    onRemoveNote={onRemoveNote}
                />
            </main>
        </section>
    );
    }    
    
    
    
    
    

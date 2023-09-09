const { useState, useEffect } = React

export function NoteFilter({ filterBy, onSetFilterBy }) {
    const [filterByToEdit, setFilterByToEdit] = useState(filterBy)

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
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
        const info = { ...filterByToEdit.info }
        console.log('info:', info)
        info[field] = value
        setFilterByToEdit(prevFilterByToEdit => ({ ...prevFilterByToEdit, info: info }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { txt, title } = filterByToEdit.info
    return (
        <section className="note-filter">
            <form className="filter-form" onSubmit={onSubmitFilter}>
                <button className="search"><i className="fa-solid fa-magnifying-glass"></i></button>
                <label htmlFor="info"></label>
                <input className="input" onChange={handleChange}
                    placeholder="Search Title..." value={title}
                    type="title" name="title" id="title" />

                <label htmlFor="info"></label>
                <input className="input" onChange={handleChange}
                placeholder="Search Text..."
                     value={txt}
                    type="text" name="txt" id="txt" />

            </form>
        </section>
    )
}
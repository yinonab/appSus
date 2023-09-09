

const { Link } = ReactRouterDOM
const { useState, useEffect } = React
export function FilterSide({ toggleShowNotDeletedOrArchived, toggleShowDeleted, toggleShowArchived }) {
    return (
        <div className="filter-side">
            <button onClick={toggleShowNotDeletedOrArchived}>Notes</button>
            <button onClick={toggleShowDeleted}>Deleted</button>
            <button onClick={toggleShowArchived}>Archived</button>
        </div>
    );
}




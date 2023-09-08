

const { Link } = ReactRouterDOM
const { useState, useEffect } = React
export function FilterSide({ toggleShowNotDeletedOrArchived, toggleShowDeleted, toggleShowArchived }) {
    return (
        <div className="filter-side">
            <button onClick={toggleShowNotDeletedOrArchived}>Show Not Deleted or Archived Notes</button>
            <button onClick={toggleShowDeleted}>Show Deleted Notes</button>
            <button onClick={toggleShowArchived}>Show Archived Notes</button>
        </div>
    );
}




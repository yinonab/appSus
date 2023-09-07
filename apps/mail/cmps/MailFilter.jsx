const { useState, useEffect } = React;

export function MailFilter({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  useEffect(() => {
    onSetFilterBy(filterByToEdit);
  }, [filterByToEdit]);

  function handleChange({ target }) {
    const field = target.name;
    let value = target.value;

    switch (target.type) {
      case "number":
      case "range":
        value = +value || "";
        break;

      case "checkbox":
        value = target.checked;
        break;

      default:
        break;
    }

    setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }));
  }
  function onSubmitFilter(ev) {
    ev.preventDefault();
    onSetFilterBy(filterByToEdit);
  }

  const { txt, isRead } = filterByToEdit || {};
  return (
    // <section className="mail-filter flex ">
    <React.Fragment>
      <form onSubmit={onSubmitFilter}>
        <label htmlFor="txt">
          <input
            onChange={handleChange}
            value={txt}
            id="txt"
            name="txt"
            type="text"
            placeholder="Search email"
          />
          <label className="is-read-label" htmlFor="isRead">
            unread
            <input
              onChange={handleChange}
              value={isRead || false}
              id="isRead"
              name="isRead"
              type="checkbox"
            />
          </label>
        </label>
      </form>
      <div className="logo-container">
        <i className="fa-regular fa-envelope"></i>
        <div className="logo">EmailMaster</div>
      </div>
    </React.Fragment>
    // </section>
  );
}

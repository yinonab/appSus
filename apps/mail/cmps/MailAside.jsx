const { useState, useEffect } = React;
const { useNavigate } = ReactRouterDOM;

export function MailAside({ filterBy, onSetFilterBy }) {
  const [filterByToEdit, setFilterByToEdit] = useState(filterBy);
  const navigate = useNavigate();
  useEffect(() => {
    onSetFilterBy(filterByToEdit);
    console.log(filterByToEdit);
  }, [filterByToEdit]);
  function getInbox() {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, status: "inbox" }));
    // onSetFilterBy(filterByToEdit);
    // console.log(filterByToEdit);
  }
  function getTrash() {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, status: "trash" }));
    // onSetFilterBy(filterByToEdit);
    // console.log(filterByToEdit);
  }
  function getStarred() {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, status: "star" }));
  }
  function getSent() {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, status: "sent" }));
  }
  function getAll() {
    setFilterByToEdit((prevFilter) => ({ ...prevFilter, status: "" }));
  }
  return (
    <section className="mail-aside flex column">
      {/* <button>Inbox</button>
      <button>Starred</button>
      <button>Sent</button> */}
      <button onClick={() => navigate("/mail/send")}>
        <span>Send</span>
        <i className="fa-solid fa-paper-plane"></i>
      </button>
      <button onClick={getAll} className="btn flex space-between">
        <span>All</span>
        {/* <i className="fa-solid fa-inbox"></i> */}
      </button>
      <button onClick={getInbox} className="btn flex space-between">
        <span>Inbox</span>
        <i className="fa-solid fa-inbox"></i>
      </button>
      <button onClick={getStarred} className="btn flex space-between">
        <span>Starred</span>
        <i className="fa-solid fa-star"></i>
      </button>
      <button onClick={getSent} className="btn flex space-between">
        <span>Sent</span>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
      <button onClick={getTrash} className="btn flex space-between">
        <span>Trash</span>
        <i className="fa-solid fa-trash"></i>
      </button>
    </section>
  );
}

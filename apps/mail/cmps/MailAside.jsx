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
      <button
        title="Send mail"
        className="compose-mail-btn"
        onClick={() => navigate("/mail/send")}
      >
        <i className="fa-solid fa-paper-plane"></i>
      </button>
      <button title="All emails" onClick={getAll} className="btn">
        <span>All</span>
        {/* <i className="fa-solid fa-inbox"></i> */}
      </button>
      <button title="Inbox" onClick={getInbox} className="btn ">
        <i className="fa-solid fa-inbox"></i>
      </button>
      <button title="Stars emails" onClick={getStarred} className="btn">
        <i className="fa-solid fa-star"></i>
      </button>
      <button title="Sent emails" onClick={getSent} className="btn">
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
      <button title="Trash" onClick={getTrash} className="btn">
        <i className="fa-solid fa-trash"></i>
      </button>
    </section>
  );
}

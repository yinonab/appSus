export function MailAside() {
  return (
    <section className="mail-aside flex column">
      {/* <button>Inbox</button>
      <button>Starred</button>
      <button>Sent</button> */}
      <button className="btn flex space-between">
        <span>Inbox</span>
        <i className="fa-solid fa-inbox"></i>
      </button>
      <button className="btn flex space-between">
        <span>Starred</span>
        <i className="fa-solid fa-star"></i>
      </button>
      <button className="btn flex space-between">
        <span>Sent</span>
        <i className="fa-solid fa-arrow-right-from-bracket"></i>
      </button>
      <button className="btn flex space-between">
        <span>Trash</span>
        <i className="fa-solid fa-trash"></i>
      </button>
    </section>
  );
}

import { mailService } from "../services/mail-service.js";
import { MailList } from "../../../cmps/mailList.jsx";
import { MailFilter } from "../cmps/MailFilter.jsx";
import { MailAside } from "../cmps/MailAside.jsx";
const { useState, useEffect } = React;
export function MailIndex() {
  const [mails, setMails] = useState(null);
  const [filterBy, setFilterBy] = useState(mailService.getDefaultFilter());
  useEffect(() => {
    mailService
      .query(filterBy)
      .then(setMails)
      .catch((err) => console.log(err));
  }, [filterBy]);

  function onSetFilterBy(filterBy) {
    setFilterBy((prevFilter) => ({ ...prevFilter, ...filterBy }));
  }
  if (!mails) return <h1>Loading..</h1>;
  return (
    <section className="mail-index">
      <div className="mail-filter flex">
        <MailFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      </div>
      <main>
        <MailList emails={mails} />
      </main>
      <aside>
        <MailAside filterBy={filterBy} onSetFilterBy={onSetFilterBy} />
      </aside>
    </section>
  );
}

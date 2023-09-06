import { mailService } from "../services/mail-service.js";
import { utilService } from "../../../services/util.service.js";
const { useState } = React;
const { useNavigate } = ReactRouterDOM;
export function MailCompose() {
  const [to, setTo] = useState("");
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const userEmail = mailService.getUser().email;
  //   console.log(userEmail);
  const inputStyles = {
    width: "50%",
    minHeight: "200px",
    fontSize: "16px",
    padding: "10px",
    border: "1px solid black",
  };
  function handleToChange(ev) {
    setTo(ev.target.value);
  }
  function handleTitleChange(ev) {
    setTitle(ev.target.value);
  }
  function handleMessageChange(ev) {
    setMessage(ev.target.value);
  }
  function handleSubmit(ev) {
    ev.preventDefault();
    const newEmail = {
      body: message,
      from: userEmail,
      isRead: false,
      sentAt: new Date(),
      removedAt: null,
      status: "sent",
      subject: title,
      to,
    };

    mailService.save(newEmail).then(() => {
      setTo("");
      setTitle("");
      setMessage("");
      navigate("/mail");
    });
  }

  return (
    <section className="mail-compose flex column space-between">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">To:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter valid email address"
            value={to}
            onChange={handleToChange}
          />
        </div>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            onChange={handleTitleChange}
            type="text"
            name="title"
            id="title"
            value={title}
          />
        </div>
        <div>
          {/* <label htmlFor="msg">Message</label> */}
          <textarea
            placeholder="Type your message"
            style={inputStyles}
            onChange={handleMessageChange}
            value={message}
            // style={inputStyles}
          />
        </div>
        <button>send</button>
      </form>
    </section>
  );
}

const { useParams, useNavigate } = ReactRouterDOM;
const { useEffect, useState } = React;
import { mailService } from "../../../services/mail-service.js";

export function MailDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const [mail, setMail] = useState(null);
  useEffect(() => {
    mailService
      .get(params.mailId)
      .then(setMail)
      .catch((err) => console.log(err));
  }, []);
  // console.log(mail);
  function onRemoveMail() {
    mailService.remove(params.mailId).then(navigate("/mail"));
  }
  // console.log(mail);

  if (!mail) return <h1>Loading...</h1>;
  return (
    <section className="mail-details">
      <h1>Email from: {mail.from}</h1>
      <div className="mail-content">
        <h2>{mail.subject}</h2>
        <p>{mail.body}</p>
        <div className="btn-container">
          <button onClick={onRemoveMail}>Delete</button>
          <button
            onClick={() => {
              navigate("/mail");
            }}
          >
            Back{" "}
          </button>
        </div>
      </div>
    </section>
  );
}

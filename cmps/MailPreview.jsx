const { useNavigate } = ReactRouterDOM;
const { useState } = React;
import { mailService } from "../apps/mail/services/mail-service.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function MailPreview({ mail }) {
  const navigate = useNavigate();
  const [isStarred, setIsStarred] = useState(false);
  const date = new Date(mail.sentAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  function onCLickMail() {
    mail.isRead = true;
    mailService.save(mail);
    console.log(mail);
    navigate(`/mail/${mail.id}`);
  }
  function addAndRemoveStar(ev) {
    ev.preventDefault;
    if (mail.isStarred) {
      mail.isStarred = false;
      mailService.save(mail).then(() => setIsStarred(false));
    } else {
      mail.isStarred = true;
      mailService.save(mail).then(() => setIsStarred(true));
    }
  }
  return (
    <tbody>
      <tr>
        <td onClick={onCLickMail} className="bold">
          {mail.subject}
        </td>
        <td onClick={onCLickMail}>{mail.body}</td>
        <td onClick={onCLickMail} className="bold">
          {formattedDate}
        </td>
        <td onClick={addAndRemoveStar}>
          <button>
            <i
              style={mail.isStarred ? { color: "gold" } : { color: "black" }}
              className="fa-solid fa-star"
            ></i>
          </button>
        </td>
      </tr>
    </tbody>
  );
}

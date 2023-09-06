const { useNavigate } = ReactRouterDOM;
import { mailService } from "../apps/mail/services/mail-service.js";

export function MailPreview({ mail }) {
  const navigate = useNavigate();
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
  return (
    <tbody>
      <tr onClick={onCLickMail}>
        <td className="bold">{mail.subject}</td>
        <td>{mail.body}</td>
        <td className="bold">{formattedDate}</td>
      </tr>
    </tbody>
  );
}

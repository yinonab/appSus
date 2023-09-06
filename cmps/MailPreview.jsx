const { useNavigate } = ReactRouterDOM;
export function MailPreview({ mail }) {
  const navigate = useNavigate();
  const date = new Date(mail.sentAt);
  const formattedDate = date.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
  });
  return (
    <tbody>
      <tr
        onClick={() => {
          // mail.isRead = true;
          navigate(`/mail/${mail.id}`);
        }}
      >
        <td className="bold">{mail.subject}</td>
        <td>{mail.body}</td>
        <td className="bold">{formattedDate}</td>
      </tr>
    </tbody>
  );
}

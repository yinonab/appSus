import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "../apps/mail/services/mail-service.js";
const { useState, useEffect } = React;

export function MailList({ emails }) {
  return (
    <table className="mail-list">
      {emails.map((email) => {
        return <MailPreview key={email.id} mail={email} />;
      })}
    </table>
  );
}

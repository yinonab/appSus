import { MailPreview } from "./MailPreview.jsx";
import { mailService } from "../services/mail-service.js";
const { useState, useEffect } = React;

export function MailList({ emails }) {
  return (
    <table>
      {emails.map((email) => {
        return <MailPreview key={email.id} mail={email} />;
      })}
    </table>
  );
}

import React, { useState, useEffect } from "react";
import { fetchEmails, searchEmails } from "../api";
import EmailDetails from "./EmailDetails";
import SearchBar from "./SearchBar";

const EmailList = ({ filter }) => {
  const [emails, setEmails] = useState([]);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [open, setOpen] = useState(false); // Manage modal visibility

  useEffect(() => {
    const loadEmails = async () => {
      try {
        const data = searchQuery
          ? await searchEmails(searchQuery)
          : await fetchEmails();
        setEmails(data || []);
      } catch (error) {
        console.error("Error fetching emails:", error);
      }
    };
    loadEmails();
  }, [searchQuery]);

  const handleOpen = (email) => {
    setSelectedEmail(email);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedEmail(null);
  };

  const filteredEmails = filter
    ? emails.filter((email) => email._source.category === filter)
    : emails;

  return (
    <div className="email-container">
      <SearchBar setSearchQuery={setSearchQuery} />

      <div className="email-list">
        {filteredEmails.length === 0 ? (
          <p className="no-emails">No emails found</p>
        ) : (
          filteredEmails.map((email) => (
            <div
              key={email._id}
              className="email-item"
              onClick={() => handleOpen(email)}
            >
              <h4>{email._source.subject}</h4>
              <p>
                {typeof email._source.text === "string"
                  ? email._source.text.substring(0, 80) + "..."
                  : "No preview available"}
              </p>
            </div>
          ))
        )}
      </div>

      {/* Email Details Popup */}
      {selectedEmail && (
        <EmailDetails email={selectedEmail} open={open} onClose={handleClose} />
      )}
    </div>
  );
};

export default EmailList;

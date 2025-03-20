import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
} from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

const EmailDetails = ({ email, open, onClose }) => {
  if (!email || !email._source) return null;

  // Extract HTML or plain text safely
  const emailBody = email._source.textAsHtml || "No content available";

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="md">
      <DialogTitle>
        {email._source.subject}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          style={{ position: "absolute", right: 10, top: 10 }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Typography variant="subtitle1">
          <strong>From:</strong> {email._source.from.value[0].name || "Unknown"}
        </Typography>
        <Typography
          variant="subtitle2"
          style={{ color: "#777", marginBottom: "10px" }}
        >
          <strong>Category:</strong> {email._source.category || "Uncategorized"}
        </Typography>

        {/* Render HTML safely */}
        {email._source.textAsHtml ? (
          <div
            style={{ marginTop: "10px", color: "#444", lineHeight: "1.5" }}
            dangerouslySetInnerHTML={{ __html: emailBody }}
          />
        ) : (
          <Typography
            variant="body1"
            style={{ marginTop: "10px", color: "#444" }}
          >
            {emailBody}
          </Typography>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default EmailDetails;

import Imap from "node-imap";
import dotenv from "dotenv";
import { simpleParser } from "mailparser";
import { indexEmail } from "../config/elasticsearch.js";
import { categorizeEmail } from "../services/categorize.js";
import { sendSlackNotification } from "../services/slack.js";
import { triggerWebhook } from "../services/webhook.js";
dotenv.config();

const accessToken = process.env.GOOGLE_ACCESS_TOKEN;

// ✅ Correct XOAUTH2 Token Format
const xoauth2 = Buffer.from(
  `user=${process.env.IMAP_USER}\x01auth=Bearer ${accessToken}\x01\x01`
).toString("base64");

const imap = new Imap({
  user: process.env.IMAP_USER,
  xoauth2: xoauth2, // Use the corrected format
  host: "imap.gmail.com",
  port: 993,
  tls: true,
  connTimeout: 10000,
  authTimeout: 10000,
  debug: console.log,
});

export const startIMAP = () => {
  imap.once("ready", () => {
    console.log("✅ IMAP Connected!");
    imap.openBox("INBOX", false, (err, box) => {
      if (err) throw err;
      console.log("📥 INBOX Opened. Fetching emails...");
      fetchEmails();
    });
  });

  imap.once("error", (err) => console.error("❌ IMAP error:", err));
  imap.once("end", () => console.log("🔌 IMAP connection ended"));

  imap.connect();
  imap.on("mail", (numNewMessages) => {
    console.log(`📩 New email received! (${numNewMessages} new messages)`);
    fetchEmails();
  });
};
const fetchEmails = () => {
  imap.search(["UNSEEN"], (err, results) => {
    if (err) return console.error("❌ Error searching emails:", err);
    if (!results.length) return console.log("📭 No new unread emails.");

    const fetch = imap.fetch(results, { bodies: "" });

    fetch.on("message", (msg, seqno) => {
      msg.on("body", (stream) => {
        simpleParser(stream, async (err, parsed) => {
          if (err) return console.error("❌ Error parsing email:", err);

          parsed.category = categorizeEmail(parsed.text);
          await indexEmail(parsed);
          await sendSlackNotification(parsed);
          await triggerWebhook(parsed);

          console.log(`📬 Email Categorized as: ${parsed.category}`);
        });
      });
    });

    fetch.on("error", (fetchErr) => console.error("❌ Fetch error:", fetchErr));
  });
};
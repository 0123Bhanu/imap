import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const CLIENT_ID =
  "136651851218-u0l54auh4n3g6j8lg8nr35n3qrqvdi29.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI = "http://localhost:3000";
const SCOPES = ["https://mail.google.com/"];

const oAuth2Client = new OAuth2Client(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);

const getAuthURL = async () => {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: SCOPES,
  });
  console.log("Authorize this app by visiting this URL:", authUrl);
};

getAuthURL();
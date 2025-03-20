import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config(); // Load .env variables

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const REDIRECT_URI = process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000";

const oAuth2Client = new OAuth2Client(
  "136651851218-u0l54auh4n3g6j8lg8nr35n3qrqvdi29.apps.googleusercontent.com",
  "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",
  "http://localhost:3000"
);

const getToken = async (code) => {
  try {
    const { tokens } = await oAuth2Client.getToken(code);
    console.log("✅ Access Token:", tokens.access_token);
    console.log("🔄 Refresh Token:", tokens.refresh_token);
  } catch (error) {
    console.error(
      "❌ Error retrieving access token:",
      error.response?.data || error.message
    );
  }
};

// Replace 'YOUR_AUTHORIZATION_CODE' with the code you received from getToken.js
getToken(
  "4/0AQSTgQETpNGv5sAZNrAAiUp3rH3jDGHenUWjMe4ZwravHSlAvwKir9_L6aBIUezNjyuycA"
);

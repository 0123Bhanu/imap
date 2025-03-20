import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

export const oAuth2Client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "http://localhost:3000" // Redirect URI
);

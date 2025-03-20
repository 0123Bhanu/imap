import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const WEBHOOK_URL = process.env.WEBHOOK_URL;

export const triggerWebhook = async (email) => {
  if (!WEBHOOK_URL) {
    console.error("❌ WEBHOOK_URL is missing in .env");
    return;
  }

  if (email.category === "Interested") {
    try {
      await axios.post(WEBHOOK_URL, { email });
      console.log("✅ Webhook Triggered Successfully!");
    } catch (error) {
      console.error("❌ Failed to trigger webhook:", error.message);
    }
  }
};

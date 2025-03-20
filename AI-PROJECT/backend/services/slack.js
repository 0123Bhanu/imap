import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const SLACK_WEBHOOK_URL = process.env.SLACK_WEBHOOK_URL;

export const sendSlackNotification = async (email) => {
  if (!SLACK_WEBHOOK_URL) {
    console.error("❌ SLACK_WEBHOOK_URL is missing in .env");
    return;
  }

  if (email.category === "Interested") {
    try {
      await axios.post(SLACK_WEBHOOK_URL, {
        text: `📩 New Interested Email: ${email.subject} from ${email.from}`,
      });
      console.log("✅ Slack Notification Sent!");
    } catch (error) {
      console.error("❌ Failed to send Slack notification:", error);
    }
  }
};

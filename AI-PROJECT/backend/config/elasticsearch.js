import { Client } from "@elastic/elasticsearch";
import dotenv from "dotenv";

dotenv.config();

const ELASTICSEARCH_URL =
  process.env.ELASTICSEARCH_URL || "http://localhost:9200";

export const esClient = new Client({ node: ELASTICSEARCH_URL });

export const indexEmail = async (email) => {
  await esClient.index({
    index: "emails",
    document: email,
  });
  console.log(`✅ Indexed email: ${email.subject}`);
};

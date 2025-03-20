import express from "express";
import { esClient } from "../config/elasticsearch.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const response = await esClient.search({
      index: "emails",
      body: {
        query: { match_all: {} },
      },
    });

    console.log("Elasticsearch Raw Response:", response);
    console.log("Elasticsearch Hits:", response?.hits?.hits || "No hits found");

    res.json(response.hits.hits);
  } catch (error) {
    console.error("Elasticsearch Query Error:", error);
    res
      .status(500)
      .json({ error: "Elasticsearch query failed", details: error.message });
  }
});

router.get("/search", async (req, res) => {
  try {
    const { query } = req.query;
    if (!query) {
      return res.status(400).json({ error: "Query parameter is required" });
    }

    const response = await esClient.search({
      index: "emails",
      body: {
        query: {
          match: { subject: query },
        },
      },
    });

    console.log("Elasticsearch Response:", JSON.stringify(response, null, 2));
    res.json(response.hits?.hits || []);
  } catch (error) {
    console.error("Elasticsearch Query Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

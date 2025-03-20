import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/emails";

export const fetchEmails = async () => {
  const res = await axios.get(API_BASE_URL);
  return res.data;
};

export const searchEmails = async (query) => {
  const res = await axios.get(`${API_BASE_URL}/search?query=${query}`);
  return res.data;
};

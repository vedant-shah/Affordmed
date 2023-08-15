const express = require("express");
const axios = require("axios");

const app = express();
const PORT = 8008;

app.get("/numbers", async (req, res) => {
  const urls = req.query.url;

  if (!urls) {
    return res.status(400).json({ error: "Missing URL parameter" });
  }

  const urlList = Array.isArray(urls) ? urls : [urls];

  const fetchDataPromises = urlList.map(async (url) => {
    try {
      const response = await axios.get(url, { timeout: 500 });
      console.log(`Response from ${url}:`, response.data);
      if (response.data && Array.isArray(response.data.numbers)) {
        return response.data.numbers;
      } else {
        console.error(`Invalid response structure from ${url}`);
        return [];
      }
    } catch (error) {
      console.error(`Error fetching data from ${url}: ${error.message}`);
      return [];
    }
  });

  try {
    const allNumbers = await Promise.all(fetchDataPromises);
    const mergedNumbers = [...new Set(allNumbers.flat())].sort((a, b) => a - b);
    res.json({ numbers: mergedNumbers });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const express = require("express");
const axios = require("axios");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 8080;

app.use(cors());

app.use(express.json());

app.post("/create-web-call", async (req, res) => {
  const { agent_id, metadata, retell_llm_dynamic_variables } = req.body;
  const payload = { agent_id };

  if (metadata) {
    payload.metadata = metadata;
  }

  if (retell_llm_dynamic_variables) {
    payload.retell_llm_dynamic_variables = retell_llm_dynamic_variables;
  }

  try {
    const response = await axios.post(
      `${process.env.API_RETELLAI}/v2/create-web-call`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(201).json(response.data);
  } catch (error) {
    console.error(
      "Error creating web call:",
      error.response?.data || error.message
    );
    res.status(500).json({ error: "Failed to create web call" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
import axios from "axios";
import Cors from "cors";

// Initialize the cors middleware
const cors = Cors({
  methods: ["POST", "HEAD"],
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  await runMiddleware(req, res, cors);

  if (req.method === "POST") {
    const { agent_id, metadata, retell_llm_dynamic_variables } = req.body;

    // Prepare the payload for the API request
    const payload = { agent_id };

    // Conditionally add optional fields if they are provided
    if (metadata) {
      payload.metadata = metadata;
    }

    if (retell_llm_dynamic_variables) {
      payload.retell_llm_dynamic_variables = retell_llm_dynamic_variables;
    }

    try {
      const response = await axios.post(
        "https://api.retellai.com/v2/create-web-call",
        payload,
        {
          headers: {
            Authorization: "Bearer YOUR_API_KEY", // Replace with your actual Bearer token
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
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

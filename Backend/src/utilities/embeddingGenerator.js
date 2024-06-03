const axios = require("axios");

async function getEmbedding(query) {
  // Define the OpenAI API url and key.
  const url =
    "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2";
  const hf_key = "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"; // Replace with your OpenAI key.

  // Call OpenAI API to get the embeddings.
  let response = await axios.post(
    url,
    {
      inputs: query,
    },
    {
      headers: {
        Authorization: `Bearer ${hf_key}`,
        "Content-Type": "application/json",
      },
    }
  );

  if (response.status === 200) {
    return response.data;
  } else {
    throw new Error(`Failed to get embedding. Status code: ${response.status}`);
  }
}
module.exports = getEmbedding;

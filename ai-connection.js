import Groq from "groq-sdk";
import dotenv from "dotenv";

//key should be in a file in the root directory called ".env"
//and the key should be an environment variable called API_KEY
let api_key;
dotenv.config({
    path: "./.env"
});

if (process.env.API_KEY) {
    api_key = process.env.API_KEY;
}
else {
    //warn in the console; DEBUG BEHAVIOR
    console.log("No Groq Cloud API Key detected. Sign up for a free Groq Cloud account and get a key at https://console.groq.com/keys");
}

//(mostly) boilerplate init code, grabbed shamelessly from https://console.groq.com/docs/libraries
if (process.env.API_KEY) {
    const llm = new Groq({ apiKey: api_key});
}

//TODO: get the following functions to play nice
export async function main() {
  const chatCompletion = await getGroqChatCompletion();
  // Print the completion returned by the LLM.
  console.log(chatCompletion.choices[0]?.message?.content || "");
}

export async function getGroqChatCompletion() {
  return llm.chat.completions.create({
    messages: [
      {
        role: "user",
        content: "Explain the importance of fast language models",
      },
    ],
    model: "llama-3.3-70b-versatile",
  });
}
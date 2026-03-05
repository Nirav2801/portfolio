import "dotenv/config";
import { embeddings } from "./src/lib/huggingfaceClient";
import { supabase } from "./src/lib/supabaseClient";
import { ChatGroq } from "@langchain/groq";

async function test() {
  const question = "Hey!";
  try {
    console.log("question:", question);
    const embeddedQuestion = await embeddings.embedQuery(question);
    console.log("Embedded question length:", embeddedQuestion.length);

    const { data: matchedDocuments, error } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: embeddedQuestion,
        match_count: 5,
        filter: {},
      },
    );

    if (error) {
      console.error("Supabase vector search error:", error);
      return;
    }

    console.log("Matches found:", matchedDocuments?.length);

    const contextText = matchedDocuments
      .map((doc: any) => doc.content)
      .join("\n\n");

    const systemMessage = `Context:\n${contextText}`;

    const llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.1-8b-instant",
      temperature: 0.2,
    });

    const response = await llm.invoke([
      { role: "system", content: systemMessage },
      { role: "user", content: question },
    ]);

    console.log("Response:", response.content);
  } catch (error) {
    console.error("Error:", error);
  }
}

test();

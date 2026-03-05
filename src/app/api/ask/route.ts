import { embeddings } from "@/src/lib/huggingfaceClient";
import { supabase } from "@/src/lib/supabaseClient";
import { NextRequest, NextResponse } from "next/server";
import { ChatGroq } from "@langchain/groq";

export async function POST(req: NextRequest) {
  const { question } = await req.json();

  if (!question) {
    return NextResponse.json(
      { error: "Question is required" },
      { status: 400 },
    );
  }

  try {
    // Step 1: Embed the user's question. We convert the text question
    const embeddedQuestion = await embeddings.embedQuery(question);

    // Step 2: Search Supabase database for the most relevant documents (context)
    // using the 'match_documents' Postgres function we created in sqlEditor(supabase).
    const { data: matchedDocuments, error } = await supabase.rpc(
      "match_documents",
      {
        query_embedding: embeddedQuestion,
        match_count: 5, // Retrieve top 5 most relevant chunks
        filter: {}, // Optional: specify any metadata filtersc
      },
    );

    if (error) {
      console.error("Supabase vector search error:", error);
      throw new Error("Failed to search documents in Supabase");
    }

    // Step 3: Combine the retrieved chunks into a single text block
    const contextText = matchedDocuments
      .map((doc: any) => doc.content)
      .join("\n\n");

    // Step 4: Construct the system prompt for the Language Model
    const systemMessage = `You are a helpful and professional portfolio assistant for Nirav Patel.
    Your goal is to answer questions about Nirav's background, skills, and projects based ONLY on the provided context.
    If the answer is not in the context, politely say that you don't know but they can contact Nirav directly.

    Context:
    ${contextText}`;

    // Step 5: Send the constructed prompt + user's question to the LLM
    const llm = new ChatGroq({
      apiKey: process.env.GROQ_API_KEY,
      model: "llama-3.1-8b-instant", // Ensure we use an active model from Groq
      temperature: 0.2, // Low temperature for factual, reliable answers
    });

    const response = await llm.invoke([
      { role: "system", content: systemMessage },
      { role: "user", content: question },
    ]);

    // Step 6: Return the generated answer (and optionally sources) to the frontend
    return NextResponse.json({
      answer:
        typeof response.content === "string"
          ? response.content
          : "No response generated.",
      sources: matchedDocuments,
    });
  } catch (error) {
    console.error("Error in RAG query :", error);
    return NextResponse.json(
      { error: "Failed to process your question" },
      { status: 500 },
    );
  }
}

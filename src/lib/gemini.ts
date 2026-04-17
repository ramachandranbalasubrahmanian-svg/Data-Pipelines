import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function generateKBArticle(errorMsg: string, jobName: string) {
  const prompt = `
    As a Senior SRE and Support Engineer, generate a detailed Knowledge Base (KB) article for a data pipeline job failure.
    
    Job Name: ${jobName}
    Error Message: ${errorMsg}
    
    The KB article should include:
    1. KB Article ID (format KB-XXXXX)
    2. Detailed explanation of the error.
    3. Root cause analysis (why it happened).
    4. Remediation steps (what needs to be done).
    5. Ownership (Internal/External).
    6. Contact persons/metrics for these issues.
    
    Return the response in JSON format with the following keys:
    kbId, explanation, rootCause, remediation, ownership, contactMetrics.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    
    const text = response.text;
    // Clean up potential markdown code blocks
    const jsonStr = text.replace(/```json|```/g, "").trim();
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Error generating KB article:", error);
    return {
      kbId: `KB-${Math.floor(Math.random() * 90000) + 10000}`,
      explanation: "Automatic error analysis failed. Please review logs manually.",
      rootCause: "Unknown",
      remediation: "Restart job and check connectivity.",
      ownership: "Internal",
      contactMetrics: "Platform SRE Team"
    };
  }
}

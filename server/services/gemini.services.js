const Gemini_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

const extractJSON = (text) => {
  const firstBrace = text.indexOf("{");
  const lastBrace = text.lastIndexOf("}");

  if (firstBrace === -1 || lastBrace === -1) {
    throw new Error("No JSON object found in Gemini response");
  }

  return text.slice(firstBrace, lastBrace + 1);
};

export const generateGeminiResponse = async (prompt) => {
  try {
    const response = await fetch(
      `${Gemini_URL}?key=${process.env.GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      const errText = await response.text();
      throw new Error(`Gemini API error: ${errText}`);
    }

    const data = await response.json();
    const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!rawText) {
      throw new Error("Empty Gemini response");
    }

    const jsonText = extractJSON(rawText);

    try {
      return JSON.parse(jsonText);
    } catch (parseError) {
      console.error("JSON PARSE FAILED. Extracted text:");
      console.error(jsonText);
      throw parseError;
    }
  } catch (error) {
    console.error("Gemini generation failed:", error.message);
    throw error; // DO NOT hide the real error
  }
};

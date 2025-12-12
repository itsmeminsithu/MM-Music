import { GoogleGenAI } from "@google/genai";
import { Song } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// We will simulate "generating" a playlist by picking from our mock database based on the AI's mood analysis
export const generateAiPlaylist = async (mood: string, availableSongs: Song[]): Promise<{title: string, description: string, songIds: string[]}> => {
  try {
    const model = 'gemini-2.5-flash';
    const songListString = availableSongs.map(s => `${s.id}: ${s.title} by ${s.artist}`).join('\n');
    
    const prompt = `
      I am MM Music AI, a DJ for a Myanmar audience. The user feels/wants: "${mood}".
      Here is my database of songs:
      ${songListString}

      Create a playlist from these songs that matches the mood. 
      If the user asks for Myanmar songs or local vibes, prioritize artists like Sai Sai, Idiots, R Zarni, Myo Gyi, etc.
      
      Return ONLY a JSON object with this structure:
      {
        "title": "Creative Playlist Title (Use English)",
        "description": "A short, cool description of why these songs fit.",
        "songIds": ["id1", "id2"]
      }
      Select 3-6 songs.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: 'application/json'
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response");
    
    return JSON.parse(text);
  } catch (error) {
    console.error("Gemini AI Error:", error);
    // Fallback
    return {
      title: "Vibe Mix",
      description: "We couldn't reach the AI DJ, but here's a mix for you.",
      songIds: availableSongs.slice(0, 3).map(s => s.id)
    };
  }
};

export const generateCreativeCaption = async (videoTitle: string): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Write a catchy, viral social media caption for a video titled "${videoTitle}". Include relevant emojis and hashtags. Keep it under 280 characters.`;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });

    const text = response.text;
    if (!text) return "Check out this amazing video! 🎥✨";
    return text;
  } catch (error) {
    console.error("Gemini AI Caption Error:", error);
    return "Check out this amazing video! 🎥✨";
  }
};
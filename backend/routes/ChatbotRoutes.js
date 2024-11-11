
const GOOGLE_GENAI_API_KEY = 'AIzaSyDfOdD4zaN63PnYRKtLZxPWEL3YQYaBop4'; // Replace with your actual API key

// The correct Google GenAI endpoint
const GOOGLE_GENAI_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent';

// Middleware to parse JSON request bodies



app.post('/api/generate-content', async (req, res) => {
  try {
      const prompt = req.body.prompt || "Give me some tips about babysitting as a nanny"; // Default prompt if none is provided

      // Create the request body for Google's API
      const requestBody = {
          prompt: { text: prompt },
          model: "text-bison-001" // Replace with your model name if needed
      };

      // Send the request to the Google GenAI API
      const response = await axios.post(
          `${GOOGLE_GENAI_ENDPOINT}?key=${GOOGLE_GENAI_API_KEY}`, 
          requestBody, 
          {
              headers: {
                  'Content-Type': 'application/json',
              },
          }
      );

      // Handle and return the generated content in the response
      const generatedText = response.data?.candidates?.[0]?.output || "No content generated";
      res.json({ text: generatedText });

  } catch (error) {
      console.error('Error response data:', error.response?.data);
      console.error('Error generating content:', error);
      res.status(500).json({ error: 'Error generating content' });
  }
});
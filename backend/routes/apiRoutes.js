const express = require('express');
const router = express.Router();
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

router.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

router.post('/getprojectinfo', async (req, res) => {

  try {
    const { message } = req.body;
    
    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }
    
    const prompt = `
      Please analyze the following project description and return a structured JSON object with:
      - project_name: A suggested name for the project
      - user_journey: An array in order with a detailed explanation of how the user will interact with the project, competitors and potential project value considering the different implications that the project has. 
      - to_do_list: An array of things that need to be done in order to develop the project, consider that you should think out of the planning stage and focus on the actual implementation as you are already providing the plan.
      - tech_stack: An array of recommended technologies that fit the project description and achieve the best results. Each suggestion should be an object and include why this is relevant and how it will be applied, include a url to the image of the technology.
      - main_features: An array of key features, with their explanation and a bigger vision of why they exist in the project
      - api_reference: A yaml file that includes the different endpoints that will be used for the application and how they will come into play with the architecture, fit for OPENAPI 3.0.3
      - ai_suggestions: An order array that suggest different AI tools that could help implement this project and will save up time. Include the reason why you chose them and a link to them, don't include models, I want specific tools.
      - estimated_timeline: Ann array of estimations in weeks of how long it will take to complete the project, considering at least 5 scenarios, where more people are involved per each scenario and the time dedicated is different
      - potential_challenges: An array of potential challenges and a roadmap of how to solve them
      - Suggested color schema: An array of hex codes with suggested colors that give good contrast and are visually appealing, also include where they should be used.
      - Fonts to use: An array of fonts that will fit the project, google fonts. 
      - additional_notes: Any additional notes that could be helpful for the project
       Project description: ${message}
    `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a helpful assistant that analyzes project descriptions and provides structured information in JSON format, you will create a project outline and explain the steps to follow for the implementation. You are a senior software architect that makes the best choices and provides the best possible advice." },
        { role: "user", content: prompt }
      ],
      response_format: { type: "json_object" }
    });

    const response = JSON.parse(completion.choices[0].message.content);
    
    res.json(response);
  } catch (error) {
    console.error('Error calling OpenAI API:', error);
    res.status(500).json({ 
      error: 'Failed to process request',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

module.exports = router;
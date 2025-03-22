const express = require("express");
const router = express.Router();
const OpenAI = require("openai");
require("dotenv").config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

router.post("/getprojectinfo", async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: "Message is required" });
    }

    const prompt = `
    Analyze this project description and return a precise, structured JSON object with these fields:
  
    1. project_name: String - A concise, memorable name for the project (max 3 words)
    
    2. user_journey: Array<String> - Sequential steps of user interaction, with each string structured as:
       "Step X: [Action] - [Benefit] | Competitors: [Alternative solutions] | Value: [Unique advantages]"
    
    3. to_do_list: Array<String> - Implementation tasks (not planning), formatted as:
       "[Task Category] - [Specific action item] (Priority: High/Medium/Low)"
    
    4. tech_stack: Array<Object> - Each technology recommendation as:
       {
         "name": "Technology name",
         "reason": "Specific justification with technical advantages",
         "imageLink": "URL to official logo (preferably SVG)",
         "link": "URL to official documentation"
       }
    
    5. main_features: Array<Object> - Essential functionality descriptions:
       {
         "feature": "Feature name (noun phrase)",
         "explanation": "Technical implementation details and user benefits",
         "vision": "Long-term strategic importance and evolution potential"
       }
    
    6. api_reference: String - Complete OpenAPI 3.0.3 specification in YAML format with:
       - All endpoints grouped by resource
       - Request/response schemas
       - Authentication requirements
       - Status codes and error handling
    
    7. ai_suggestions: Array<Object> - Specific AI tools (not models) to accelerate development:
       {
         "name": "Tool name (commercial product)",
         "reason": "Specific implementation advantages and time savings",
         "link": "Direct URL to tool's official site"
       }
    
    8. estimated_timeline: Array<Object> - Five scenarios with varied team sizes and time commitments:
       {
         "scenario": "Scenario description (e.g., 'Solo developer, part-time')",
         "team_size": Number (team members),
         "commitment": String (hours per week),
         "duration": String (estimated weeks),
         "milestones": Array<String> (key delivery points with timeframes)
       }
    
    9. potential_challenges: Array<Object> - Anticipated problems and solutions:
       {
         "challenge": "Specific technical or business obstacle",
         "impact": "Severity assessment (High/Medium/Low)",
         "solution": "Detailed mitigation strategy with specific tools or approaches",
         "contingency": "Backup plan if primary solution fails"
       }
    
    10. suggested_color_schema: Array<Object> - Color palette with specific usage contexts:
        {
          "hex": "#RRGGBB format",
          "name": "Color name (e.g., 'Primary Blue')",
          "usage": "Specific UI element or context",
          "accessibility": "WCAG compliance level (AA or AAA)"
        }
    
    11. fonts: Array<Object> - Typography recommendations:
        {
          "name": "Font family name",
          "type": "Display/Body/Monospace/etc.",
          "url": "Google Fonts direct URL",
          "pairings": "Suggested combinations or fallbacks"
        }
    
    12. additional_notes: Array<String> - Implementation insights, each focusing on one specific aspect
  
    Carefully analyze this project description: ${message}
    
    Ensure all responses follow the exact formats specified above. Be technically precise and provide actionable, implementation-focused information rather than general advice.
  `;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful assistant that analyzes project descriptions and provides structured information in JSON format, you will create a project outline and explain the steps to follow for the implementation. You are a senior software architect that makes the best choices and provides the best possible advice.",
        },
        { role: "user", content: prompt },
      ],
      response_format: { type: "json_object" },
    });

    const response = JSON.parse(completion.choices[0].message.content);

    res.json(response);
  } catch (error) {
    console.error("Error calling OpenAI API:", error);
    res.status(500).json({
      error: "Failed to process request",
      details:
        process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

module.exports = router;

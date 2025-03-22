import { useState } from 'react'
import { Project } from './types/project'

function App() {
  const [project] = useState<Project>({
    project_name: "Hackathon Kickstart",
    user_journey: [
      "Users visit the website and are welcomed by an engaging landing page highlighting upcoming hackathons and success stories.",
      "Users can sign up or log in using social media accounts to quickly create profiles."
    ],
    to_do_list: [
      "Design and develop the landing page UI/UX.",
      "Build the user authentication module with social media integration."
    ],
    tech_stack: [
      {
        technology: "React",
        reason: "Highly performant for building interactive user interfaces and allows rapid development.",
        application: "To create a responsive and dynamic front-end for better user engagement."
      }
    ],
    main_features: [
      {
        feature: "User Authentication",
        explanation: "Enables users to create accounts and access personalized features.",
        vision: "Facilitate a secure environment for user engagement and data management."
      }
    ],
    api_reference: {
      openapi: "3.0.3",
      info: {
        title: "Hackathon Kickstart API",
        version: "1.0.0"
      },
      paths: {
        "/users": {
          get: {
            summary: "Get all users",
            operationId: "getUsers",
            responses: {
              "200": {
                description: "A list of users."
              }
            }
          }
        }
      }
    },
    ai_suggestions: [
      {
        tool: "OpenAI GPT-4",
        reason: "Can assist in generating engaging content for the platform.",
        link: "https://openai.com/gpt-4/"
      }
    ],
    estimated_timeline: [
      {
        scenario: "Solo Developer (40 hours/week)",
        estimate: "8 weeks"
      }
    ],
    potential_challenges: [
      {
        challenge: "User Engagement",
        solution: "Implement gamification features and rewards to motivate participation."
      }
    ],
    Suggested_color_schema: [
      {
        hex: "#4B52E3",
        usage: "Primary color for headers and call-to-action buttons."
      }
    ],
    Fonts_to_use: [
      "Roboto: https://fonts.google.com/specimen/Roboto"
    ],
    additional_notes: "Engage with potential users through surveys during the development process."
  });

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4">
          <h1 className="text-3xl font-bold text-gray-900">{project.project_name}</h1>
        </div>
      </header>
    </div>
  );
}

export default App;

import { Technology } from "../components/TechStack";
import { Font } from "../components/FontsList";
export interface TimelineScenario {
  scenario: string;
  team_size: number;
  commitment: string;
  duration: string;
  milestones: string[];
}

export interface Feature {
  feature: string;
  explanation: string;
  vision: string;
}

export interface ApiInfo {
  title: string;
  version: string;
}

export interface ApiPath {
  summary: string;
  operationId: string;
  requestBody?: {
    description: string;
    required: boolean;
  };
  responses: {
    [key: string]: {
      description: string;
    };
  };
}

export interface AiTool {
  tool: string;
  reason: string;
  link: string;
}

export interface TimelineStep {
  id: number;
  title: string;
  description: string;
  date: string;
}

export interface Challenge {
  challenge: string;
  solution: string;
}

export interface ColorSchema {
  accessibility: string;
  hex: string;
  name: string;
  usage: string;
}

export interface Project {
  project_name: string;
  user_journey: string[];
  to_do_list: string[];
  tech_stack: Technology[];
  main_features: Feature[];
  api_reference: string;
  ai_suggestions: AiTool[];
  estimated_timeline: TimelineScenario[];
  potential_challenges: Challenge[];
  suggested_color_schema: ColorSchema[];
  fonts: Font[];
  additional_notes: string;
}

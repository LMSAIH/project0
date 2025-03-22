export interface Technology {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
}

export interface TimelineItem {
  id: number;
  title: string;
  date: string;
  description: string;
}

export interface TechStackItem {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
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

export interface TimelineEstimate {
  scenario: string;
  estimate: string;
}

export interface Challenge {
  challenge: string;
  solution: string;
}

export interface ColorSchema {
  hex: string;
  use: string;
}

export interface Project {
  project_name: string;
  user_journey: string[];
  to_do_list: string[];
  tech_stack: TechStackItem[];
  main_features: Feature[];
  api_reference: string;
  ai_suggestions: AiTool[];
  estimated_timeline: TimelineEstimate[];
  potential_challenges: Challenge[];
  Suggested_color_schema: ColorSchema[];
  Fonts_to_use: string[];
  additional_notes: string;
}

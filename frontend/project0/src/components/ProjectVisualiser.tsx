import React from 'react';
import UserJourney from './UserJourney';
import MainFeatures from './MainFeatures';
import ToDoList from './ToDoList';
import TechStack from './TechStack';
import Timeline from './Timeline';
import FontsList from './FontsList';
import { Project } from '../types/project';

interface ProjectVisualiserProps {
    project: Project;
}

const ProjectVisualiser: React.FC<ProjectVisualiserProps> = ({ project }) => {
    return (
        <div className="project-visualizer">

            <UserJourney journey={project.user_journey} />

            <ToDoList todoList={project.to_do_list} />

            <MainFeatures features={project.main_features} />

            <TechStack technologies={project.tech_stack} />

            <Timeline steps={project.estimated_timeline} />

            <FontsList fonts={project.fonts} />

            {/*
      
      
      {project.suggested_color_schema && project.suggested_color_schema.length > 0 && (
        <ColorSchemaList colorSchema={project.suggested_color_schema} />
      )}
      
      {project.additional_notes && project.additional_notes.length > 0 && (
        <AdditionalNotes notes={project.additional_notes} />
      )}
      */}
        </div>
    );
};

export default ProjectVisualiser;
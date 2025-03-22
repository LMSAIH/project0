import React from 'react';
import UserJourney from './UserJourney';
import MainFeatures from './MainFeatures';
import ToDoList from './ToDoList';
import TechStack from './TechStack';
import Timeline from './Timeline';
import FontsList from './FontsList';
import ColorSchemaList from './ColorSchemaList';
import YAMLViewer from './YAMLViewer';
import AdditionalNotes from './AdditionalNotes';
import CodeNotesPreview from './CodeNotesPreview';
import { Project } from '../types/project';

interface ProjectVisualiserProps {
    project: Project;
}

const ProjectVisualiser: React.FC<ProjectVisualiserProps> = ({ project }) => {
    return (
        <div className="project-visualizer ">

            <UserJourney journey={project.user_journey} />

            <ToDoList todoList={project.to_do_list} />

            <MainFeatures features={project.main_features} />

            <TechStack technologies={project.tech_stack} />

            <YAMLViewer title="API Reference" content={project.api_reference}  />

            <Timeline steps={project.estimated_timeline} />

            <FontsList fonts={project.fonts} />

            <ColorSchemaList colors={project.suggested_color_schema}/>

            <CodeNotesPreview colors={project.suggested_color_schema} fonts={project.fonts} />

            <AdditionalNotes notes={project.additional_notes}/>

        </div>
    );
};

export default ProjectVisualiser;
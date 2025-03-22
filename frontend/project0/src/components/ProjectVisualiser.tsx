import React from 'react';
import UserJourney from './UserJourney';
import MainFeatures from './MainFeatures';
import ToDoList from './ToDoList';
interface ProjectVisualiserProps {
    project: any;
}

const ProjectVisualiser: React.FC<ProjectVisualiserProps> = ({ project }) => {
    return (
        <div> 
            <UserJourney journey={project.user_journey}/>
            <ToDoList todoList={project.to_do_list}/>
            <MainFeatures features={project.main_features}/>
        </div>
    );

};

export default ProjectVisualiser;
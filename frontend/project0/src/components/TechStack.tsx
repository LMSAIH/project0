import React from 'react';
import { Technology } from "../types/project";

interface TechStackProps {
  technologies: Technology[];
}

const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  return (
    <div className="py-10 px-5 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-5">
        {technologies.map(tech => (
          <div 
            key={tech.id}
            className="bg-white rounded-xl p-5 shadow-md transition-all duration-300 cursor-pointer hover:-translate-y-1 hover:shadow-lg"
          >
            <div className="h-30 flex items-center justify-center mb-4">
              <img 
                src={tech.imageUrl} 
                alt={tech.name}
                className="max-w-[80%] max-h-[80%] object-contain"
              />
            </div>
            <h3 className="text-lg font-semibold text-gray-800 text-center mb-2">
              {tech.name}
            </h3>
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              {tech.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack; 
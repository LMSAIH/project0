import React from 'react';

interface TimelineStep {
  id: number;
  title: string;
  description: string;
  date: string;
}

interface TimelineProps {
  steps: TimelineStep[];
}

const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  return (
    <div className="py-10 px-5 max-w-3xl mx-auto">
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 h-full w-0.5 bg-blue-500 transform -translate-x-1/2"></div>
        
        {steps.map((step, index) => (
          <div 
            key={step.id}
            className={`flex ${index % 2 === 0 ? 'justify-start' : 'justify-end'} py-10 relative`}
          >
            {/* Timeline ball */}
            <div className="absolute left-1/2 w-6 h-6 bg-blue-500 rounded-full transform -translate-x-1/2 z-10 transition-all duration-300 hover:scale-110 hover:shadow-blue-300 hover:shadow-lg"></div>
            
            {/* Content */}
            <div className={`w-[45%] relative bg-white p-5 rounded-lg shadow-md
              ${index % 2 === 0 ? 'mr-[50%]' : 'ml-[50%]'}
              before:content-[''] before:absolute before:top-1/2 before:w-5 before:h-5 before:bg-white before:transform before:-translate-y-1/2 before:rotate-45
              ${index % 2 === 0 ? 'before:right-[-10px]' : 'before:left-[-10px]'}`}
            >
              <h3 className="text-blue-500 font-semibold mb-2">{step.title}</h3>
              <span className="text-sm text-gray-600 block mb-2">{step.date}</span>
              <p className="text-gray-700">{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline; 
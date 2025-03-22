import React from 'react';

interface StepByStepProps {
  items: string[];
  title: string;
}

const StepByStep: React.FC<StepByStepProps> = ({ items, title }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div key={index} className="flex items-start">
            <div className="flex-shrink-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
              {index + 1}
            </div>
            <div className="ml-4 flex-grow">
              <p className="text-gray-700">{item}</p>
              {index < items.length - 1 && (
                <div className="ml-3 mt-2 h-6 w-0.5 bg-blue-300"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default StepByStep; 
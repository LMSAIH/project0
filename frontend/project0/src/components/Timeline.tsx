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
    <div className="backdrop-blur-sm bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Project Timeline</h2>
      <div className="relative">
        {/* Vertical line */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500"></div>
        
        <div className="space-y-8">
          {steps.map((step) => (
            <div key={step.id} className="relative pl-12">
              {/* Circle marker */}
              <div className="absolute left-2 w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 transform -translate-x-1/2 mt-1.5"></div>
              
              <div className="backdrop-blur-sm bg-slate-800/30 p-4 rounded-lg border border-purple-500/20">
                <div className="text-sm text-cyan-300 mb-1">{step.date}</div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">{step.title}</h3>
                <p className="text-gray-300/80">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Timeline; 
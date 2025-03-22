import React from 'react';

interface Technology {
  id: number;
  name: string;
  imageUrl: string;
  description: string;
}

interface TechStackProps {
  technologies: Technology[];
}

const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  return (
    <div className="backdrop-blur-sm bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
      <h2 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Tech Stack</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {technologies.map(tech => (
          <div 
            key={tech.id}
            className="backdrop-blur-sm bg-slate-800/30 p-4 rounded-lg border border-purple-500/20 hover:border-cyan-500/30 transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-cyan-900/50 to-slate-900/50 border border-cyan-500/30 flex items-center justify-center p-2">
                <img 
                  src={tech.imageUrl} 
                  alt={tech.name}
                  className="w-full h-full object-contain opacity-80 transition-opacity hover:opacity-100"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = `https://via.placeholder.com/64/0f172a/38bdf8?text=${tech.name.charAt(0)}`;
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-purple-300 mb-1">
                  {tech.name}
                </h3>
                <p className="text-gray-300/80 text-sm leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechStack; 
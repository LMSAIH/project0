import React from 'react';
import { motion } from 'framer-motion';
import { FaUserAlt, FaUserPlus, FaHackerrank, FaBook, FaUsers, FaFileUpload } from 'react-icons/fa';

interface UserJourneyProps {
  journey: string[];
}

const UserJourney: React.FC<UserJourneyProps> = ({ journey }) => {
 
  const stepIcons = [
    <FaUserPlus />,
    <FaUserAlt />,
    <FaHackerrank />,
    <FaBook />,
    <FaUsers />,
    <FaFileUpload />
  ];

  const parseJourneyStep = (step: string) => {
    const stepMatch = step.match(/Step (\d+): ([^-]+) - ([^|]+)/);
    const competitorsMatch = step.match(/Competitors: ([^|]+)/);
    const valueMatch = step.match(/Value: (.+)$/);
    
    return {
      number: stepMatch ? stepMatch[1] : "",
      action: stepMatch ? stepMatch[2].trim() : "",
      benefit: stepMatch ? stepMatch[3].trim() : "",
      competitors: competitorsMatch ? competitorsMatch[1].trim() : "",
      value: valueMatch ? valueMatch[1].trim() : ""
    };
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          User Journey
        </h2>
        
        <div className="relative">
          <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-full"></div>
          
          {journey.map((step, index) => {
            const { number, action, benefit, competitors, value } = parseJourneyStep(step);
            
            return (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative flex flex-col sm:flex-row mb-16 last:mb-0 ${
                  index % 2 === 0 ? 'sm:flex-row-reverse' : ''
                }`}
              >

                <div className="absolute left-0 sm:left-1/2 transform sm:-translate-x-1/2 -top-2 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-600 flex items-center justify-center border-4 border-slate-900 shadow-lg shadow-purple-500/30 z-10">
                  <div className="text-white text-2xl">
                    {stepIcons[index] || number}
                  </div>
                </div>
                
                <div className={`sm:w-1/2 pl-24 sm:pl-0 ${
                  index % 2 === 0 ? 'sm:pr-16' : 'sm:pl-16'
                }`}>
                  <motion.div 
                    whileHover={{ scale: 1.03 }}
                    className="p-6 backdrop-blur-sm bg-slate-800/60 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/10"
                  >
                    <h3 className="text-xl font-bold mb-3 flex items-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                      {action}
                    </h3>
                    
                    <div className="mb-4">
                      <p className="text-white/90">{benefit}</p>
                    </div>
                    
                    <div className="pt-4 border-t border-purple-500/20">
                      <div className="mb-2">
                        <span className="text-sm font-semibold text-cyan-300">Competitors:</span>
                        <span className="text-white/70 ml-2">{competitors}</span>
                      </div>
                      
                      <div>
                        <span className="text-sm font-semibold text-purple-300">Unique Value:</span>
                        <span className="text-white/70 ml-2">{value}</span>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserJourney;
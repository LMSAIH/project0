import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUsers, FaClock, FaCalendarAlt } from 'react-icons/fa';

interface TimelineScenario {
  scenario: string;
  team_size: number;
  commitment: string;
  duration: string;
  milestones: string[];
}

interface TimelineProps {
  steps: TimelineScenario[];
}

const Timeline: React.FC<TimelineProps> = ({ steps }) => {
  // Filter out duplicate team sizes and sort by team_size
  const uniqueSteps = steps
    .reduce((acc: TimelineScenario[], current) => {
      const isDuplicate = acc.find(item => item.team_size === current.team_size);
      if (!isDuplicate) {
        return [...acc, current];
      }
      return acc;
    }, [])
    .sort((a, b) => a.team_size - b.team_size); // Sort by team size in ascending order
  
  const [activeScenario, setActiveScenario] = useState<number>(0);

  if (!steps || steps.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Development Timeline
        </h2>

        {/* Scenario selector - horizontal scrollable on mobile */}
        <div className="flex overflow-x-auto pb-2 justify-start md:justify-center gap-4 mb-12 hide-scrollbar">
          {uniqueSteps.map((scenario, index) => (
            <button
              key={index}
              onClick={() => setActiveScenario(index)}
              className={`px-4 py-3 rounded-lg backdrop-blur-sm transition-all duration-300 flex items-center gap-2 flex-shrink-0 ${
                activeScenario === index 
                  ? 'bg-gradient-to-r from-purple-600/40 to-cyan-600/40 border border-purple-500/60 shadow-lg shadow-purple-500/20 scale-105'
                  : 'bg-slate-800/40 border border-slate-700/40 hover:border-cyan-500/40'
              }`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                activeScenario === index 
                  ? 'bg-gradient-to-r from-purple-500/70 to-cyan-500/70'
                  : 'bg-slate-700/70'
              }`}>
                <FaUsers className={activeScenario === index ? 'text-white' : 'text-cyan-300'} />
              </div>
              <span>{uniqueSteps[index].team_size} {uniqueSteps[index].team_size === 1 ? 'Dev' : 'Devs'}</span>
            </button>
          ))}
        </div>

        {/* Active scenario details */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeScenario}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="backdrop-blur-sm bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20 mb-10"
          >
            {/* Scenario details - flex instead of grid for better mobile */}
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 backdrop-blur-sm bg-slate-800/30 p-4 rounded-lg border border-cyan-500/20 flex items-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-cyan-500/20 mr-4">
                  <FaUsers className="text-2xl text-cyan-400" />
                </div>
                <div>
                  <div className="text-sm text-cyan-300">Team</div>
                  <div className="text-lg font-medium text-white">{uniqueSteps[activeScenario].team_size} {uniqueSteps[activeScenario].team_size === 1 ? 'Developer' : 'Developers'}</div>
                </div>
              </div>
              
              <div className="flex-1 backdrop-blur-sm bg-slate-800/30 p-4 rounded-lg border border-purple-500/20 flex items-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-purple-500/20 mr-4">
                  <FaClock className="text-2xl text-purple-400" />
                </div>
                <div>
                  <div className="text-sm text-purple-300">Commitment</div>
                  <div className="text-lg font-medium text-white">{uniqueSteps[activeScenario].commitment}</div>
                </div>
              </div>
              
              <div className="flex-1 backdrop-blur-sm bg-slate-800/30 p-4 rounded-lg border border-pink-500/20 flex items-center">
                <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-pink-500/20 mr-4">
                  <FaCalendarAlt className="text-2xl text-pink-400" />
                </div>
                <div>
                  <div className="text-sm text-pink-300">Duration</div>
                  <div className="text-lg font-medium text-white">{uniqueSteps[activeScenario].duration}</div>
                </div>
              </div>
            </div>
            
            <h3 className="text-xl font-bold mb-4 text-purple-300">
              {uniqueSteps[activeScenario].scenario}
            </h3>
            
            {/* Timeline section */}
            <div className="relative">
              {/* Timeline line - hidden on smallest screens */}
              <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-500 via-purple-500 to-pink-500 hidden sm:block"></div>
              
              <motion.div 
                className="space-y-6"
                variants={containerVariants}
                initial="hidden"
                animate="show"
              >
                {uniqueSteps[activeScenario].milestones.map((milestone, idx) => (
                  <motion.div 
                    key={idx} 
                    variants={itemVariants}
                    className="relative sm:pl-12 pl-0 flex flex-col sm:flex-row"
                  >
   
                    
                    {/* Week indicator - shown only on mobile */}
                    <div className="sm:hidden mb-2 text-sm font-semibold text-cyan-300">
                      Week {Math.round((idx + 1) * parseInt(uniqueSteps[activeScenario].duration) / (uniqueSteps[activeScenario].milestones.length + 1))}
                    </div>
                    
                    {/* Milestone card */}
                    <div className="w-full backdrop-blur-sm bg-slate-800/30 p-4 rounded-lg border border-purple-500/20 hover:border-cyan-500/30 transition-all duration-300">
                      {/* Week indicator - hidden on mobile */}
                      <div className="hidden sm:block text-sm text-cyan-300 mb-1">
                        Week {Math.round((idx + 1) * parseInt(uniqueSteps[activeScenario].duration) / (uniqueSteps[activeScenario].milestones.length + 1))}
                      </div>
                      
                      <div className="text-lg font-semibold text-white mb-2">
                        {milestone.includes(':') ? milestone.split(':')[0] : `Milestone ${idx + 1}`}
                      </div>
                      
                      <p className="text-gray-300/80">
                        {milestone.includes(':') ? milestone.split(':')[1].trim() : milestone}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="text-center mt-4">
          <div className="inline-block px-6 py-5 backdrop-blur-sm bg-slate-800/30 rounded-lg border border-cyan-500/20 max-w-full">
            <p className="text-white/70 italic text-sm">
              Timelines are estimates and may vary based on project complexity and scope changes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Timeline;

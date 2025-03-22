import React from 'react';
import { motion } from 'framer-motion';
import { FaUsers, FaFileUpload, FaTrophy, FaLightbulb, FaChevronRight } from 'react-icons/fa';

interface Feature {
  feature: string;
  explanation: string;
  vision: string;
}

interface MainFeaturesProps {
  features: Feature[];
}

const MainFeatures: React.FC<MainFeaturesProps> = ({ features }) => {

  const getFeatureIcon = (featureName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Team Collaboration': <FaUsers className="text-4xl" />,
      'Challenge Submission': <FaFileUpload className="text-4xl" />,
      'Live Leaderboard': <FaTrophy className="text-4xl" />,
   
    };
    
    return iconMap[featureName] || <FaLightbulb className="text-4xl" />;
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Core Features
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              transition={{ duration: 0.5 }}
              className="h-full"
            >
              <motion.div 
                whileHover={{ 
                  scale: 1.03, 
                  boxShadow: '0 20px 25px -5px rgba(139, 92, 246, 0.15)' 
                }}
                className="h-full rounded-2xl backdrop-blur-md  border-2 bg-slate-800/50 border-purple-500/30 overflow-hidden shadow-lg shadow-purple-500/10 flex flex-col"
              >
                {/* Feature header with gradient background */}
                <div className="relative p-6 ">
                  <div className="absolute top-0 left-0 w-full h-full  opacity-10"></div>
                  
                  <div className="flex items-center justify-between mb-3 ">
                    <div className="w-12 h-12 rounded-lg flex items-center justify-center ">
                      {getFeatureIcon(feature.feature)}
                    </div>
                    
                    <div className="w-8 h-8 flex items-center justify-center text-purple-300 opacity-50">
                      <FaChevronRight />
                    </div>
                  </div>
                  
                  <h3 className="text-xl font-bold text-cyan-300 mb-1">
                    {feature.feature}
                  </h3>
                </div>
                
                {/* Feature content */}
                <div className="p-6 flex-1 flex flex-col ">
                  <div className="flex-1">
                    <p className="text-white/80 mb-6">
                      {feature.explanation}
                    </p>
                  </div>
                  
                  <div className="pt-4 mt-auto border-t border-purple-500/20">
                    <h4 className="text-sm font-medium text-purple-300 mb-2">
                      Long-term Vision:
                    </h4>
                    <p className="text-white/70 text-sm italic">
                      {feature.vision}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
        
      
      </div>
    </div>
  );
};

export default MainFeatures;
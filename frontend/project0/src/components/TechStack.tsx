import React from 'react';
import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { 
  FaReact, FaNodeJs, FaDatabase, FaServer, FaCloud, FaCode, 
  FaMobile, FaLock, FaExternalLinkAlt, FaJs, FaHtml5, FaCss3Alt,
  FaAws, FaDocker, FaGitAlt, FaPython, FaJava, FaPhp, FaWordpress
} from 'react-icons/fa';
import { 
  SiExpress, SiMongodb, SiVercel, SiFirebase, SiGraphql, SiTailwindcss,
  SiNextdotjs, SiPostgresql, SiMysql, SiRedis, SiTypescript, SiAngular,
  SiVuedotjs, SiDjango, SiFlask, SiSpring, SiLaravel, SiRubyonrails,
  SiGo, SiKubernetes, SiGooglecloud, SiSwift, SiKotlin
} from 'react-icons/si';

export interface Technology {
  name: string;
  reason: string;
  imageLink?: string;
  link?: string;
  description?: string;
}

interface TechStackProps {
  technologies: Technology[];
}

// Tech icon mapping
const techIconMap: Record<string, IconType> = {
  // Frontend
  'react': FaReact,
  'next.js': SiNextdotjs,
  'vue': SiVuedotjs,
  'angular': SiAngular,
  'javascript': FaJs,
  'typescript': SiTypescript,
  'html': FaHtml5,
  'css': FaCss3Alt,
  'tailwind': SiTailwindcss,
  
  // Backend
  'node': FaNodeJs,
  'express': SiExpress,
  'django': SiDjango,
  'flask': SiFlask,
  'spring': SiSpring,
  'laravel': SiLaravel,
  'rails': SiRubyonrails,
  'go': SiGo,
  'php': FaPhp,
  'java': FaJava,
  'python': FaPython,
  
  // Database
  'mongodb': SiMongodb,
  'postgresql': SiPostgresql,
  'mysql': SiMysql,
  'redis': SiRedis,
  
  // Cloud/DevOps
  'aws': FaAws,
  'google cloud': SiGooglecloud,
  'vercel': SiVercel,
  'firebase': SiFirebase,
  'docker': FaDocker,
  'kubernetes': SiKubernetes,
  'git': FaGitAlt,
  
  // Other
  'graphql': SiGraphql,
  'wordpress': FaWordpress,
  'swift': SiSwift,
  'kotlin': SiKotlin,
};

// Category icons for fallbacks
const categoryIconMap: Record<string, IconType> = {
  'framework': FaCode,
  'language': FaCode,
  'database': FaDatabase,
  'server': FaServer,
  'cloud': FaCloud,
  'mobile': FaMobile,
  'security': FaLock,
  'frontend': FaHtml5,
  'backend': FaServer,
  'devops': FaDocker,
};

const TechStack: React.FC<TechStackProps> = ({ technologies }) => {
  // Get appropriate icon based on technology name
  const getTechIcon = (techName: string) => {
    const name = techName.toLowerCase();
    
    // Try exact matches first
    for (const [key, Icon] of Object.entries(techIconMap)) {
      if (name === key) return <Icon className="text-3xl" />;
    }
    
    // Try partial matches
    for (const [key, Icon] of Object.entries(techIconMap)) {
      if (name.includes(key)) return <Icon className="text-3xl" />;
    }
    
    // If no match found in main tech map, try to determine category
    for (const [category, Icon] of Object.entries(categoryIconMap)) {
      if (name.includes(category)) return <Icon className="text-3xl" />;
    }
    
    // Default icon
    return <FaCode className="text-3xl" />;
  };
  
  // Create color based on string hash
  const stringToColor = (str: string) => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Define a list of good-looking hue values
    const hues = [210, 180, 120, 275, 330, 30, 60, 240, 290, 340];
    const hue = hues[Math.abs(hash) % hues.length];
    
    return `hsl(${hue}, 70%, 60%)`;
  };

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
          Recommended Tech Stack
        </h2>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {technologies.map((tech, index) => {
            const techColor = stringToColor(tech.name);
            const techDescription = tech.description || tech.reason;
            const techLink = tech.link || '#';
            
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                whileHover={{ scale: 1.02 }}
                className="backdrop-blur-sm bg-slate-800/40 border border-purple-500/30 rounded-xl overflow-hidden shadow-lg shadow-purple-500/10"
              >
                <div className="p-6">
                  <div className="flex items-start gap-4">
                    <div 
                      className="w-14 h-14 rounded-xl flex items-center justify-center shrink-0"
                      style={{ 
                        backgroundColor: `${techColor}20`,
                        borderColor: `${techColor}50`,
                        borderWidth: '1px'
                      }}
                    >
                      <div style={{ color: techColor }}>
                        {getTechIcon(tech.name)}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 flex items-center gap-2"
                        style={{ color: techColor }}
                      >
                        {tech.name}
                      </h3>
                      
                      <p className="text-white/80 mb-4 text-sm">
                        {techDescription}
                      </p>
                      
                      {techLink !== '#' && (
                        <a 
                          href={techLink} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-medium text-purple-300 hover:text-purple-200 transition-colors"
                        >
                          <span>Documentation</span>
                          <FaExternalLinkAlt className="text-xs" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
};

export default TechStack;
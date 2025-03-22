import React from 'react';
import { motion } from 'framer-motion';
import { FaFont, FaLink, FaMagic } from 'react-icons/fa';

export interface Font {
  name: string;
  type: string;
  url: string;
  pairings: string;
}

interface FontsListProps {
  fonts: Font[];
}

const FontsList: React.FC<FontsListProps> = ({ fonts }) => {
  if (!fonts || fonts.length === 0) {
    return null;
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  // Get a preview style for each font type
  const getTypeSample = (type: string) => {
    switch (type.toLowerCase()) {
      case 'display':
        return 'text-4xl font-bold tracking-tight';
      case 'heading':
        return 'text-2xl font-semibold tracking-normal';
      case 'body':
        return 'text-base font-normal tracking-wide';
      case 'monospace':
        return 'text-sm font-medium font-mono';
      default:
        return 'text-lg font-medium';
    }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-10 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Typography Recommendations
        </h2>
        
        <motion.div 
          className="flex flex-col md:flex-row justify-center flex-wrap gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {fonts.map((font, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.03 }}
              className="w-full md:w-[calc(50%-12px)] lg:w-[calc(33.333%-16px)] backdrop-blur-sm bg-slate-800/40 border border-purple-500/30 rounded-xl overflow-hidden shadow-lg shadow-purple-500/10 flex flex-col"
            >
              {/* Font header */}
              <div className="bg-gradient-to-r from-slate-800/80 to-slate-900/80 p-5 border-b border-purple-500/20">
                <div className="flex justify-between items-center mb-3">
                  <div className="px-3 py-1 rounded-full text-xs font-semibold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30">
                    {font.type}
                  </div>
                  
                  <a 
                    href={font.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-slate-700/50 text-purple-300 hover:bg-purple-500/30 hover:text-white transition-all duration-200"
                  >
                    <FaLink className="text-sm" />
                  </a>
                </div>
                
                <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FaFont className="text-purple-400" />
                  <span>{font.name}</span>
                </h3>
              </div>
              
              {/* Font preview */}
              <div className="p-5 flex-grow">
                <div className={`py-3 px-4 rounded-lg bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/60 mb-5 ${getTypeSample(font.type)}`}>
                  The quick brown fox jumps over the lazy dog
                </div>
                
                <div className="flex items-start gap-2 text-sm">
                  <FaMagic className="text-purple-400 mt-1 shrink-0" />
                  <p className="text-white/70">
                    {font.pairings}
                  </p>
                </div>
              </div>
              
              {/* Font actions */}
              <div className="px-5 py-4 border-t border-purple-500/20 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between">
                <a
                  href={`https://fonts.google.com/specimen/${font.name.replace(/\s+/g, '+')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-cyan-300 hover:text-cyan-200 transition-colors"
                >
                  View on Google Fonts
                </a>
                
                <a
                  href={`https://fonts.google.com/share?selection.family=${font.name.replace(/\s+/g, '+')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-purple-300 hover:text-purple-200 transition-colors"
                >
                  Use Font
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Typography tip */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-12 backdrop-blur-sm bg-slate-800/30 border border-cyan-500/20 p-5 rounded-lg max-w-3xl mx-auto"
        >
          <h4 className="font-semibold text-cyan-300 mb-2">
            Typography Tip
          </h4>
          <p className="text-white/70 text-sm">
            For optimal readability, limit your project to 2-3 fonts. Use display fonts for headlines, and 
            body fonts for paragraph text. Maintain a consistent typographic hierarchy throughout your application.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default FontsList;
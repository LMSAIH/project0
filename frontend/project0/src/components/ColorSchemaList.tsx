import React, { useState } from 'react';
import { ColorSchema } from '../types/project';

interface ColorSchemaListProps {
  colors: ColorSchema[];
}

const ColorSchemaList: React.FC<ColorSchemaListProps> = ({ colors }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleCopyColor = (hex: string, index: number) => {
    navigator.clipboard.writeText(hex);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="backdrop-blur-sm bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20 max-w-6xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Color Schema</h2>
      <div className="flex flex-row w-full h-[120px]">
        {colors.map((color, index) => (
          <div key={index} className="flex-1">
            <div 
              onClick={() => handleCopyColor(color.hex, index)}
              className="h-full relative cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98]"
              style={{ backgroundColor: color.hex }}
            >
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/20 backdrop-blur-[2px] text-center">
                <p className="font-mono text-xs font-bold text-white/90 uppercase tracking-wider mb-1">
                  {copiedIndex === index ? 'Copied!' : color.hex}
                </p>
                <p className="text-white/80 text-xs px-1">Accessibility: {color.accessibility}</p>
                <p className="text-white/80 text-xs px-1">Usage: {color.usage}</p>  
                
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ColorSchemaList; 
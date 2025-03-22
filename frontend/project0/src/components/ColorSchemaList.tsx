import React from 'react';
import { ColorSchema } from '../types/project';

interface ColorSchemaListProps {
  colors: ColorSchema[];
}

const ColorSchemaList: React.FC<ColorSchemaListProps> = ({ colors }) => {
  return (
    <div className="backdrop-blur-sm bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Color Schema</h2>
      <ul className="space-y-4">
        {colors.map((color, index) => (
          <li key={index} className="flex items-center gap-4">
            <div 
              className="w-12 h-12 rounded-lg shadow-md border border-purple-500/30"
              style={{ backgroundColor: color.hex }}
            />
            <div>
              <p className="font-mono text-sm text-cyan-300">{color.hex}</p>
              <p className="text-gray-300/80">{color.usage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ColorSchemaList; 
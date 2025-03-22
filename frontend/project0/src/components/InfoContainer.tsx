import React from 'react';
import { Challenge, ColorSchema } from '../types/project';

interface InfoContainerProps {
  challenges: Challenge[];
  colorSchema: ColorSchema[];
  fonts: string[];
  notes: string;
}

const InfoContainer: React.FC<InfoContainerProps> = ({
  challenges,
  colorSchema,
  fonts,
  notes
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
      {/* Challenges */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Potential Challenges</h2>
        <div className="space-y-4">
          {challenges.map((challenge, index) => (
            <div key={index} className="border-l-4 border-yellow-500 pl-4">
              <h3 className="font-semibold text-gray-800">{challenge.challenge}</h3>
              <p className="text-gray-600 text-sm mt-1">{challenge.solution}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Color Schema */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Color Schema</h2>
        <div className="grid gap-3">
          {colorSchema.map((color, index) => (
            <div key={index} className="flex items-center">
              <div 
                className="w-12 h-12 rounded-lg shadow-inner mr-4"
                style={{ backgroundColor: color.hex }}
              />
              <div>
                <p className="font-mono text-sm text-gray-600">{color.hex}</p>
                <p className="text-sm text-gray-700">{color.usage}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fonts */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Fonts</h2>
        <ul className="list-disc list-inside space-y-2">
          {fonts.map((font, index) => (
            <li key={index} className="text-gray-700">{font}</li>
          ))}
        </ul>
      </div>

      {/* Additional Notes */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Additional Notes</h2>
        <p className="text-gray-700">{notes}</p>
      </div>
    </div>
  );
}

export default InfoContainer; 
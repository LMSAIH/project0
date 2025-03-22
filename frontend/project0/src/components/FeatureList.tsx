import React from 'react';
import { Feature } from '../types/project';

interface FeatureListProps {
  features: Feature[];
  title: string;
}

const FeatureList: React.FC<FeatureListProps> = ({ features, title }) => {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">{title}</h2>
      <div className="grid gap-6">
        {features.map((feature, index) => (
          <div key={index} className="relative pl-8">
            <div className="absolute left-0 top-0 w-2 h-full bg-blue-500 rounded"></div>
            <h3 className="text-xl font-semibold text-blue-600 mb-2">{feature.feature}</h3>
            <p className="text-gray-600 mb-2">{feature.explanation}</p>
            <p className="text-sm text-gray-500 italic">Vision: {feature.vision}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FeatureList; 
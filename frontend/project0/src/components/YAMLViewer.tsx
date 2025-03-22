import React, { useMemo } from 'react';
import { parse, stringify } from 'yaml';

interface YAMLViewerProps {
  content: string;
  title?: string;
}

const YAMLViewer: React.FC<YAMLViewerProps> = ({ content, title = 'YAML Content' }) => {
  const formattedYAML = useMemo(() => {
    try {
      // Parse and then stringify to ensure consistent formatting
      const parsed = parse(content);
      return stringify(parsed);
    } catch (error) {
      console.error('Error parsing YAML:', error);
      return 'Invalid YAML content';
    }
  }, [content]);

  return (
    <div className="backdrop-blur-sm bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">{title}</h2>
      <pre className="bg-slate-900/50 p-4 rounded-lg overflow-x-auto font-mono text-sm text-gray-300/80 border border-purple-500/20">
        {formattedYAML}
      </pre>
    </div>
  );
};

export default YAMLViewer; 
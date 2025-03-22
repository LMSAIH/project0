import React, { useMemo, useState } from 'react';
import { parse, stringify } from 'yaml';
import { FaCopy, FaCheck } from 'react-icons/fa';

interface YAMLViewerProps {
  content: string;
  title?: string;
}

const YAMLViewer: React.FC<YAMLViewerProps> = ({ content, title = 'YAML Content' }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editableContent, setEditableContent] = useState(content);
  let parsed:unknown;
  const formattedYAML = useMemo(() => {
    try {
      // Parse and then stringify to ensure consistent formatting
      parsed = parse(editableContent);
      

      const str = stringify(parsed)

      return str
    } catch (error) {
      console.error('Error parsing YAML:', error);
      return 'Invalid YAML content';
    }
  }, [editableContent]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(formattedYAML);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  };

  const handleEdit = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditableContent(e.target.value);
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) {
      setEditableContent(formattedYAML);
    }
  };

  return (
    <div className="backdrop-blur-sm bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          {title}
        </h2>
        <div className="flex gap-2">
          <button
            onClick={toggleEdit}
            className="px-3 py-1.5 text-sm rounded-lg bg-slate-700/50 text-cyan-300 hover:bg-slate-700/70 border border-cyan-500/30 transition-colors"
          >
            {isEditing ? 'Preview' : 'Edit'}
          </button>
          <button
                    onClick={() => {
                      const blob = new Blob([JSON.stringify(parsed, null, 2)], { type: 'application/yaml' });
                      const url = URL.createObjectURL(blob);
                      const a = document.createElement('a');
                      a.href = url;
                      a.download = 'api_reference.yaml';
                      document.body.appendChild(a);
                      a.click();
                      document.body.removeChild(a);
                      URL.revokeObjectURL(url);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-medium rounded-lg shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                    Download YAML
                  </button>
          <button
            onClick={handleCopy}
            className="px-3 py-1.5 text-sm rounded-lg bg-slate-700/50 hover:bg-slate-700/70 border border-purple-500/30 transition-all flex items-center gap-2"
          >
            {isCopied ? (
              <>
                <FaCheck className="text-green-400" />
                <span className="text-green-400">Copied!</span>
              </>
            ) : (
              <>
                <FaCopy className="text-purple-400" />
                <span className="text-purple-400">Copy</span>
              </>
            )}
          </button>
        </div>
      </div>
      <div className="relative">
        {isEditing ? (
          <textarea
            value={editableContent}
            onChange={handleEdit}
            className="w-full h-[400px] bg-slate-900/50 p-4 rounded-lg font-mono text-sm text-gray-300/80 border border-purple-500/20 focus:border-cyan-500/30 focus:ring-1 focus:ring-cyan-500/30 outline-none resize-none"
            spellCheck="false"
          />
        ) : (
          <pre className="bg-slate-900/50 p-4 rounded-lg overflow-x-auto font-mono text-sm text-gray-300/80 border border-purple-500/20 max-h-[400px]">
            {formattedYAML}
          </pre>
        )}
      </div>
    </div>
  );
};

export default YAMLViewer; 
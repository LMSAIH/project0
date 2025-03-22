import React from 'react';

interface AdditionalNotesProps {
  notes: string;
}

const AdditionalNotes: React.FC<AdditionalNotesProps> = ({ notes }) => {
  return (
    <div className="backdrop-blur-sm bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Additional Notes</h2>
      <div className="prose prose-invert max-w-none">
        <p className="text-gray-300/80 leading-relaxed">
          {notes}
        </p>
      </div>
    </div>
  );
};

export default AdditionalNotes; 
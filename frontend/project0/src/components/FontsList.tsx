import React from 'react';

interface FontsListProps {
  fonts: Array<string | { font: string; style?: string }>;
}

const FontsList: React.FC<FontsListProps> = ({ fonts }) => {
  const getFontUrl = (fontName: string): string => {
    const formattedFont = fontName.replace(/\s+/g, '+');
    return `https://fonts.google.com/specimen/${formattedFont}`;
  };

  const processFontItem = (font: string | { font: string; style?: string }) => {
    if (typeof font === 'object' && font !== null && 'font' in font) {
      return font.font;
    }
    return typeof font === 'string' ? font : '';
  };

  return (
    <div className="backdrop-blur-sm bg-slate-800/50 p-6 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
      <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">Project Fonts</h2>
      <ul className="list-disc list-inside space-y-2">
        {fonts.map((font, index) => {
          const fontName = processFontItem(font);
          return (
            <li 
              key={index} 
              className="group"
            >
              <a 
                href={getFontUrl(fontName)}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-300/80 hover:text-cyan-300 transition-colors inline-flex items-center gap-2"
              >
                <span>{fontName}</span>
                {typeof font === 'object' && font.style && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-700/50 border border-purple-500/20">
                    {font.style}
                  </span>
                )}
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default FontsList; 
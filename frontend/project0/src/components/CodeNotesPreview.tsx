import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaDesktop, FaMobile, FaTabletAlt, FaCode, FaPalette, FaFont, FaRedo } from 'react-icons/fa';
import { ColorSchema } from '../types/project';
import { Font } from './FontsList';

interface CodeNotesPreviewProps {
  colors: ColorSchema[];
  fonts: Font[];
  projectName?: string;
}

const CodeNotesPreview: React.FC<CodeNotesPreviewProps> = ({ colors, fonts, projectName = "Project Preview" }) => {
  const [viewMode, setViewMode] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [currentPreset, setCurrentPreset] = useState<number>(0);
  const [loadedFonts, setLoadedFonts] = useState<boolean>(false);

  // Identify primary and secondary colors based on names or usages
  const getPrimaryColor = (): string => {
    const primary = colors.find(c => 
      c.name?.toLowerCase().includes('primary') || 
      c.usage?.toLowerCase().includes('primary') ||
      c.usage?.toLowerCase().includes('button') ||
      c.usage?.toLowerCase().includes('main')
    );
    return primary?.hex || colors[0]?.hex || '#5046e5';
  };

  const getSecondaryColor = (): string => {
    const secondary = colors.find(c => 
      c.name?.toLowerCase().includes('secondary') || 
      c.usage?.toLowerCase().includes('secondary') ||
      c.usage?.toLowerCase().includes('accent')
    );
    return secondary?.hex || colors[1]?.hex || '#22d3ee';
  };

  const getBackgroundColor = (): string => {
    const bg = colors.find(c => 
      c.name?.toLowerCase().includes('background') || 
      c.usage?.toLowerCase().includes('background')
    );
    return bg?.hex || colors[2]?.hex || '#0f172a';
  };

  const getTextColor = (): string => {
    const text = colors.find(c => 
      c.name?.toLowerCase().includes('text') || 
      c.usage?.toLowerCase().includes('text')
    );
    return text?.hex || colors[3]?.hex || '#f8fafc';
  };

  // Get header and body fonts
  const getHeaderFont = (): string => {
    const headerFont = fonts.find(f => 
      f.type.toLowerCase().includes('display') || 
      f.type.toLowerCase().includes('heading')
    );
    return headerFont?.name || fonts[0]?.name || 'Poppins';
  };

  const getBodyFont = (): string => {
    const bodyFont = fonts.find(f => 
      f.type.toLowerCase().includes('body') || 
      f.type.toLowerCase().includes('text')
    );
    return bodyFont?.name || fonts[1]?.name || 'Open Sans';
  };

  // Load Google Fonts
  useEffect(() => {
    const loadFonts = async () => {
      if (fonts && fonts.length > 0 && !loadedFonts) {
        const fontFamilies = fonts.map(font => font.name.replace(/\s+/g, '+')).join('|');
        const link = document.createElement('link');
        link.href = `https://fonts.googleapis.com/css2?family=${fontFamilies}&display=swap`;
        link.rel = 'stylesheet';
        document.head.appendChild(link);
        setLoadedFonts(true);
      }
    };

    loadFonts();
  }, [fonts, loadedFonts]);

  // Presets for different UI layouts
  const presets = [
    'Dashboard Layout',
    'Landing Page',
    'Application Form'
  ];

  // Get container width based on view mode
  const getContainerWidth = (): string => {
    switch (viewMode) {
      case 'desktop': return 'w-full';
      case 'tablet': return 'w-[768px]';
      case 'mobile': return 'w-[375px]';
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } }
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Visual Preview
        </h2>
        
        <p className="text-white/70 text-center mb-8 max-w-2xl mx-auto">
          This preview demonstrates how your project could look using the recommended color palette and typography.
        </p>
        
        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8 justify-center">
          <div className="flex rounded-lg overflow-hidden backdrop-blur-sm border border-purple-500/30">
            <button 
              onClick={() => setViewMode('desktop')}
              className={`px-4 py-2 flex items-center gap-2 ${viewMode === 'desktop' ? 'bg-purple-500/30 text-white' : 'bg-slate-800/50 text-gray-300'}`}
            >
              <FaDesktop />
              <span className="hidden sm:inline">Desktop</span>
            </button>
            <button 
              onClick={() => setViewMode('tablet')}
              className={`px-4 py-2 flex items-center gap-2 ${viewMode === 'tablet' ? 'bg-purple-500/30 text-white' : 'bg-slate-800/50 text-gray-300'}`}
            >
              <FaTabletAlt />
              <span className="hidden sm:inline">Tablet</span>
            </button>
            <button 
              onClick={() => setViewMode('mobile')}
              className={`px-4 py-2 flex items-center gap-2 ${viewMode === 'mobile' ? 'bg-purple-500/30 text-white' : 'bg-slate-800/50 text-gray-300'}`}
            >
              <FaMobile />
              <span className="hidden sm:inline">Mobile</span>
            </button>
          </div>
          
          <div className="flex rounded-lg overflow-hidden backdrop-blur-sm border border-cyan-500/30">
            {presets.map((preset, index) => (
              <button 
                key={index}
                onClick={() => setCurrentPreset(index)}
                className={`px-4 py-2 ${currentPreset === index ? 'bg-cyan-500/30 text-white' : 'bg-slate-800/50 text-gray-300'}`}
              >
                {preset}
              </button>
            ))}
          </div>
          
          <button 
            onClick={() => setCurrentPreset((currentPreset + 1) % presets.length)}
            className="p-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-white hover:bg-slate-700/70 transition-colors"
          >
            <FaRedo />
          </button>
        </div>
        
        {/* Preview Container */}
        <div className="overflow-x-auto pb-4">
          <div className="flex justify-center min-w-full">
            <motion.div 
              className={`${getContainerWidth()} h-[500px] backdrop-blur-sm border border-purple-500/30 rounded-xl overflow-hidden shadow-xl shadow-purple-500/10`}
              initial="hidden"
              animate="show"
              variants={containerVariants}
              key={`${viewMode}-${currentPreset}`}
            >
              {/* Preview Content */}
              <div 
                className="w-full h-full overflow-auto"
                style={{ 
                  backgroundColor: getBackgroundColor(),
                  color: getTextColor(),
                  fontFamily: `'${getBodyFont()}', sans-serif`
                }}
              >
                {/* Render different UI based on selected preset */}
                {currentPreset === 0 && (
                  <DashboardPreview 
                    primaryColor={getPrimaryColor()} 
                    secondaryColor={getSecondaryColor()}
                    headingFont={getHeaderFont()}
                    bodyFont={getBodyFont()}
                    projectName={projectName}
                    viewMode={viewMode}
                  />
                )}
                
                {currentPreset === 1 && (
                  <LandingPagePreview 
                    primaryColor={getPrimaryColor()} 
                    secondaryColor={getSecondaryColor()}
                    headingFont={getHeaderFont()}
                    bodyFont={getBodyFont()}
                    projectName={projectName}
                    viewMode={viewMode}
                  />
                )}
                
                {currentPreset === 2 && (
                  <FormPreview 
                    primaryColor={getPrimaryColor()} 
                    secondaryColor={getSecondaryColor()}
                    headingFont={getHeaderFont()}
                    bodyFont={getBodyFont()}
                    projectName={projectName}
                    viewMode={viewMode}
                  />
                )}
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Color & Font Legend */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="backdrop-blur-sm bg-slate-800/40 p-5 rounded-xl border border-purple-500/30">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <FaPalette className="text-purple-400" />
              <span>Color Palette</span>
            </h3>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {colors.slice(0, 6).map((color, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div 
                    className="w-8 h-8 rounded-md border border-white/10"
                    style={{ backgroundColor: color.hex }}
                  ></div>
                  <div>
                    <div className="text-sm font-medium text-white">{color.name || `Color ${idx+1}`}</div>
                    <div className="text-xs text-white/60">{color.hex}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-slate-800/40 p-5 rounded-xl border border-cyan-500/30">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-white">
              <FaFont className="text-cyan-400" />
              <span>Typography</span>
            </h3>
            
            <div className="space-y-4">
              {fonts.slice(0, 3).map((font, idx) => (
                <div key={idx}>
                  <div className="text-sm text-cyan-300 mb-1">{font.type}</div>
                  <div 
                    className="text-lg text-white"
                    style={{ fontFamily: `'${font.name}', sans-serif` }}
                  >
                    {font.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Code snippet */}
        <div className="mt-6 backdrop-blur-sm bg-slate-900/60 p-4 rounded-xl border border-slate-700/50 overflow-x-auto">
          <div className="flex items-center gap-2 mb-2">
            <FaCode className="text-cyan-400" />
            <span className="text-sm font-medium text-white">CSS Variables</span>
          </div>
          <pre className="text-sm font-mono text-white/80">
{`:root {
  /* Colors */
  --color-primary: ${getPrimaryColor()};
  --color-secondary: ${getSecondaryColor()};
  --color-background: ${getBackgroundColor()};
  --color-text: ${getTextColor()};
  
  /* Typography */
  --font-heading: '${getHeaderFont()}', sans-serif;
  --font-body: '${getBodyFont()}', sans-serif;
}
`}
          </pre>
        </div>
      </div>
    </div>
  );
};

// Preset Components
interface PresetProps {
  primaryColor: string;
  secondaryColor: string;
  headingFont: string;
  bodyFont: string;
  projectName: string;
  viewMode: 'desktop' | 'tablet' | 'mobile';
}

// Dashboard Layout Preset
const DashboardPreview: React.FC<PresetProps> = ({ 
  primaryColor, secondaryColor, headingFont, bodyFont, projectName, viewMode 
}) => {
  return (
    <div className="h-full">
      {/* Sidebar - hidden on mobile */}
      <div 
        className={`${viewMode === 'mobile' ? 'hidden' : 'flex'} flex-col w-64 h-full fixed border-r`}
        style={{ 
          backgroundColor: `${primaryColor}15`, 
          borderColor: `${primaryColor}30`
        }}
      >
        <div 
          className="p-4 border-b"
          style={{ borderColor: `${primaryColor}30` }}
        >
          <h2 
            className="text-xl font-bold"
            style={{ fontFamily: `'${headingFont}', sans-serif` }}
          >
            {projectName}
          </h2>
        </div>
        
        <div className="p-4">
          <ul className="space-y-2">
            {['Dashboard', 'Projects', 'Messages', 'Team', 'Analytics', 'Settings'].map((item, idx) => (
              <li 
                key={idx}
                className="p-2 rounded-md cursor-pointer"
                style={{ 
                  backgroundColor: idx === 0 ? `${primaryColor}40` : 'transparent',
                  transition: 'background-color 0.2s'
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
      
      {/* Main content */}
      <div 
        className={`${viewMode === 'mobile' ? 'w-full' : 'ml-64'} p-6`}
      >
        {/* Top bar */}
        <div className="flex justify-between items-center mb-6">
          <h1 
            className="text-2xl font-bold"
            style={{ fontFamily: `'${headingFont}', sans-serif` }}
          >
            Dashboard
          </h1>
          
          <div 
            className="flex items-center justify-center w-10 h-10 rounded-full"
            style={{ backgroundColor: primaryColor }}
          >
            U
          </div>
        </div>
        
        {/* Stats cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          {['Projects', 'Tasks', 'Team Members'].map((stat, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-lg border"
              style={{ 
                backgroundColor: `${primaryColor}10`,
                borderColor: `${primaryColor}20`
              }}
            >
              <div className="text-sm opacity-70">{stat}</div>
              <div className="text-2xl font-bold mt-1">{Math.floor(Math.random() * 100)}</div>
            </div>
          ))}
        </div>
        
        {/* Recent activity */}
        <div 
          className="p-4 rounded-lg border mb-6"
          style={{ 
            backgroundColor: `${primaryColor}05`,
            borderColor: `${primaryColor}20`
          }}
        >
          <h3 
            className="text-lg font-semibold mb-4"
            style={{ fontFamily: `'${headingFont}', sans-serif` }}
          >
            Recent Activity
          </h3>
          
          <div className="space-y-3">
            {['Updated project details', 'Completed milestone', 'Added new team member', 'Scheduled meeting'].map((activity, idx) => (
              <div 
                key={idx}
                className="p-3 rounded-md"
                style={{ backgroundColor: `${primaryColor}15` }}
              >
                <div className="flex justify-between">
                  <span>{activity}</span>
                  <span className="opacity-60 text-sm">Today</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Action buttons */}
        <div className="flex flex-wrap gap-3">
          <button 
            className="px-4 py-2 rounded-md"
            style={{ 
              backgroundColor: primaryColor,
              fontFamily: `'${bodyFont}', sans-serif`
            }}
          >
            New Project
          </button>
          
          <button 
            className="px-4 py-2 rounded-md"
            style={{ 
              backgroundColor: 'transparent',
              borderWidth: '1px',
              borderColor: secondaryColor,
              fontFamily: `'${bodyFont}', sans-serif`
            }}
          >
            View Reports
          </button>
        </div>
      </div>
    </div>
  );
};

// Landing Page Preset
const LandingPagePreview: React.FC<PresetProps> = ({ 
  primaryColor, secondaryColor, headingFont, bodyFont, projectName, viewMode 
}) => {
  return (
    <div className="h-full">
      {/* Header */}
      <header 
        className="px-6 py-4 flex justify-between items-center border-b"
        style={{ borderColor: `${primaryColor}30` }}
      >
        <h1 
          className="text-xl font-bold"
          style={{ fontFamily: `'${headingFont}', sans-serif` }}
        >
          {projectName}
        </h1>
        
        <nav className={viewMode === 'mobile' ? 'hidden' : 'block'}>
          <ul className="flex gap-6">
            {['Home', 'Features', 'Pricing', 'About'].map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </nav>
        
        <div className={viewMode === 'mobile' ? 'block' : 'hidden'}>
          ≡
        </div>
      </header>
      
      {/* Hero section */}
      <div 
        className="px-6 py-16 text-center"
        style={{ 
          background: `linear-gradient(135deg, ${primaryColor}30 0%, ${secondaryColor}20 100%)`
        }}
      >
        <h2 
          className="text-4xl font-bold mb-4"
          style={{ fontFamily: `'${headingFont}', sans-serif` }}
        >
          Welcome to {projectName}
        </h2>
        
        <p 
          className="max-w-xl mx-auto mb-8 opacity-80"
          style={{ fontFamily: `'${bodyFont}', sans-serif` }}
        >
          A powerful platform designed to help you build amazing projects. 
          Get started today and see the difference.
        </p>
        
        <div className="flex flex-wrap justify-center gap-4">
          <button 
            className="px-6 py-3 rounded-md font-semibold"
            style={{ 
              backgroundColor: primaryColor,
              fontFamily: `'${bodyFont}', sans-serif`
            }}
          >
            Get Started
          </button>
          
          <button 
            className="px-6 py-3 rounded-md font-semibold"
            style={{ 
              backgroundColor: 'transparent',
              borderWidth: '1px',
              borderColor: secondaryColor,
              fontFamily: `'${bodyFont}', sans-serif`
            }}
          >
            Learn More
          </button>
        </div>
      </div>
      
      {/* Features section */}
      <div className="px-6 py-12">
        <h3 
          className="text-2xl font-bold mb-8 text-center"
          style={{ fontFamily: `'${headingFont}', sans-serif` }}
        >
          Key Features
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {['Fast & Responsive', 'Secure & Reliable', 'Easy to Use'].map((feature, idx) => (
            <div 
              key={idx}
              className="p-6 rounded-lg text-center"
              style={{ 
                backgroundColor: `${primaryColor}10`,
                borderWidth: '1px',
                borderColor: `${primaryColor}20`
              }}
            >
              <div 
                className="w-12 h-12 mx-auto rounded-full flex items-center justify-center mb-4"
                style={{ backgroundColor: `${secondaryColor}30` }}
              >
                {idx + 1}
              </div>
              
              <h4 
                className="text-lg font-semibold mb-2"
                style={{ fontFamily: `'${headingFont}', sans-serif` }}
              >
                {feature}
              </h4>
              
              <p className="opacity-70">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt.
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Form Layout Preset
const FormPreview: React.FC<PresetProps> = ({ 
  primaryColor, secondaryColor, headingFont, bodyFont, projectName, viewMode 
}) => {
  return (
    <div className="min-h-full flex justify-center items-center p-6">
      <div 
        className={`rounded-lg border p-6 ${viewMode === 'mobile' ? 'w-full' : 'w-[450px]'}`}
        style={{ 
          backgroundColor: `${primaryColor}10`,
          borderColor: `${primaryColor}30`
        }}
      >
        <h2 
          className="text-2xl font-bold mb-6 text-center"
          style={{ fontFamily: `'${headingFont}', sans-serif` }}
        >
          Join {projectName}
        </h2>
        
        <div className="space-y-4">
          <div>
            <label 
              className="block mb-1 text-sm font-medium"
              style={{ fontFamily: `'${bodyFont}', sans-serif` }}
            >
              Full Name
            </label>
            <input 
              type="text" 
              className="w-full p-2 rounded-md border"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: `${primaryColor}40`
              }}
            />
          </div>
          
          <div>
            <label 
              className="block mb-1 text-sm font-medium"
              style={{ fontFamily: `'${bodyFont}', sans-serif` }}
            >
              Email Address
            </label>
            <input 
              type="email" 
              className="w-full p-2 rounded-md border"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: `${primaryColor}40`
              }}
            />
          </div>
          
          <div>
            <label 
              className="block mb-1 text-sm font-medium"
              style={{ fontFamily: `'${bodyFont}', sans-serif` }}
            >
              Password
            </label>
            <input 
              type="password" 
              className="w-full p-2 rounded-md border"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: `${primaryColor}40`
              }}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              style={{ 
                accentColor: primaryColor
              }}
            />
            <label 
              className="text-sm"
              style={{ fontFamily: `'${bodyFont}', sans-serif` }}
            >
              I agree to the Terms and Conditions
            </label>
          </div>
          
          <button 
            className="w-full p-3 rounded-md font-semibold mt-6"
            style={{ 
              backgroundColor: primaryColor,
              fontFamily: `'${bodyFont}', sans-serif`
            }}
          >
            Create Account
          </button>
          
          <div className="text-center mt-4 text-sm opacity-70">
            Already have an account? <span style={{ color: secondaryColor }}>Sign In</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeNotesPreview;
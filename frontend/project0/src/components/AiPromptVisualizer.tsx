import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaRobot, FaCopy, FaCheck, FaCode, FaEdit, FaMarkdown, FaDownload, FaSave, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { Project } from '../types/project';

interface AiPromptVisualizerProps {
  project: Project | any;
}

const AiPromptVisualizer: React.FC<AiPromptVisualizerProps> = ({ project }) => {
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [promptFormat, setPromptFormat] = useState<'natural' | 'code' | 'markdown'>('natural');
  const [editedPrompt, setEditedPrompt] = useState<string>('');
  const promptRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const generatePrompt = async () => {
      try {

        setIsLoading(true);
        const response = await axios.post('http://localhost:3000/api/turntoprompt', {
          projectData: project
        });
        console.log(prompt);

        setPrompt(response.data.prompt);
        setEditedPrompt(response.data.prompt);
      } catch (error) {
        console.error('Error generating prompt:', error);
      } finally {
        setIsLoading(false);
      }
    };

    generatePrompt();
  }, [project]);

  const getFormattedPrompt = () => {
    switch (promptFormat) {
      case 'code':
        return `\`\`\`json\n${JSON.stringify(project, null, 2)}\n\`\`\``;
      case 'markdown':
        return editedPrompt;
      case 'natural':
      default:
        return editedPrompt;
    }
  };

  // Handle prompt copy
  const handleCopy = () => {
    navigator.clipboard.writeText(getFormattedPrompt());
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  // Handle saving edited prompt
  const handleSaveEdit = () => {
    setPrompt(editedPrompt);
    setIsEditing(false);
  };

  // Handle download as file
  const handleDownload = () => {
    const element = document.createElement('a');
    const file = new Blob([getFormattedPrompt()], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = `${project.project_name || 'project'}_prompt.md`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  // Auto-resize the textarea in edit mode
  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [editedPrompt, isEditing]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="my-12 max-w-6xl mx-auto px-4"
    >
      <div className="backdrop-blur-xl bg-slate-900/70 rounded-2xl border border-purple-500/40 shadow-2xl shadow-purple-500/20 overflow-hidden">
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-800/90 to-slate-900/90 border-b border-purple-500/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-br from-cyan-500/30 to-purple-600/30 border border-cyan-500/50 mr-4">
                <FaRobot className="text-2xl text-cyan-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  AI-Ready Prompt
                  {isLoading && <FaSpinner className="animate-spin text-purple-400 ml-2" />}
                </h2>
                <p className="text-cyan-300/70 text-sm">
                  Optimized for AI code generation tools
                </p>
              </div>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
              {/* Format switcher */}
              <div className="flex rounded-lg overflow-hidden backdrop-blur-sm border border-purple-500/30">
                <button 
                  onClick={() => setPromptFormat('natural')}
                  className={`px-3 py-1.5 text-sm flex items-center gap-1 ${promptFormat === 'natural' ? 'bg-purple-500/30 text-white' : 'bg-slate-800/50 text-gray-300'}`}
                >
                  <FaRobot className="text-xs" />
                  <span className="hidden sm:inline">Natural</span>
                </button>
                <button 
                  onClick={() => setPromptFormat('markdown')}
                  className={`px-3 py-1.5 text-sm flex items-center gap-1 ${promptFormat === 'markdown' ? 'bg-purple-500/30 text-white' : 'bg-slate-800/50 text-gray-300'}`}
                >
                  <FaMarkdown className="text-xs" />
                  <span className="hidden sm:inline">Markdown</span>
                </button>
                <button 
                  onClick={() => setPromptFormat('code')}
                  className={`px-3 py-1.5 text-sm flex items-center gap-1 ${promptFormat === 'code' ? 'bg-purple-500/30 text-white' : 'bg-slate-800/50 text-gray-300'}`}
                >
                  <FaCode className="text-xs" />
                  <span className="hidden sm:inline">JSON</span>
                </button>
              </div>
              
              {/* Action buttons */}
              <button
                onClick={handleCopy}
                className="px-4 py-2 rounded-lg backdrop-blur-sm bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/40 text-cyan-300 hover:text-white transition-all duration-200 text-sm flex items-center gap-1.5"
              >
                {isCopied ? <FaCheck /> : <FaCopy />}
                <span>{isCopied ? 'Copied!' : 'Copy'}</span>
              </button>
              
              <button
                onClick={handleDownload}
                className="px-4 py-2 rounded-lg backdrop-blur-sm bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/40 text-purple-300 hover:text-white transition-all duration-200 text-sm flex items-center gap-1.5"
              >
                <FaDownload />
                <span className="hidden sm:inline">Download</span>
              </button>
            </div>
          </div>
        </div>
        
        {/* Prompt content */}
        <div className="relative">
          {isLoading ? (
            <div className="min-h-[300px] flex items-center justify-center p-8">
              <div className="flex flex-col items-center">
                <FaSpinner className="animate-spin text-4xl text-purple-400 mb-4" />
                <p className="text-white/70">Generating AI-ready prompt...</p>
              </div>
            </div>
          ) : (
            <>
              <AnimatePresence mode="wait">
                {isEditing ? (
                  <motion.div
                    key="editing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    <textarea
                      ref={textareaRef}
                      value={editedPrompt}
                      onChange={(e) => setEditedPrompt(e.target.value)}
                      className="w-full p-6 min-h-[400px] max-h-[800px] text-white bg-slate-900/40 font-mono text-sm border-none focus:ring-0 resize-none overflow-y-auto"
                    />
                    <div className="absolute bottom-4 right-4 flex gap-2">
                      <button
                        onClick={() => setIsEditing(false)}
                        className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-white/70 hover:text-white transition-colors"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveEdit}
                        className="p-2 rounded-lg bg-cyan-600/30 hover:bg-cyan-600/50 border border-cyan-500/50 text-cyan-300 hover:text-white transition-colors flex items-center gap-1"
                      >
                        <FaSave className="text-sm" />
                        Save
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="viewing"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="relative"
                  >
                    <div 
                      ref={promptRef}
                      className="p-6 max-h-[600px] overflow-y-auto font-mono text-sm text-white/90 whitespace-pre-wrap"
                    >
                      {getFormattedPrompt()}
                    </div>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="absolute bottom-4 right-4 p-2 rounded-lg bg-slate-800/80 border border-purple-500/40 text-white/70 hover:text-white transition-colors"
                    >
                      <FaEdit />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
              
              {/* Interactive prompt decoration */}
              <div className="absolute top-0 left-0 w-2 h-full bg-gradient-to-b from-cyan-500/50 via-purple-500/50 to-pink-500/50"></div>
              <div className="absolute top-0 right-0 w-2 h-full bg-gradient-to-b from-pink-500/50 via-purple-500/50 to-cyan-500/50"></div>
            </>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 sm:p-5 bg-slate-900/90 border-t border-purple-500/30 text-center">
          <p className="text-white/50 text-sm">
            This prompt is optimized for AI assistants like GitHub Copilot, ChatGPT, and Claude that can work with your IDE
          </p>
        </div>
      </div>
      
      {/* Usage tips */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="backdrop-blur-sm bg-slate-800/40 p-4 rounded-lg border border-cyan-500/30 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-cyan-500/20 shrink-0">
            <FaCode className="text-cyan-400" />
          </div>
          <div>
            <h3 className="font-semibold text-cyan-300 mb-1">Use with Copilot</h3>
            <p className="text-white/70 text-sm">
              Paste into Copilot Chat in your IDE for context-aware coding assistance
            </p>
          </div>
        </div>
        
        <div className="backdrop-blur-sm bg-slate-800/40 p-4 rounded-lg border border-purple-500/30 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-purple-500/20 shrink-0">
            <FaEdit className="text-purple-400" />
          </div>
          <div>
            <h3 className="font-semibold text-purple-300 mb-1">Customize</h3>
            <p className="text-white/70 text-sm">
              Edit the prompt to focus on specific aspects of your project
            </p>
          </div>
        </div>
        
        <div className="backdrop-blur-sm bg-slate-800/40 p-4 rounded-lg border border-pink-500/30 flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg flex items-center justify-center bg-pink-500/20 shrink-0">
            <FaSave className="text-pink-400" />
          </div>
          <div>
            <h3 className="font-semibold text-pink-300 mb-1">Save & Version</h3>
            <p className="text-white/70 text-sm">
              Download and save different versions as your project evolves
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AiPromptVisualizer;
import React, { useState } from 'react';
import { FaRocket, FaCode, FaBrain, FaSpinner } from 'react-icons/fa';
import axios from 'axios';
import { Project, TimelineItem } from '../types/project';
import ColorSchemaList from './ColorSchemaList';
import FontsList from './FontsList';
import AdditionalNotes from './AdditionalNotes';
import YAMLViewer from './YAMLViewer';
import TechStack from './TechStack';
import Timeline from './Timeline';

const TestPage: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projectInfo, setProjectInfo] = useState<Project | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!projectDescription.trim()) {
      setError('Please enter a project description');
      return;
    }
    
    setError(null);
    setIsLoading(true);
    
    try {
      const { data } = await axios.post<Project>(
        'http://localhost:3000/api/getprojectinfo',
        { message: projectDescription },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      
      setProjectInfo(data);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || err.message);
      } else {
        setError('An unknown error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const formatTimelineSteps = (todoList: string[]): TimelineItem[] => {
    return todoList.map((step, index) => ({
      id: index + 1,
      title: `Phase ${index + 1}`,
      description: step,
      date: `Step ${index + 1}`
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="fixed inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
      
      <header className="container mx-auto pt-8 pb-12">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500">
            DevMatrix
          </h1>
          <p className="text-xl md:text-2xl bg-clip-text text-transparent bg-gradient-to-r from-teal-200 to-cyan-400 font-medium">
            Transform Your Ideas into Development Blueprints
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-7xl mx-auto backdrop-blur-sm bg-slate-800/50 p-6 md:p-10 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">
          
          <div className="flex flex-wrap -mx-4 mb-10">
            <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
              <div className="h-full p-6 rounded-lg bg-gradient-to-br from-cyan-900/50 to-slate-900/50 border border-cyan-500/30 flex flex-col items-center text-center">
                <FaCode className="text-cyan-400 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2 text-cyan-300">Full Tech Stack</h3>
                <p className="text-cyan-100/80">Get detailed recommendations for your project's tech stack</p>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 px-4 mb-6 md:mb-0">
              <div className="h-full p-6 rounded-lg bg-gradient-to-br from-purple-900/50 to-slate-900/50 border border-purple-500/30 flex flex-col items-center text-center">
                <FaRocket className="text-purple-400 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2 text-purple-300">Implementation Plan</h3>
                <p className="text-purple-100/80">Detailed roadmap to bring your project to life</p>
              </div>
            </div>
            
            <div className="w-full md:w-1/3 px-4">
              <div className="h-full p-6 rounded-lg bg-gradient-to-br from-pink-900/50 to-slate-900/50 border border-pink-500/30 flex flex-col items-center text-center">
                <FaBrain className="text-pink-400 text-4xl mb-4" />
                <h3 className="text-xl font-bold mb-2 text-pink-300">AI-Powered</h3>
                <p className="text-pink-100/80">Leverage AI to supercharge your development process</p>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="mb-6">
              <label htmlFor="projectDescription" className="block text-lg font-medium text-cyan-300 mb-2">
                Describe your project vision
              </label>
              <div className="relative">
                <textarea
                  id="projectDescription"
                  rows={5}
                  className="w-full px-4 py-3 bg-slate-800/80 text-white border border-purple-500/50 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/50 rounded-lg shadow-inner shadow-purple-900/30 outline-none transition"
                  placeholder="I want to create a social media platform for pet owners where they can share photos and connect with other pet enthusiasts..."
                  value={projectDescription}
                  onChange={(e) => setProjectDescription(e.target.value)}
                ></textarea>
                <div className="absolute inset-0 rounded-lg pointer-events-none border-2 border-transparent bg-conic-gradient opacity-70"></div>
              </div>
              {error && <p className="mt-2 text-pink-400">{error}</p>}
            </div>
            
            <div className="text-center">
              <button
                type="submit"
                disabled={isLoading}
                className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white font-bold rounded-lg shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 transition-all duration-200 disabled:opacity-70 disabled:transform-none"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <FaSpinner className="animate-spin mr-2" />
                    Generating Blueprint...
                  </span>
                ) : (
                  'Generate Project Blueprint'
                )}
              </button>
            </div>
          </form>
          
          {projectInfo && !isLoading && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <YAMLViewer
                  content={JSON.stringify(projectInfo.api_reference, null, 2)}
                  title="API Reference"
                />
                <Timeline steps={formatTimelineSteps(projectInfo.to_do_list)} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TechStack technologies={projectInfo.tech_stack} />
                <div className="space-y-6">
                  {projectInfo.Suggested_color_schema && (
                    <ColorSchemaList colors={projectInfo.Suggested_color_schema} />
                  )}
                  {projectInfo.Fonts_to_use && (
                    <FontsList fonts={projectInfo.Fonts_to_use} />
                  )}
                </div>
              </div>

              {projectInfo.additional_notes && (
                <div className="col-span-full">
                  <AdditionalNotes notes={projectInfo.additional_notes} />
                </div>
              )}
            </div>
          )}
        </div>
      </main>    
    </div>
  );
};

export default TestPage;

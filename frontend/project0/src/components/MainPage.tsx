import React, { useState } from 'react';
import { FaRocket, FaCode, FaBrain, FaSpinner } from 'react-icons/fa';
<<<<<<< HEAD
import { Project } from '../types/project';
import axios from "axios"
=======
import axios from 'axios';
import ProjectVisualiser from './ProjectVisualiser';
>>>>>>> c4c3d3ccba8473dd9925fbf75a4b00147728c00f

const MainPage: React.FC = () => {
  const [projectDescription, setProjectDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [projectInfo, setProjectInfo] = useState<Project>();
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
<<<<<<< HEAD
      const response = await axios.post('/api/getprojectinfo')
      if (!response.ok) {
        throw new Error('Failed to get project information');
      }
      
      const data = await response.data
=======
      const response = await axios.post('http://localhost:3000/api/getprojectinfo', {
        message: projectDescription
      });

      const data = response.data;
>>>>>>> c4c3d3ccba8473dd9925fbf75a4b00147728c00f
      setProjectInfo(data);
      console.log(data);

    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
      console.log(err);
    } finally {
      setIsLoading(false);
    }

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
        <div className="max-w-4xl mx-auto backdrop-blur-sm bg-slate-800/50 p-6 md:p-10 rounded-2xl border border-purple-500/30 shadow-lg shadow-purple-500/20">

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
<<<<<<< HEAD
          
          {projectInfo && !isLoading && (
            <div className="mt-10 p-6 rounded-lg bg-slate-800/80 border border-cyan-500/30 shadow-inner shadow-purple-900/30">
              <h2 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                {projectInfo.project_name || 'Your Project Blueprint'}
              </h2>
              
              <div className="prose prose-invert max-w-none">
                <div className="mb-6">
                  <h3 className="text-xl font-medium text-purple-300 mb-2">Main Features</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    {projectInfo.main_features?.map((feature: unknown, index: number) => (
                      <li key={index}>{typeof feature === 'string' ? feature : feature.name}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-xl font-medium text-cyan-300 mb-2">Tech Stack</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {Array.isArray(projectInfo.tech_stack) && projectInfo.tech_stack.map((tech: unknown, index: number) => (
                        <li key={index}>{typeof tech === 'string' ? tech : tech.name || tech.technology}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-medium text-pink-300 mb-2">Timeline</h3>
                    <p>{typeof projectInfo.estimated_timeline === 'string' 
                        ? projectInfo.estimated_timeline 
                        : Array.isArray(projectInfo.estimated_timeline) 
                          ? `${projectInfo.estimated_timeline[0]?.time || '8-12'} weeks` 
                          : '8-12 weeks'}</p>
                  </div>
                </div>
                
                <div className="mt-6 text-center">
                  <button className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium rounded-lg shadow-md shadow-purple-500/20 transform hover:-translate-y-1 transition-all duration-200">
                    View Full Blueprint
                  </button>
                </div>
              </div>
            </div>
          )}
=======
>>>>>>> c4c3d3ccba8473dd9925fbf75a4b00147728c00f
        </div>
      </main>

      {projectInfo && !isLoading &&
        <ProjectVisualiser project={projectInfo} />
      }
    </div>
  );
};

export default MainPage;

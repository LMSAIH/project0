import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FaServer, 
  FaPaintBrush, 
  FaCode, 
  FaPlug, 
  FaVial, 
  FaRocket, 
  FaBullhorn,
  FaSortAmountDown,
  FaSortAmountDownAlt,
  FaFilter
} from 'react-icons/fa';

interface ToDoListProps {
  todoList: string[];
}

type TodoItem = {
  category: string;
  task: string;
  priority: 'High' | 'Medium' | 'Low';
};

type SortType = 'priority' | 'category';
type SortDirection = 'asc' | 'desc';

const ToDoList: React.FC<ToDoListProps> = ({ todoList }) => {
  const [sortBy, setSortBy] = useState<SortType>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filter, setFilter] = useState<string>('All');

  // Parse todo list items
  const parseTodoItem = (item: string): TodoItem => {
    const categoryMatch = item.match(/^([^-]+) - /);
    const priorityMatch = item.match(/\(Priority: (High|Medium|Low)\)$/);
    
    return {
      category: categoryMatch ? categoryMatch[1].trim() : 'General',
      task: item.replace(/^([^-]+) - /, '').replace(/\(Priority: (High|Medium|Low)\)$/, '').trim(),
      priority: priorityMatch ? priorityMatch[1] as 'High' | 'Medium' | 'Low' : 'Medium'
    };
  };

  const parsedItems = todoList.map(parseTodoItem);

  const categories = ['All', ...new Set(parsedItems.map(item => item.category))];

  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      'Backend Development': <FaServer className="text-cyan-400" />,
      'Frontend Development': <FaPaintBrush className="text-pink-400" />,
      'API Design': <FaCode className="text-purple-400" />,
      'Integration': <FaPlug className="text-green-400" />,
      'Testing': <FaVial className="text-yellow-400" />,
      'Deployment': <FaRocket className="text-red-400" />,
      'Marketing': <FaBullhorn className="text-orange-400" />
    };
    return iconMap[category] || <FaCode className="text-white" />;
  };

  // Get color based on priority
  const getPriorityColor = (priority: string) => {
    const colorMap: Record<string, string> = {
      'High': 'bg-red-500/20 text-red-300 border-red-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
      'Low': 'bg-blue-500/20 text-blue-300 border-blue-500/30'
    };
    return colorMap[priority] || 'bg-gray-500/20 text-gray-300 border-gray-500/30';
  };

  const sortedAndFilteredItems = [...parsedItems]
    .filter(item => filter === 'All' || item.category === filter)
    .sort((a, b) => {
      const priorityRank = { 'High': 3, 'Medium': 2, 'Low': 1 };
      
      if (sortBy === 'priority') {
        const comparison = (priorityRank[a.priority] || 0) - (priorityRank[b.priority] || 0);
        return sortDirection === 'desc' ? -comparison : comparison;
      } else {
        const comparison = a.category.localeCompare(b.category);
        return sortDirection === 'desc' ? -comparison : comparison;
      }
    });

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <div className="py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold mb-6 text-center bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
          Implementation Roadmap
        </h2>

        <div className="flex flex-wrap gap-4 mb-8 justify-between">
          <div className="flex flex-wrap gap-3">
            <button 
              onClick={() => setFilter('All')}
              className={`px-4 py-2 rounded-lg backdrop-blur-sm ${
                filter === 'All' 
                  ? 'bg-purple-500/30 border border-purple-500/50' 
                  : 'bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50'
              } transition-all duration-200`}
            >
              All
            </button>
            
            {categories.filter(cat => cat !== 'All').map(category => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2 ${
                  filter === category 
                    ? 'bg-purple-500/30 border border-purple-500/50' 
                    : 'bg-slate-800/50 border border-slate-700/50 hover:border-cyan-500/50'
                } transition-all duration-200`}
              >
                {getCategoryIcon(category)}
                <span>{category.replace(' Development', '')}</span>
              </button>
            ))}
          </div>
          
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('priority')}
              className={`px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2 ${
                sortBy === 'priority' 
                  ? 'bg-cyan-500/30 border border-cyan-500/50' 
                  : 'bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50'
              } transition-all duration-200`}
            >
              <FaFilter />
              <span>Priority</span>
            </button>
            
            <button
              onClick={() => setSortBy('category')}
              className={`px-4 py-2 rounded-lg backdrop-blur-sm flex items-center gap-2 ${
                sortBy === 'category' 
                  ? 'bg-cyan-500/30 border border-cyan-500/50' 
                  : 'bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50'
              } transition-all duration-200`}
            >
              <FaFilter />
              <span>Category</span>
            </button>
            
            <button
              onClick={() => setSortDirection(sortDirection === 'desc' ? 'asc' : 'desc')}
              className="p-2 rounded-lg backdrop-blur-sm bg-slate-800/50 border border-slate-700/50 hover:border-purple-500/50 transition-all duration-200"
            >
              {sortDirection === 'desc' ? <FaSortAmountDown /> : <FaSortAmountDownAlt />}
            </button>
          </div>
        </div>

        {/* Todo items */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          {sortedAndFilteredItems.map((item, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
              className="backdrop-blur-sm bg-slate-800/50 p-5 rounded-xl border border-purple-500/30 shadow-lg shadow-purple-500/10"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  {getCategoryIcon(item.category)}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-medium text-cyan-300 mb-1">
                    {item.category}
                  </h3>
                  
                  <p className="text-white/90 mb-4">
                    {item.task}
                  </p>
                  
                  <div className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getPriorityColor(item.priority)} border`}>
                    Priority: {item.priority}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default ToDoList;
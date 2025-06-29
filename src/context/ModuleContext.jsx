import React, { createContext, useState } from 'react';

const ModuleContext = createContext();

export const ModuleProvider = ({ children }) => {
  const [modules, setModules] = useState([]);

  const addModules = (newModules) => {
    setModules(newModules);
  };

  const updateModule = (moduleId, updates) => {
    setModules(prevModules => 
      prevModules.map(module => 
        module.id === moduleId 
          ? { ...module, ...updates }
          : module
      )
    );
  };

  const markModuleComplete = (moduleId) => {
    updateModule(moduleId, { completed: true });
  };

  const clearModules = () => {
    setModules([]);
  };

  const getModuleProgress = () => {
    if (modules.length === 0) return 0;
    const completedCount = modules.filter(module => module.completed).length;
    return Math.round((completedCount / modules.length) * 100);
  };

  const getCurrentModule = () => {
    return modules.find(module => !module.completed) || modules[modules.length - 1];
  };

  const getModulesBySubject = (subject) => {
    return modules.filter(module => module.subject === subject);
  };

  const getModulesByPriority = (priority) => {
    return modules.filter(module => module.priority === priority);
  };

  const getHighPriorityModules = () => {
    return modules.filter(module => 
      module.priority === 'very_high' || module.priority === 'high'
    );
  };

  const value = {
    modules,
    setModules,
    addModules,
    updateModule,
    markModuleComplete,
    clearModules,
    getModuleProgress,
    getCurrentModule,
    getModulesBySubject,
    getModulesByPriority,
    getHighPriorityModules
  };

  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  );
};

// Export the context for use in the hook file
export { ModuleContext }; 
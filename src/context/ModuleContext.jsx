import React, { createContext, useContext, useState } from 'react';

const ModuleContext = createContext();

export const useModules = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error('useModules must be used within a ModuleProvider');
  }
  return context;
};

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

  const value = {
    modules,
    addModules,
    updateModule,
    markModuleComplete,
    clearModules
  };

  return (
    <ModuleContext.Provider value={value}>
      {children}
    </ModuleContext.Provider>
  );
}; 
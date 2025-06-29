import { useContext } from 'react';
import { ModuleContext } from './ModuleContext';

export const useModules = () => useContext(ModuleContext); 
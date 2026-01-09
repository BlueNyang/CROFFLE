import { ipcMain } from 'electron';
import { PluginStorageService } from '../core/plugin-data/service/PluginStorageService';

export const registerPluginStorageIpcHandlers = () => {
  ipcMain.handle('app:storage:get', (_, { pluginId, key }) => {
    PluginStorageService.get(pluginId, key);
  });
  ipcMain.handle('app:storage:set', (_, { pluginId, key, value }) => {
    PluginStorageService.set(pluginId, key, value);
  });
};

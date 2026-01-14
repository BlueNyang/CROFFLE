import { ipcMain } from 'electron';
import { pluginService } from '../core/plugin-info/service/PluginInfoService';
import { PluginInfo } from 'croffle';
import {
  validatePluginInstallation,
  validatePluginName,
  validatePluginToggle,
} from '../core/helper/pluginValidator';
import { PluginInfoMapper } from '../core/plugin-info/mapper/PluginInfoMapper';

export const registerPluginInfoIpcHandlers = (): void => {
  ipcMain.handle('pluginInfo:getInstalledPlugins', async (): Promise<PluginInfo[]> => {
    const entity = await pluginService.getInstalledPlugins();
    return entity.map(PluginInfoMapper.toInterface);
  });

  ipcMain.handle('pluginInfo:getEnabledPlugins', async (): Promise<PluginInfo[]> => {
    const entity = await pluginService.getEnabledPlugins();
    return entity.map(PluginInfoMapper.toInterface);
  });

  ipcMain.handle(
    'pluginInfo:getPluginByName',
    async (_, name: string): Promise<PluginInfo | null> => {
      validatePluginName(name);
      const entity = await pluginService.getPluginByName(name);
      return entity ? PluginInfoMapper.toInterface(entity) : null;
    }
  );

  ipcMain.handle(
    'pluginInfo:installPlugin',
    async (_, pluginData: Partial<PluginInfo>): Promise<PluginInfo> => {
      validatePluginInstallation(pluginData);

      const existing = await pluginService.getPluginByName(pluginData.name!);
      if (existing) {
        throw new Error(`Plugin with name "${pluginData.name}" is already installed.`);
      }

      const entity = await pluginService.installPlugin(pluginData);
      return PluginInfoMapper.toInterface(entity);
    }
  );

  ipcMain.handle(
    'pluginInfo:togglePlugin',
    async (_, name: string, enable: boolean): Promise<PluginInfo | null> => {
      validatePluginToggle(name, enable);
      const entity = await pluginService.togglePlugin(name, enable);
      return entity ? PluginInfoMapper.toInterface(entity) : null;
    }
  );

  ipcMain.handle('pluginInfo:uninstallPlugin', async (_, name: string): Promise<boolean> => {
    validatePluginName(name);
    return pluginService.uninstallPlugin(name);
  });
};

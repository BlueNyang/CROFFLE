import { ipcRenderer } from 'electron';
import { PluginInfo } from 'croffle';
import { PluginInfoAPI } from '../../ipc/pluginInfo.handler';

export const pluginInfoApi = {
  getInstalledPlugins: async (): Promise<PluginInfo[]> => {
    return ipcRenderer.invoke('pluginInfo:getInstalledPlugins');
  },

  getEnabledPlugins: async (): Promise<PluginInfo[]> => {
    return ipcRenderer.invoke('pluginInfo:getEnabledPlugins');
  },

  getPluginByName: async (name: string): Promise<PluginInfo | null> => {
    return ipcRenderer.invoke('pluginInfo:getPluginByName', name);
  },

  installPlugin: async (pluginData: Partial<PluginInfo>): Promise<PluginInfo> => {
    return ipcRenderer.invoke('pluginInfo:installPlugin', pluginData);
  },

  togglePlugin: async (name: string, enable: boolean): Promise<PluginInfo | null> => {
    return ipcRenderer.invoke('pluginInfo:togglePlugin', name, enable);
  },

  uninstallPlugin: async (name: string): Promise<boolean> => {
    return ipcRenderer.invoke('pluginInfo:uninstallPlugin', name);
  },
} satisfies PluginInfoAPI;

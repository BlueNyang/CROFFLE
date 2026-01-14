import { ipcRenderer } from 'electron';
import { PluginInfo, pluginInfo } from 'croffle';

type PluginInfoAPI = typeof pluginInfo;

export const pluginInfoApi = {
  getInstalled: async (): Promise<PluginInfo[]> => {
    return ipcRenderer.invoke('pluginInfo:getInstalledPlugins');
  },

  getEnabled: async (): Promise<PluginInfo[]> => {
    return ipcRenderer.invoke('pluginInfo:getEnabledPlugins');
  },

  getByName: async (name: string): Promise<PluginInfo | null> => {
    return ipcRenderer.invoke('pluginInfo:getPluginByName', name);
  },

  install: async (pluginData: Partial<PluginInfo>): Promise<PluginInfo> => {
    return ipcRenderer.invoke('pluginInfo:installPlugin', pluginData);
  },

  toggle: async (name: string, enable: boolean): Promise<PluginInfo | null> => {
    return ipcRenderer.invoke('pluginInfo:togglePlugin', name, enable);
  },

  uninstall: async (name: string): Promise<boolean> => {
    return ipcRenderer.invoke('pluginInfo:uninstallPlugin', name);
  },
} satisfies PluginInfoAPI;

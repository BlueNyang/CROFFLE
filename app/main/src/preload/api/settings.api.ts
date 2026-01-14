import { AppSettings, settings } from 'croffle';
import { ipcRenderer } from 'electron';

type SettingsAPI = typeof settings;

export const settingsApi = {
  getAll: async (): Promise<AppSettings> => {
    return ipcRenderer.invoke('settings:getAll');
  },

  getOf: async (key: string): Promise<AppSettings[keyof AppSettings]> => {
    return ipcRenderer.invoke('settings:getOf', key);
  },

  update: async (partialSettings: Partial<AppSettings>): Promise<AppSettings> => {
    return ipcRenderer.invoke('settings:update', partialSettings);
  },
} satisfies SettingsAPI;

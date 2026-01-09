import { contextBridge } from 'electron';
import { windowApi } from './api/window.api';
import { tagApi } from './api/tag.api';
import { pluginInfoApi } from './api/pluginInfo.api';
import { settingsApi } from './api/settings.api';
import { scheduleApi } from './api/schedule.api';
import { pluginStorageApi } from './api/pluginStorage.api';

const electronAPI = {
  ...windowApi,
  ...tagApi,
  ...pluginInfoApi,
  ...settingsApi,
  ...scheduleApi,
};

const appApi = {
  ...pluginStorageApi,
};

export type ElectronAPI = typeof electronAPI;
export type AppAPI = typeof appApi;

contextBridge.exposeInMainWorld('electronAPI', electronAPI);
contextBridge.exposeInMainWorld('appApi', appApi);

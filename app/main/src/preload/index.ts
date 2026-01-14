import { contextBridge } from 'electron';
import { windowApi } from './api/window.api';
import { tagApi } from './api/tag.api';
import { pluginInfoApi } from './api/pluginInfo.api';
import { settingsApi } from './api/settings.api';
import { scheduleApi } from './api/schedule.api';
import { pluginStorageApi } from './api/pluginStorage.api';

const croffleApi = {
  base: {
    windows: windowApi,
    tags: tagApi,
    schedules: scheduleApi,
    pluginInfo: pluginInfoApi,
    settings: settingsApi,
  },
  app: {
    storage: pluginStorageApi,
  },
};

contextBridge.exposeInMainWorld('croffle', croffleApi);

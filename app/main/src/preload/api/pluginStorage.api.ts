import { ipcRenderer } from 'electron';

export const pluginStorageApi = {
  storage: {
    get: (key: string) => {
      return ipcRenderer.invoke('app:storage:get', key);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    set: (key: string, value: any) => {
      return ipcRenderer.invoke('app:storage:set', { key, value });
    },
  },
};

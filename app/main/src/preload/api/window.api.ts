import { ipcRenderer } from 'electron';
import { windows } from 'croffle';

type WindowAPI = typeof windows;

export const windowApi = {
  // 윈도우 제어
  minimize: () => ipcRenderer.invoke('window:minimize'),
  maximize: () => ipcRenderer.invoke('window:maximize'),
  close: () => ipcRenderer.invoke('window:close'),
  exitApp: () => ipcRenderer.invoke('window:exitApp'),
  checkForUpdates: () => ipcRenderer.invoke('window:checkForUpdates'),
  setCloseToTrayMode: (enabled: boolean) => ipcRenderer.invoke('window:setCloseToTrayMode', enabled),
} satisfies WindowAPI;

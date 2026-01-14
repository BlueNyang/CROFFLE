import { ipcMain } from 'electron';
import { settingService } from '../core/settings/service/SettingService';
import { AppSettings } from 'croffle';

export const registerSettingsIpcHandlers = (): void => {
  ipcMain.handle('settings:getAll', async (): Promise<AppSettings> => {
    return settingService.get();
  });

  ipcMain.handle(
    'settings:getOf',
    async (_, key: unknown): Promise<AppSettings[keyof AppSettings]> => {
      if (typeof key !== 'string') {
        throw new Error('[Settings] Key must be a string.');
      }

      return settingService.getOf(key);
    }
  );

  ipcMain.handle(
    'settings:update',
    async (_, partialSettings: Partial<AppSettings>): Promise<AppSettings> => {
      return settingService.update(partialSettings);
    }
  );
};

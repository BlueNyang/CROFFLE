import { ipcRenderer } from 'electron';
import { Schedule, schedules } from 'croffle';

type ScheduleAPI = typeof schedules;

export const scheduleApi = {
  getAll: async (period: { start: string; end: string }): Promise<Schedule[]> => {
    return ipcRenderer.invoke('schedule:get', period);
  },

  create: async (data: Partial<Schedule>): Promise<Schedule> => {
    return ipcRenderer.invoke('schedule:create', data);
  },

  update: async (id: string, data: Partial<Schedule>): Promise<Schedule> => {
    return ipcRenderer.invoke('schedule:update', id, data);
  },

  remove: async (id: string): Promise<boolean> => {
    return ipcRenderer.invoke('schedule:delete', id);
  },
} satisfies ScheduleAPI;

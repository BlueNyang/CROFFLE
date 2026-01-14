import { ipcRenderer } from 'electron';
import { Tag, tags } from 'croffle';

type TagAPI = typeof tags;

export const tagApi = {
  getAll: async (): Promise<Tag[]> => {
    return ipcRenderer.invoke('tag:getAll');
  },

  getByName: async (name: string): Promise<Tag | null> => {
    return ipcRenderer.invoke('tag:getByName', name);
  },

  create: async (name: string, color: string): Promise<Tag> => {
    return ipcRenderer.invoke('tag:create', name, color);
  },

  modify: async (id: string, name: string, color: string): Promise<Tag> => {
    return ipcRenderer.invoke('tag:modify', id, name, color);
  },

  remove: async (id: string): Promise<boolean> => {
    return ipcRenderer.invoke('tag:remove', id);
  },
} satisfies TagAPI;

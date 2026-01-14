import { ipcMain } from 'electron';
import { tagService } from '../core/tags/service/TagService';
import { Tag } from 'croffle';
import { TagMapper } from '../core/tags/mapper/TagMapper';

export const registerTagIpcHandlers = (): void => {
  ipcMain.handle('tag:getAll', async (): Promise<Tag[]> => {
    const entity = await tagService.getAllTags();
    return entity.map(TagMapper.toInterface);
  });

  ipcMain.handle('tag:getByName', async (_, name: string): Promise<Tag | null> => {
    const tag = await tagService.getTagByName(name);
    return tag ? TagMapper.toInterface(tag) : null;
  });

  ipcMain.handle('tag:create', async (_, name: string, color: string): Promise<Tag> => {
    const newTag = await tagService.createTag(name, color);
    return TagMapper.toInterface(newTag);
  });

  ipcMain.handle('tag:modify', async (_, id: string, name: string, color: string): Promise<Tag> => {
    const updatedTag = await tagService.modifyTag(id, name, color);
    return TagMapper.toInterface(updatedTag);
  });

  ipcMain.handle('tag:remove', async (_, id: string): Promise<boolean> => {
    const result = await tagService.removeTag(id);
    return result;
  });
};

import { Not } from 'typeorm';
import { databaseManager } from '../../../services/DatabaseManager';
import { colorValidation } from '../../helper/colorValidation';
import { Tag } from '../model/Tag';
import { stringValidation } from '../../helper/stringValidation';

export const tagService = {
  getAllTags: async (): Promise<Tag[]> => {
    const tagRepo = databaseManager.getRepository(Tag);
    const tags = await tagRepo.find();
    return tags;
  },

  getTagByName: async (name: string): Promise<Tag | null> => {
    const tagRepo = databaseManager.getRepository(Tag);
    const tag = await tagRepo.findOneBy({ name });
    return tag;
  },

  createTag: async (name: string, color: string): Promise<Tag> => {
    const tagRepo = databaseManager.getRepository(Tag);

    if (!stringValidation(name, false, 50, 1)) {
      throw new Error('Invalid tag name');
    }

    // check validity for name and color could be added here
    const isExisting = await tagRepo.existsBy({ name });
    if (isExisting) {
      throw new Error('Tag with the same name already exists');
    }
    if (!colorValidation(color)) {
      throw new Error('Invalid color format');
    }

    const newTag = tagRepo.create({ name, color });
    await tagRepo.save(newTag);
    return newTag;
  },

  modifyTag: async (id: string, name: string, color: string): Promise<Tag> => {
    const tagRepo = databaseManager.getRepository(Tag);
    const tag = await tagRepo.findOneBy({ id });
    if (!tag) throw new Error('Tag not found');

    if (!stringValidation(name, false, 50, 1)) {
      throw new Error('Tag name must be between 1 and 50 characters');
    }

    const isExisting = await tagRepo.existsBy({ name, id: Not(id) });
    if (isExisting) {
      throw new Error('Another tag with the same name already exists');
    }

    if (!colorValidation(color)) {
      throw new Error('Invalid color format');
    }

    tag.name = name;
    tag.color = color;
    await tagRepo.save(tag);
    return tag;
  },

  removeTag: async (id: string): Promise<boolean> => {
    const tagRepo = databaseManager.getRepository(Tag);
    const tag = await tagRepo.findOneBy({ id });
    if (!tag) throw new Error('Tag not found');

    await tagRepo.remove(tag);
    return true;
  },
};

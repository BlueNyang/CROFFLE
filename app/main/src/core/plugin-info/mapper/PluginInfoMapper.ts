import { PluginInfo as PluginInfoEntity } from '../model/PluginInfo';
import { PluginInfo } from 'croffle';

export const PluginInfoMapper = {
  toInterface(entity: PluginInfoEntity): PluginInfo {
    return {
      ...entity,
      description: entity.description || '',
    };
  },

  toEntity(api: PluginInfo): PluginInfoEntity {
    const entity = new PluginInfoEntity();
    entity.id = api.id;
    entity.name = api.name;
    entity.version = api.version;
    entity.author = api.author;
    entity.description = api.description || undefined;
    entity.enabled = api.enabled;
    return entity;
  },
};

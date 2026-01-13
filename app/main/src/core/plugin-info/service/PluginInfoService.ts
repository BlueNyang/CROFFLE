import { databaseManager } from '../../../services/DatabaseManager';
import { PluginInfo } from '../model/PluginInfo';

export const pluginService = {
  getInstalledPlugins: async (): Promise<PluginInfo[]> => {
    const repo = databaseManager.getRepository(PluginInfo);
    return repo.find({
      order: {
        name: 'ASC',
      },
    });
  },

  getEnabledPlugins: async (): Promise<PluginInfo[]> => {
    const repo = databaseManager.getRepository(PluginInfo);
    return repo.find({
      where: {
        enabled: true,
      },
      order: {
        name: 'ASC',
      },
    });
  },

  getPluginByName: async (name: string): Promise<PluginInfo | null> => {
    const repo = databaseManager.getRepository(PluginInfo);
    return repo.findOne({
      where: {
        name,
      },
    });
  },

  installPlugin: async (pluginData: Partial<PluginInfo>): Promise<PluginInfo> => {
    const repo = databaseManager.getRepository(PluginInfo);

    const existing = await repo.findOne({ where: { name: pluginData.name! } });
    if (existing) {
      throw new Error(`Plugin with name "${pluginData.name}" is already installed.`);
    }

    const plugin = repo.create(pluginData);
    return repo.save(plugin);
  },

  togglePlugin: async (name: string, enable: boolean): Promise<PluginInfo | null> => {
    const repo = databaseManager.getRepository(PluginInfo);
    const plugin = await repo.findOne({ where: { name } });
    if (!plugin) {
      throw new Error(`Plugin "${name}" not found.`);
    }
    plugin.enabled = enable;
    return repo.save(plugin);
  },

  uninstallPlugin: async (name: string): Promise<boolean> => {
    const repo = databaseManager.getRepository(PluginInfo);
    const result = await repo.delete({ name });
    return result.affected !== undefined && result.affected !== null && result.affected > 0;
  },
};

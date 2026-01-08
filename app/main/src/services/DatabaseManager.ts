import { DataSource, ObjectLiteral, Repository } from 'typeorm';
import * as path from 'path';
import { app } from 'electron';
import { Tag } from '../core/tags/model/Tag';
import { Schedule } from '../core/schedules/model/Schedule';
import { PluginInfo } from '../core/plugin-info/model/PluginInfo';
import { PluginStorage } from '../core/plugin-data/model/PluginStorage';

class DatabaseManager {
  private dataSource: DataSource;

  constructor() {
    const dbPath = path.join(app.getPath('userData'), 'croffledb.sqlite');

    console.debug(`[DB] Database path: ${dbPath}`);

    this.dataSource = new DataSource({
      type: 'sqlite',
      database: dbPath,
      entities: [Tag, Schedule, PluginInfo, PluginStorage],
      synchronize: process.env.NODE_ENV === 'development',
      logging: process.env.NODE_ENV === 'development',
    });
  }

  public async initialize(): Promise<void> {
    if (!this.dataSource.isInitialized) {
      try {
        await this.dataSource.initialize();
        console.log('[DB] Database initialized successfully.');
      } catch (error) {
        console.error('[DB] Error during database initialization:', error);
        throw error;
      }
    }
  }

  public getRepository<T extends ObjectLiteral>(entity: new () => T): Repository<T> {
    if (!this.dataSource.isInitialized) {
      throw new Error('Database not initialized. Call initialize() first.');
    }
    return this.dataSource.getRepository(entity);
  }

  public async save<T extends ObjectLiteral>(entity: T): Promise<T> {
    const repository = this.dataSource.getRepository(
      entity.constructor as new () => T
    ) as Repository<T>;
    const result = await repository.save(entity);
    return result;
  }
}

export const databaseManager = new DatabaseManager();

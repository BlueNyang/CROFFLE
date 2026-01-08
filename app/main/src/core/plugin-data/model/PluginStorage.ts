import { Column, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm';

@Entity('plugin_storage')
export class PluginStorage {
  @PrimaryColumn()
  pluginId: string;

  @PrimaryColumn()
  key: string;

  @Column('text')
  value: string;

  @UpdateDateColumn()
  updatedAt: Date;
}

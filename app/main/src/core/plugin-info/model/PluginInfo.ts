import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class PluginInfo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  version: string;

  @Column()
  author: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ default: false })
  enabled: boolean;
}

import { Tag as TagEntity } from '../model/Tag';
import { Tag as TagInterface } from 'croffle';

export const TagMapper = {
  toInterface(entity: TagEntity): TagInterface {
    return {
      ...entity,
    };
  },
  toEntity(data: Partial<TagInterface>): Partial<TagEntity> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entityData: any = { ...data };
    return entityData;
  },
};

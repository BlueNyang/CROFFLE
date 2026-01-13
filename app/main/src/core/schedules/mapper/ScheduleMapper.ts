import { Schedule as ScheduleEntity } from '../model/Schedule';
import { Schedule as ScheduleInterface } from 'croffle';

export const ScheduleMapper = {
  toInterface(entity: ScheduleEntity): ScheduleInterface {
    return {
      ...entity,
      startDate: entity.startDate.toISOString(),
      endDate: entity.endDate.toISOString(),
      createdAt: entity.createdAt.toISOString(),
      updatedAt: entity.updatedAt.toISOString(),
      tags: entity.tags?.map((tag) => ({ ...tag })) || [],
    };
  },

  toEntity(data: Partial<ScheduleInterface>): Partial<ScheduleEntity> {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const entityData: any = { ...data };
    if (data.startDate) entityData.startDate = new Date(data.startDate);
    if (data.endDate) entityData.endDate = new Date(data.endDate);
    if (data.createdAt) entityData.createdAt = new Date(data.createdAt);
    if (data.updatedAt) entityData.updatedAt = new Date(data.updatedAt);
    return entityData;
  },
};

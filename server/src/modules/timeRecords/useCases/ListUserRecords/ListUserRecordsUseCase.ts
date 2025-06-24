import { TimeRecord } from '../../entities/TimeRecord';
import { ITimeRecordRepository } from '../../repositories/ITimeRecordRepository';

interface IRequest {
  userId: string;
}

export class ListUserRecordsUseCase {
  constructor(private timeRecordRepository: ITimeRecordRepository) {}

  async execute({ userId }: IRequest): Promise<TimeRecord[]> {
   
    const records = await this.timeRecordRepository.findManyByUserId(userId);

    return records;
  }
}
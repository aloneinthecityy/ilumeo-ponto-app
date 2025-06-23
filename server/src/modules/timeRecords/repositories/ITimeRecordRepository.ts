import { TimeRecord } from '../entities/TimeRecord';

export interface ITimeRecordRepository {
  create(data: { userId: string, timestamp: Date, type: 'IN' | 'OUT' }): Promise<TimeRecord>;
  findLastByUserId(userId: string): Promise<TimeRecord | null>;
  findByUserIdAndDate(userId: string, date: Date): Promise<TimeRecord[]>;
  findUserByAccessCode(accessCode: string): Promise<{ id: string, name: string } | null>;
}
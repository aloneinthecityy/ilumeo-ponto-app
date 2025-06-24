import { User } from '../../../users/entities/User';
import { TimeRecord } from '../../entities/TimeRecord';
import { ITimeRecordRepository } from '../ITimeRecordRepository';

export class InMemoryTimeRecordRepository implements ITimeRecordRepository {
  public timeRecords: TimeRecord[] = [];
  public users: User[] = [];

  async findByUserIdAndDate(userId: string, date: Date): Promise<TimeRecord[]> {
    // Filtra os registros do usuário na mesma data (ignorando hora)
    return this.timeRecords.filter(record => {
      if (record.userId !== userId) return false;
      const recordDate = record.timestamp;
      return (
        recordDate.getFullYear() === date.getFullYear() &&
        recordDate.getMonth() === date.getMonth() &&
        recordDate.getDate() === date.getDate()
      );
    });
  }

  async findUserByAccessCode(
    accessCode: string,
  ): Promise<{ id: string; name: string } | null> {
    const user = this.users.find(user => user.accessCode === accessCode);
    if (!user) return null;
    return { id: user.id, name: user.name };
  }

  async findLastByUserId(userId: string): Promise<TimeRecord | null> {
    const userRecords = this.timeRecords
      .filter(item => item.userId === userId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());

    return userRecords[0] || null;
  }

  async create(data: {
    userId: string;
    timestamp: Date;
    type: 'IN' | 'OUT';
  }): Promise<TimeRecord> {
    const timeRecord = new TimeRecord(data);
    this.timeRecords.push(timeRecord);
    return timeRecord;
  }

  async findManyByUserId(userId: string): Promise<TimeRecord[]> {
    const records = this.timeRecords
      .filter(record => record.userId === userId)
      .sort((a, b) => a.timestamp.getTime() - b.timestamp.getTime()); // Ordena do mais antigo para o mais novo

    return records;
  }
}

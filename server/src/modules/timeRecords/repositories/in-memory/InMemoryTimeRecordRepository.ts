// Em: src/modules/timeRecords/repositories/in-memory/InMemoryTimeRecordRepository.ts
import { User } from '../../../users/entities/User';
import { TimeRecord } from '../../entities/TimeRecord';
import { ITimeRecordRepository } from '../ITimeRecordRepository';

export class InMemoryTimeRecordRepository implements ITimeRecordRepository {
  // Simula a tabela de "time_records"
  public timeRecords: TimeRecord[] = [];
  // Simula a tabela de "users"
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
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Ordena do mais recente para o mais antigo

    return userRecords[0] || null;
  }

  async create(data: {
    userId: string;
    timestamp: Date;
    type: 'IN' | 'OUT';
  }): Promise<TimeRecord> {
    // Agora o 'data' que passamos aqui corresponde exatamente
    // ao que o construtor do TimeRecord espera.
    const timeRecord = new TimeRecord(data);
    this.timeRecords.push(timeRecord);
    return timeRecord;
  }
}

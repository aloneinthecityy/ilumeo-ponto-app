import { PrismaClient } from '@prisma/client';
import { TimeRecord } from '../../entities/TimeRecord';
import { ITimeRecordRepository } from '../ITimeRecordRepository';
import { User } from '../../../users/entities/User';
import { prisma } from '../../../../shared/infra/prisma'; 

export class PrismaTimeRecordRepository implements ITimeRecordRepository {
  findByUserIdAndDate(userId: string, date: Date): Promise<TimeRecord[]> {
      throw new Error('Method not implemented.');
  }
  
  async findUserByAccessCode(accessCode: string): Promise<User | null> {
    const user = await prisma.user.findUnique({
      where: { accessCode }, 
    });
    return user;
  }
  
  async findLastByUserId(userId: string): Promise<TimeRecord | null> {
    const lastRecord = await prisma.timeRecord.findFirst({
      where: { userId },
      orderBy: {
        timestamp: 'desc', 
      },
    });
    return lastRecord;
  }

  async create(data: { userId: string; timestamp: Date; type: "IN" | "OUT"; }): Promise<TimeRecord> {
    const timeRecord = await prisma.timeRecord.create({
      data: {
        userId: data.userId,
        timestamp: data.timestamp,
        type: data.type,
      },
    });
    return timeRecord;
  }

   async findManyByUserId(userId: string): Promise<TimeRecord[]> {
    const records = await prisma.timeRecord.findMany({
      where: {
        userId,
      },
      orderBy: {
        timestamp: 'asc', 
      },
    });

    return records;
  }
}
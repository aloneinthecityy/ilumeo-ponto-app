import { PrismaTimeRecordRepository } from '../../repositories/implementations/PrismaTimeRecordRepository';
import { ListUserRecordsUseCase } from './ListUserRecordsUseCase';
import { ListUserRecordsController } from './ListUserRecordsController';

const makeListUserRecordsController = (): ListUserRecordsController => {
  const timeRecordRepository = new PrismaTimeRecordRepository();
  const listUserRecordsUseCase = new ListUserRecordsUseCase(timeRecordRepository);
  const listUserRecordsController = new ListUserRecordsController(listUserRecordsUseCase);
  
  return listUserRecordsController;
};

export { makeListUserRecordsController };
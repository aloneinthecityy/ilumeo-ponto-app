import { InMemoryTimeRecordRepository } from '../../repositories/in-memory/InMemoryTimeRecordRepository';
import { ListUserRecordsUseCase } from './ListUserRecordsUseCase';
import { User } from '../../../users/entities/User';

let inMemoryTimeRecordRepository: InMemoryTimeRecordRepository;
let listUserRecordsUseCase: ListUserRecordsUseCase;
let fakeUser: User;
let anotherFakeUser: User;

describe('List User Records Use Case', () => {
  beforeEach(async () => {
    inMemoryTimeRecordRepository = new InMemoryTimeRecordRepository();
    listUserRecordsUseCase = new ListUserRecordsUseCase(inMemoryTimeRecordRepository);
    
    fakeUser = new User();
    Object.assign(fakeUser, { id: 'user-01', name: 'Test User', accessCode: '#TEST01' });
    inMemoryTimeRecordRepository.users.push(fakeUser);
    
    anotherFakeUser = new User();
    Object.assign(anotherFakeUser, { id: 'user-02', name: 'Empty User', accessCode: '#TEST02' });
    inMemoryTimeRecordRepository.users.push(anotherFakeUser);

    await inMemoryTimeRecordRepository.create({ userId: fakeUser.id, type: 'IN', timestamp: new Date('2025-01-01T08:00:00Z') });
    await inMemoryTimeRecordRepository.create({ userId: fakeUser.id, type: 'OUT', timestamp: new Date('2025-01-01T17:00:00Z') });
  });

  it('should be able to list all records for a given user', async () => {
    const records = await listUserRecordsUseCase.execute({ userId: fakeUser.id });

    expect(records).toHaveLength(2); 
    expect(records[0].type).toBe('IN');
  });

  it('should return an empty array if the user has no records', async () => {
    const records = await listUserRecordsUseCase.execute({ userId: anotherFakeUser.id });

    expect(records).toBeInstanceOf(Array);
    expect(records).toHaveLength(0);
  });
});
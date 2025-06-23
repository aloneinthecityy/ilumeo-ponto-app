import { User } from '../../../users/entities/User';
import { InMemoryTimeRecordRepository } from '../../repositories/in-memory/InMemoryTimeRecordRepository';
import { ClockInUseCase } from './ClockInUseCase';

let inMemoryTimeRecordRepository: InMemoryTimeRecordRepository;
let clockInUseCase: ClockInUseCase;
let fakeUser: User;

// `describe` agrupa um conjunto de testes relacionados
describe('Clock In Use Case', () => {
  
  // `beforeEach` é uma função do Jest que roda ANTES de CADA teste (`it`)
  beforeEach(() => {
    inMemoryTimeRecordRepository = new InMemoryTimeRecordRepository();
    clockInUseCase = new ClockInUseCase(inMemoryTimeRecordRepository);

    fakeUser = new User();
    Object.assign(fakeUser, {
      id: 'user-id-01',
      name: 'John Doe',
      accessCode: '#VALID123',
    });

    inMemoryTimeRecordRepository.users.push(fakeUser);
  });

  // `it` ou `test` define um cenário de teste específico.
  it('should be able to create a new time record when clocking in', async () => {
    const result = await clockInUseCase.execute({ accessCode: '#VALID123' });

    expect(result).toHaveProperty('id');
    expect(result.type).toBe('IN');
    expect(result.userId).toBe(fakeUser.id);
  });

  it('should not be able to clock in with a non-existing access code', async () => {
    await expect(
      clockInUseCase.execute({ accessCode: '#INVALID' })
    ).rejects.toBeInstanceOf(Error);
  });
  
  it('should not be able to clock in if the user already has an open shift', async () => {
    await clockInUseCase.execute({ accessCode: '#VALID123' });

    await expect(
      clockInUseCase.execute({ accessCode: '#VALID123' })
    ).rejects.toBeInstanceOf(Error);
  });

});
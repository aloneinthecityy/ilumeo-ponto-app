import { User } from '../../../users/entities/User';
import { InMemoryTimeRecordRepository } from '../../repositories/in-memory/InMemoryTimeRecordRepository';
import { ClockOutUseCase } from './ClockOutUseCase';

let inMemoryTimeRecordRepository: InMemoryTimeRecordRepository;
let clockOutUseCase: ClockOutUseCase;
let fakeUser: User;

describe('Clock Out Use Case', () => {
  beforeEach(() => {
    inMemoryTimeRecordRepository = new InMemoryTimeRecordRepository();
    clockOutUseCase = new ClockOutUseCase(inMemoryTimeRecordRepository);

    fakeUser = new User();
    Object.assign(fakeUser, {
      id: 'user-id-01',
      name: 'John Doe',
      accessCode: '#VALID123',
    });

    inMemoryTimeRecordRepository.users.push(fakeUser);
  });

  it('should be able to create a new time record when clocking out', async () => {
    await inMemoryTimeRecordRepository.create({
      userId: fakeUser.id, // O ID do nosso usuário de teste
      type: 'IN',
      timestamp: new Date(),
    });

    const result = await clockOutUseCase.execute({ accessCode: '#VALID123' });

    expect(result).toHaveProperty('id');
    expect(result.type).toBe('OUT');
    expect(result.userId).toBe(fakeUser.id);
  });

  it('should not be able to clock out with a non-existing access code', async () => {
    await expect(
      clockOutUseCase.execute({ accessCode: '#INVALID' }),
    ).rejects.toBeInstanceOf(Error);
  });

  it('should not be able to clock out if the user does not have an open shift', async () => {
    await expect(
      clockOutUseCase.execute({ accessCode: '#VALID123' }),
    ).rejects.toThrow('Usuário não tem um turno aberto');
  });
});

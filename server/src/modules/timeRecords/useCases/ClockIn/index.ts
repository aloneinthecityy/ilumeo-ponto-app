import { InMemoryTimeRecordRepository } from '../../repositories/in-memory/InMemoryTimeRecordRepository'; // Usaremos a versão em memória por enquanto
import { ClockInUseCase } from './ClockInUseCase';
import { ClockInController } from './ClockInController';

const timeRecordRepository = new InMemoryTimeRecordRepository(); // 1. Cria o repositório
const clockInUseCase = new ClockInUseCase(timeRecordRepository); // 2. Injeta no UseCase
const clockInController = new ClockInController(clockInUseCase); // 3. Injeta o UseCase no Controller

export { clockInController };
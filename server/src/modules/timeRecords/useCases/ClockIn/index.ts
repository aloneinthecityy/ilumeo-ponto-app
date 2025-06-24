import { PrismaTimeRecordRepository } from '../../repositories/implementations/PrismaTimeRecordRepository';
import { ClockInUseCase } from './ClockInUseCase';
import { ClockInController } from './ClockInController';

const timeRecordRepository = new PrismaTimeRecordRepository(); // 1. Cria o repositório
const clockInUseCase = new ClockInUseCase(timeRecordRepository); // 2. Injeta no UseCase
const clockInController = new ClockInController(clockInUseCase); // 3. Injeta o UseCase no Controller

export { clockInController };
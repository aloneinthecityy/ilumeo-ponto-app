import { PrismaTimeRecordRepository } from '../../repositories/implementations/PrismaTimeRecordRepository';
import { ClockOutUseCase } from './ClockOutUseCase';
import { ClockOutController } from './ClockOutController';

const timeRecordRepository = new PrismaTimeRecordRepository(); // 1. Cria o repositório
const clockOutUseCase = new ClockOutUseCase(timeRecordRepository); // 2. Injeta no UseCase
const clockOutController = new ClockOutController(clockOutUseCase); // 3. Injeta o UseCase no Controller

export { clockOutController };
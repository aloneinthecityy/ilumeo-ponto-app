import { TimeRecord } from '../../entities/TimeRecord';
import { ITimeRecordRepository } from '../../repositories/ITimeRecordRepository';

interface IRequest {
  accessCode: string;
}

export class ClockInUseCase {
  constructor(private timeRecordRepository: ITimeRecordRepository) {}

  async execute({ accessCode }: IRequest): Promise<TimeRecord> {
    const user = await this.timeRecordRepository.findUserByAccessCode(accessCode);

    if (!user) {
      throw new Error('Código de acesso inválido ou usuário não encontrado.');
    }
    
    const userId = user.id;

    const lastRecord = await this.timeRecordRepository.findLastByUserId(userId);

    if (lastRecord && lastRecord.type === 'IN') {
      throw new Error('Usuário já tem um turno aberto. Não é possível registrar ponto de entrada novamente.');
    }

    const newRecord = await this.timeRecordRepository.create({
      userId, 
      timestamp: new Date(),
      type: 'IN',
    });

    return newRecord;
  }
}
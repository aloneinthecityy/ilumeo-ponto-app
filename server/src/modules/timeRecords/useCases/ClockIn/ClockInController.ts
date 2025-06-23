import { Request, Response } from 'express';
import { ClockInUseCase } from './ClockInUseCase';

export class ClockInController {
  constructor(private clockInUseCase: ClockInUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { accessCode } = request.body; 

    if (!accessCode) {
      return response.status(400).json({ message: 'Access code is required.' });
    }

    try {
      const record = await this.clockInUseCase.execute({ accessCode });
      return response.status(201).json(record);
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('not found')) {
          return response.status(404).json({ message: error.message });
        }
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
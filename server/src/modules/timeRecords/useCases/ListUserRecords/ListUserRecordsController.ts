import { Request, Response } from 'express';
import { ListUserRecordsUseCase } from './ListUserRecordsUseCase';

export class ListUserRecordsController {
  constructor(private listUserRecordsUseCase: ListUserRecordsUseCase) {}

  async handle(request: Request, response: Response): Promise<Response> {
    const { userId } = request.params;

    try {
      const records = await this.listUserRecordsUseCase.execute({ userId });
      
      return response.status(200).json(records);

    } catch (error) {
      if (error instanceof Error) {
        return response.status(400).json({ message: error.message });
      }
      return response.status(500).json({ message: 'Internal Server Error' });
    }
  }
}
import { Router, Request, Response, NextFunction } from 'express';

import { clockInController } from '../../../useCases/ClockIn';
import { clockOutController } from '../../../useCases/ClockOut';
import { makeListUserRecordsController } from '../../../useCases/ListUserRecords';

const timeRecordsRouter = Router();

const asyncHandler = (fn: (req: Request, res: Response, next: NextFunction) => Promise<any>) => 
  (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

const listUserRecordsController = makeListUserRecordsController();

timeRecordsRouter.post('/clock-in', asyncHandler(async (request: Request, response: Response) => {
  await clockInController.handle(request, response);
}));


timeRecordsRouter.post('/clock-out', asyncHandler(async (request: Request, response: Response) => {
  await clockOutController.handle(request, response);
}));


timeRecordsRouter.get('/:userId', asyncHandler(async (request: Request, response: Response) => {
  await listUserRecordsController.handle(request, response);
}));


export { timeRecordsRouter };
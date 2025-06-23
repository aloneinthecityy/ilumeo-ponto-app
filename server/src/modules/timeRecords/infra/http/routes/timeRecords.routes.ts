import { Router } from 'express';
import { clockInController } from '../../../useCases/ClockIn';
import { clockOutController } from '../../../useCases/ClockOut';

const timeRecordsRouter = Router();

timeRecordsRouter.post('/clock-in', (request, response) => {
  return clockInController.handle(request, response);
});

timeRecordsRouter.post('/clock-out', (request, response) => {
  return clockOutController.handle(request, response);
});


export { timeRecordsRouter };
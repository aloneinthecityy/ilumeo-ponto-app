import { Router } from 'express';
import { timeRecordsRouter } from '../../../modules/timeRecords/infra/http/routes/timeRecords.routes.ts';

const router = Router();

router.use('/records', timeRecordsRouter);

export { router };
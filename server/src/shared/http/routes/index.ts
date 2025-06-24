import { Router } from 'express';
import { timeRecordsRouter } from '../../../modules/timeRecords/infra/http/routes/timeRecords.routes';

const router = Router();

router.use('/records', timeRecordsRouter);

export { router };
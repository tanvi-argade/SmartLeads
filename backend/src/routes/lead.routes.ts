import { Router } from 'express';
import { getLeads, getLeadById, createLead, updateLead, deleteLead, exportLeadsCSV } from '../controllers/lead.controller';
import { authenticate } from '../middleware/auth.middleware';
import { requireRole } from '../middleware/role.middleware';
import { validate } from '../middleware/validate.middleware';
import { createLeadSchema, updateLeadSchema } from '../schemas/lead.schema';

const router = Router();
router.use(authenticate);

router.get('/', getLeads);
router.get('/export/csv', requireRole('admin'), exportLeadsCSV);
router.get('/:id', getLeadById);
router.post('/', validate(createLeadSchema), createLead);
router.put('/:id', validate(updateLeadSchema), updateLead);
router.delete('/:id', requireRole('admin'), deleteLead);

export default router;

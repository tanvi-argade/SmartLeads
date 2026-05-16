import { z } from 'zod';

export const createLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2, 'Name is required'),
    email: z.string().email('Invalid email'),
    status: z.enum(['new', 'contacted', 'qualified', 'lost']).default('new'),
    source: z.enum(['website', 'instagram', 'referral']),
  }),
});

export const updateLeadSchema = z.object({
  body: z.object({
    name: z.string().min(2).optional(),
    email: z.string().email().optional(),
    status: z.enum(['new', 'contacted', 'qualified', 'lost']).optional(),
    source: z.enum(['website', 'instagram', 'referral']).optional(),
  }),
});

import mongoose, { Schema, Document } from 'mongoose';
import { ILead } from '../types/lead.types';

export interface ILeadDocument extends Omit<ILead, '_id'>, Document {}

const LeadSchema = new Schema<ILeadDocument>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true, trim: true },
    status: { type: String, enum: ['new', 'contacted', 'qualified', 'lost'], default: 'new' },
    source: { type: String, enum: ['website', 'instagram', 'referral'], required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  },
  { timestamps: true }
);

LeadSchema.index({ name: 'text', email: 'text' });
LeadSchema.index({ status: 1, source: 1, createdAt: -1 });

export const Lead = mongoose.model<ILeadDocument>('Lead', LeadSchema);

import { Request, Response, NextFunction } from 'express';
import { Lead } from '../models/Lead.model';
import { LeadQueryParams } from '../types/lead.types';
import { sendSuccess, sendError } from '../utils/response.utils';
import { FilterQuery } from 'mongoose';
import { ILeadDocument } from '../models/Lead.model';

export const getLeads = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const {
      page = 1,
      limit = 10,
      status,
      source,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
    } = req.query as unknown as LeadQueryParams;

    const pageNum = Math.max(1, Number(page));
    const limitNum = Math.min(50, Math.max(1, Number(limit)));
    const skip = (pageNum - 1) * limitNum;

    const filter: FilterQuery<ILeadDocument> = {};
    if (status) filter.status = status;
    if (source) filter.source = source;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [leads, total] = await Promise.all([
      Lead.find(filter)
        .sort({ [sortBy]: sortOrder === 'asc' ? 1 : -1 })
        .skip(skip)
        .limit(limitNum)
        .populate('createdBy', 'name email'),
      Lead.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(total / limitNum);
    sendSuccess(res, 'Leads fetched', leads, undefined, {
      total,
      page: pageNum,
      limit: limitNum,
      totalPages,
      hasNextPage: pageNum < totalPages,
      hasPrevPage: pageNum > 1,
    });
  } catch (err) {
    next(err);
  }
};

export const getLeadById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate('createdBy', 'name email');
    if (!lead) { sendError(res, 'Lead not found', 404); return; }
    sendSuccess(res, 'Lead fetched', lead);
  } catch (err) {
    next(err);
  }
};

export const createLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const lead = await Lead.create({ ...req.body, createdBy: req.user!.id });
    sendSuccess(res, 'Lead created', lead, 201);
  } catch (err) {
    next(err);
  }
};

export const updateLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user!;
    const lead = await Lead.findById(req.params.id);
    if (!lead) { sendError(res, 'Lead not found', 404); return; }
    if (user.role !== 'admin' && lead.createdBy.toString() !== user.id) {
      sendError(res, 'Forbidden insufficient permissions', 403); return;
    }
    const updated = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    sendSuccess(res, 'Lead updated', updated);
  } catch (err) {
    next(err);
  }
};

export const deleteLead = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const user = req.user!;
    if (user.role !== 'admin') { sendError(res, 'Forbidden admin only', 403); return; }
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) { sendError(res, 'Lead not found', 404); return; }
    sendSuccess(res, 'Lead deleted', null);
  } catch (err) {
    next(err);
  }
};

export const exportLeadsCSV = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const leads = await Lead.find({}).populate('createdBy', 'name email');
    const header = 'Name,Email,Status,Source,Created At\n';
    const rows = leads.map(l =>
      `${l.name},${l.email},${l.status},${l.source},${new Date(l.createdAt).toISOString()}`
    ).join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=leads.csv');
    res.send(header + rows);
  } catch (err) {
    next(err);
  }
};

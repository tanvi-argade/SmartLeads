import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { LeadFormData } from '../../types/lead.types';
import { Input } from '../ui/Input';
import { Select } from '../ui/Select';
import { Button } from '../ui/Button';
import { Spinner } from '../ui/Spinner';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  status: z.enum(['new', 'contacted', 'qualified', 'lost']),
  source: z.enum(['website', 'instagram', 'referral']),
});

interface LeadFormProps {
  initialData?: LeadFormData;
  onSubmit: (data: LeadFormData) => void;
  isLoading: boolean;
  onCancel: () => void;
}

export const LeadForm: React.FC<LeadFormProps> = ({ initialData, onSubmit, isLoading, onCancel }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<LeadFormData>({
    resolver: zodResolver(schema),
    defaultValues: initialData || { status: 'new', source: 'website' },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input label="Full Name" placeholder="John Doe" {...register('name')} error={errors.name?.message} />
      <Input label="Email Address" type="email" placeholder="john@example.com" {...register('email')} error={errors.email?.message} />
      <Select
        label="Status"
        {...register('status')}
        options={[
          { value: 'new', label: 'New' },
          { value: 'contacted', label: 'Contacted' },
          { value: 'qualified', label: 'Qualified' },
          { value: 'lost', label: 'Lost' },
        ]}
        error={errors.status?.message}
      />
      <Select
        label="Source"
        {...register('source')}
        options={[
          { value: 'website', label: 'Website' },
          { value: 'instagram', label: 'Instagram' },
          { value: 'referral', label: 'Referral' },
        ]}
        error={errors.source?.message}
      />
      <div className="flex gap-3 pt-4">
        <Button type="button" variant="secondary" onClick={onCancel} className="flex-1">Cancel</Button>
        <Button type="submit" disabled={isLoading} className="flex-1 flex justify-center items-center gap-2">
          {isLoading && <Spinner size="sm" />}
          {initialData ? 'Update Lead' : 'Create Lead'}
        </Button>
      </div>
    </form>
  );
};

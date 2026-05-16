import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { registerApi } from '../api/auth.api';
import { useAuthStore } from '../store/authStore';
import { Spinner } from '../components/ui/Spinner';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Button } from '../components/ui/Button';
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun, ArrowLeft } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
  role: z.enum(['sales']),
});
type FormData = z.infer<typeof schema>;

const RegisterPage: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({ 
    resolver: zodResolver(schema),
    defaultValues: { role: 'sales' }
  });
  const [loading, setLoading] = useState(false);
  const { setAuth } = useAuthStore();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const res = await registerApi({ ...data, role: 'sales' });
      if (res.data) {
        setAuth(res.data.user, res.data.token);
        toast.success('Account created!');
        navigate('/dashboard');
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 dark:bg-[#05101f] bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(37,99,235,0.1),transparent)] transition-colors duration-500">
      <button onClick={toggleTheme} className="fixed top-6 right-6 p-2 rounded-[8px] border border-slate-200 dark:border-white/[0.07] text-slate-400 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/[0.05] transition-all">
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-md p-8 bg-white dark:bg-[#0b1a2e] border border-slate-200 dark:border-white/[0.07] rounded-2xl shadow-xl dark:shadow-[0_0_60px_rgba(0,0,0,0.5)] animate-fadeIn">
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-slate-500 dark:text-slate-400 hover:text-[#3b82f6] dark:hover:text-[#3b82f6] mb-6 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>

        <div className="mb-8">
          <h1 className="text-2xl font-[800] text-slate-900 dark:text-white mb-1">
            Smart<span className="text-[#3b82f6]">Leads</span>
          </h1>
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-[600] text-slate-800 dark:text-white">Create Account</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">Join SmartLeads and start managing your pipeline</p>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            {...register('name')}
            type="text"
            placeholder="John Doe"
            error={errors.name?.message}
          />

          <Input
            label="Email Address"
            {...register('email')}
            type="email"
            placeholder="you@example.com"
            error={errors.email?.message}
          />

          <Input
            label="Password"
            {...register('password')}
            type="password"
            placeholder="••••••••"
            error={errors.password?.message}
          />

          <Select
            label="Role"
            {...register('role')}
            options={[
              { value: 'sales', label: 'Sales Representative' }
            ]}
            error={errors.role?.message}
          />

          <Button
            type="submit"
            disabled={loading}
            variant="primary"
            className="w-full justify-center mt-4"
          >
            {loading ? <Spinner size="sm" /> : 'Create Account'}
          </Button>
        </form>

        <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-8">
          Already have an account?{' '}
          <Link to="/login" className="text-[#3b82f6] hover:text-[#2563eb] font-[500] transition-colors">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

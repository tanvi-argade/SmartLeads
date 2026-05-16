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
import { useTheme } from '../context/ThemeContext';
import { Moon, Sun } from 'lucide-react';

const schema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(6, 'At least 6 characters'),
  role: z.enum(['admin', 'sales']),
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
      const res = await registerApi(data);
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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 transition-colors">
      <button onClick={toggleTheme} className="fixed top-4 right-4 p-2 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300">
        {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
      </button>

      <div className="w-full max-w-md p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-100 dark:border-gray-700">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Create Account</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Smart Leads Dashboard</p>
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
            label="Email"
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
              { value: 'sales', label: 'Sales Representative' },
              { value: 'admin', label: 'Administrator' },
            ]}
            error={errors.role?.message}
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-medium rounded-lg transition-colors"
          >
            {loading ? <Spinner size="sm" /> : 'Create Account'}
          </button>
        </form>

        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
          Already have an account?{' '}
          <Link to="/login" className="text-indigo-600 hover:underline font-medium">Sign In</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, Mail, Lock, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { signup } from '@/lib/api';

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      firstName: formData.get('firstName'),
      lastName: formData.get('lastName'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: 'Student',
    };

    try {
      await signup(payload);

      // ✅ IMPORTANT FIX
      localStorage.setItem('verify_email', payload.email as string);

      toast.success('OTP sent to your email');

      navigate('/verify-otp', {
        state: { email: payload.email },
      });
    } catch (err: any) {
      toast.error(err.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-center">Create Account</h1>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <Label>First Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-3 h-4 w-4" />
            <Input name="firstName" className="pl-10" required />
          </div>
        </div>

        <div>
          <Label>Last Name</Label>
          <Input name="lastName" required />
        </div>

        <div>
          <Label>Email</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-3 h-4 w-4" />
            <Input name="email" type="email" className="pl-10" required />
          </div>
        </div>

        <div>
          <Label>Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-3 h-4 w-4" />
            <Input name="password" type="password" className="pl-10" required />
          </div>
        </div>

        <Button disabled={isLoading} className="w-full">
          {isLoading ? <Loader2 className="animate-spin" /> : 'Sign Up'}
        </Button>
      </form>
    </div>
  );
};

export default RegisterPage;
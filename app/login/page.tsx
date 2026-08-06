import { redirect } from 'next/navigation';
import { AuthForm } from '@/components/AuthForm';
import { AuthShell } from '@/components/AuthShell';
import { createClient } from '@/lib/supabase/server';

export default async function LoginPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    redirect('/dashboard');
  }
  return (
    <AuthShell
      title='Welcome back'
      description='Sign in with your email and password to continue.'
    >
      <AuthForm mode='login' />
    </AuthShell>
  );
}

import React from 'react';
import AccountEditForm from './AccountEditForm';
import { createClient } from '@/lib/supabase/server';
import { fetchProfileDataById } from '@/lib/actions';

export default async function AccountEditFormContainer() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();
  if (!data || !data.user) return null;

  const profile = await fetchProfileDataById(data.user.id);
  if (!profile) return null;
  return <AccountEditForm userName={profile?.username ?? ''}></AccountEditForm>;
}
